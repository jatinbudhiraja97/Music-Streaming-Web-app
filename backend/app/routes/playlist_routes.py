from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Playlist, User
from app import db

playlist_bp = Blueprint('playlist', __name__)

@playlist_bp.route('/', methods=['GET'])
@jwt_required()
def get_playlists():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()
    playlists = Playlist.query.filter_by(user_id=user.id).all()
    return jsonify([{
        'id': playlist.id,
        'name': playlist.name,
        'description': playlist.description
    } for playlist in playlists]), 200

@playlist_bp.route('/', methods=['POST'])
@jwt_required()
def add_playlist():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()
    data = request.get_json()
    new_playlist = Playlist(name=data['name'], description=data['description'], user_id=user.id)
    db.session.add(new_playlist)
    db.session.commit()
    return jsonify(message="Playlist added successfully"), 201
