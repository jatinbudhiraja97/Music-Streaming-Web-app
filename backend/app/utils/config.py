import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', 'sqlite:///database.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_default_jwt_key')
    S3_BUCKET = os.getenv('S3_BUCKET', 'your_s3_bucket')
    AWS_REGION = os.getenv('AWS_REGION', 'your_aws_region')
    S3_KEY = os.getenv('AWS_ACCESS_KEY_ID', 'default_key_placeholder')
    S3_SECRET = os.getenv('AWS_SECRET_ACCESS_KEY', 'default_secret_placeholder')
    S3_LOCATION = f"http://{S3_BUCKET}.s3.amazonaws.com/"
