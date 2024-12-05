# Music-Streaming-Web-app

A full-stack music streaming application built with Flask and React. This project enables users to upload songs, create and manage playlists, mark favorites, and enjoy music streaming through a user-friendly interface. It uses AWS S3 for song storage and PostgreSQL for data management, ensuring a scalable and secure architecture.

---

## Features
- User authentication
- Upload and stream music files
- Create, update, and delete playlists
- Mark favorite tracks
- AWS S3 for music file storage
- PostgreSQL for data storage

---

## Prerequisites
Before starting, ensure you have the following installed:
- Python 3.9 or above
- Node.js and npm
- PostgreSQL
- AWS S3 credentials (bucket, key, and secret)

---

## Setup Instructions

### Step 1: Clone the Repository
Clone this repository to your local system and navigate into it:
```bash
git clone https://github.com/jatinbudhiraja97/Music-Streaming-Web-app.git
cd Music-Streaming-Web-app
### Step 2: Backend Setup
Navigate to the backend directory:

bash
Copy code
cd backend
Create and activate a Python virtual environment:
For Linux/Mac:

bash
Copy code
python3 -m venv myenv
source myenv/bin/activate
For Windows:

bash
Copy code
python -m venv myenv
myenv\Scripts\activate
Install the required Python packages:
bash
Copy code
pip install -r requirements.txt
Edit the backend/config.py file with your credentials:
Replace the following placeholders with your AWS and PostgreSQL details:

python
Copy code
SQLALCHEMY_DATABASE_URI = 'postgresql://<your_user>:<your_password>@localhost:5432/<your_database>'
S3_BUCKET = '<your-s3-bucket-name>'
AWS_REGION = '<your-aws-region>'
S3_KEY = '<your-aws-access-key>'
S3_SECRET = '<your-aws-secret-key>'
Initialize the database:
bash
Copy code
python run.py db init
python run.py db migrate
python run.py db upgrade
Start the backend server:
bash
Copy code
python run.py
Step 3: Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install Node.js dependencies:
bash
Copy code
npm install
Create a .env file in the frontend directory and add the following content:
Replace backend_url with your backend server URL:

env
Copy code
REACT_APP_API_URL=http://localhost:5000
Start the frontend server:
bash
Copy code
npm start
Starting the Application
Start the backend server by running python run.py in the backend directory.
Start the frontend server by running npm start in the frontend directory.
Open your browser and navigate to:
bash
Copy code
http://localhost:3000
Development Notes
Backend Configuration: The backend configuration is managed in backend/config.py. Update the AWS and database credentials to match your setup.
Frontend API URL: Update the REACT_APP_API_URL in frontend/.env with the backend URL.
Data Storage: The app uses PostgreSQL for database storage and AWS S3 for music file storage.
