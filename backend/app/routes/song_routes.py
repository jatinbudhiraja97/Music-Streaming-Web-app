from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename
import os
from app import db, s3
from app.models import Song
from app.utils.config import Config

song_bp = Blueprint('song', __name__)

UPLOAD_DIR = 'uploads'

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)


@song_bp.route('/', methods=['GET'])
def get_songs():
    """Fetch all songs."""
    songs = Song.query.all()
    return jsonify([{
        'id': song.id,
        'title': song.title,
        'artist': song.artist,
        'album': song.album,
        'genre': song.genre,
        'duration': song.duration,
        's3_url': song.s3_url
    } for song in songs]), 200


@song_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_song():
    """Upload a song and save its details."""
    if 'file' not in request.files:
        return jsonify(message="No file part"), 400

    file = request.files['file']
    title = request.form.get('title')
    artist = request.form.get('artist')
    album = request.form.get('album')
    genre = request.form.get('genre')
    duration = request.form.get('duration')

    if not all([title, artist, album, genre, duration]):
        return jsonify(message="Missing song details"), 400

    if file.filename == '':
        return jsonify(message="No selected file"), 400

    if file and file.filename:
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_DIR, filename)
        file.save(file_path)

        # Upload to S3
        s3.upload_file(
            file_path,
            Config.S3_BUCKET,
            filename
        )
        s3_url = f"{Config.S3_LOCATION}{filename}"

        # Save song to database
        new_song = Song(
            title=title,
            artist=artist,
            album=album,
            genre=genre,
            duration=float(duration),
            s3_url=s3_url
        )
        db.session.add(new_song)
        db.session.commit()

        return jsonify(message="Song uploaded successfully", s3_url=s3_url), 201

    return jsonify(message="File upload failed"), 400


@song_bp.route('/<int:song_id>', methods=['DELETE'])
@jwt_required()
def delete_song(song_id):
    """Delete a song by its ID."""
    song = Song.query.get(song_id)
    if not song:
        return jsonify(message="Song not found"), 404

    # Optionally delete file from S3 (if required)
    filename = os.path.basename(song.s3_url)
    s3.delete_object(Bucket=Config.S3_BUCKET, Key=filename)

    db.session.delete(song)
    db.session.commit()

    return jsonify(message="Song deleted successfully"), 200
