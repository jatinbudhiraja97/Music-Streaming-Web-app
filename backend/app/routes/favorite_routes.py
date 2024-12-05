from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Favorite, Song, User

favorite_bp = Blueprint('favorite', __name__)


@favorite_bp.route('/', methods=['GET'])
@jwt_required()
def get_favorites():
    """Fetch all favorite songs for the current user."""
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()

    if not user:
        return jsonify(message="User not found"), 404

    favorites = Favorite.query.filter_by(user_id=user.id).all()
    return jsonify([{
        'id': favorite.song.id,
        'title': favorite.song.title,
        'artist': favorite.song.artist,
        'album': favorite.song.album,
        'genre': favorite.song.genre,
        'duration': favorite.song.duration,
        's3_url': favorite.song.s3_url
    } for favorite in favorites]), 200


@favorite_bp.route('/', methods=['POST'])
@jwt_required()
def add_favorite():
    """Add a song to the user's favorites."""
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()

    if not user:
        return jsonify(message="User not found"), 404

    data = request.get_json()
    song_id = data.get('song_id')
    song = Song.query.get(song_id)

    if not song:
        return jsonify(message="Song not found"), 404

    new_favorite = Favorite(user_id=user.id, song_id=song.id)
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify(message="Song added to favorites"), 201


@favorite_bp.route('/<int:song_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(song_id):
    """Remove a song from the user's favorites."""
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()

    if not user:
        return jsonify(message="User not found"), 404

    favorite = Favorite.query.filter_by(user_id=user.id, song_id=song_id).first()

    if not favorite:
        return jsonify(message="Favorite not found"), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify(message="Favorite removed successfully"), 200
