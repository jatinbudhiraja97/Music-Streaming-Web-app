# Music-Streaming-Web-app
 A full-stack music streaming application built with Flask and React. This project enables users to upload songs, create and manage playlists, mark favorites, and enjoy music streaming through a user-friendly interface. It uses AWS S3 for song storage and PostgreSQL for data management, ensuring a scalable and secure architecture.



 Table of Contents
Features
Prerequisites
Setup Instructions
Configuration
Starting the Application
Development Notes
Features
User authentication
Upload and stream music files
Create, update, and delete playlists
Mark favorite tracks
AWS S3 for music file storage
PostgreSQL for database management
Prerequisites
Before starting, ensure you have the following installed:

Python 3.9 or above
Node.js and npm
PostgreSQL
AWS S3 credentials
Git
Setup Instructions
Step 1: Clone the Repository
Clone this repository to your local system:

bash
Copy code
git clone https://github.com/jatinbudhiraja97/Music-Streaming-Web-app.git
cd Music-Streaming-Web-app
Step 2: Backend Setup
Navigate to the backend directory:

bash
Copy code
cd backend
Create and activate a Python virtual environment:

bash
Copy code
python -m venv myenv
source myenv/bin/activate  # For Linux/Mac
myenv\Scripts\activate     # For Windows
Install the required Python packages:

bash
Copy code
pip install -r requirements.txt
Edit the backend/config.py file with your credentials:

Replace S3_BUCKET, AWS_REGION, S3_KEY, S3_SECRET, and SQLALCHEMY_DATABASE_URI with your AWS and PostgreSQL details.
python
Copy code
class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://your_user:your_password@localhost:5432/your_database'
    S3_BUCKET = 'your-s3-bucket-name'
    AWS_REGION = 'your-aws-region'
    S3_KEY = 'your-aws-access-key'
    S3_SECRET = 'your-aws-secret-key'
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
Create a .env file in the frontend directory and add the following content (replace backend_url with your backend server URL):

env
Copy code
REACT_APP_API_URL=http://localhost:5000
Start the React development server:

bash
Copy code
npm start
Configuration
Backend
The backend configuration is managed in backend/config.py. Update the AWS and database credentials to match your setup.
Frontend
Update the REACT_APP_API_URL in frontend/.env with the backend URL.
Starting the Application
Start the backend server:

bash
Copy code
cd backend
python run.py
Start the frontend server:

bash
Copy code
cd frontend
npm start
Open your browser and navigate to:

arduino
Copy code
http://localhost:3000
