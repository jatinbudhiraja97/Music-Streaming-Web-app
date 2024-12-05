from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.utils.config import Config
import boto3

db = SQLAlchemy()
jwt = JWTManager()
s3 = None  # Initialize `s3` as a global variable


def create_app():
    global s3  # Declare `s3` as global so it can be accessed elsewhere

    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    jwt.init_app(app)

    # Initialize the S3 client
    s3 = boto3.client(
        "s3",
        region_name=Config.AWS_REGION,
        aws_access_key_id=Config.S3_KEY,
        aws_secret_access_key=Config.S3_SECRET
    )

    # Register Blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.playlist_routes import playlist_bp
    from app.routes.song_routes import song_bp
    from app.routes.favorite_routes import favorite_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(playlist_bp, url_prefix='/playlists')
    app.register_blueprint(song_bp, url_prefix='/songs')
    app.register_blueprint(favorite_bp, url_prefix='/favorites')

    # Create database tables
    with app.app_context():
        db.create_all()

    return app
