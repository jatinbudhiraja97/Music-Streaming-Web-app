import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './library.css';

export default function Library() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [duration, setDuration] = useState('');
    const [file, setFile] = useState(null);
    const [songs, setSongs] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        // Log in and get the token
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            email: 'testuser2@example.com',
            password: 'testpassword'
        })
        .then(response => {
            const { access_token } = response.data;
            setToken(access_token);

            // Fetch songs
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/songs`, {
                headers: { Authorization: `Bearer ${access_token}` }
            })
            .then(response => {
                setSongs(response.data);
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
            });
        })
        .catch(error => {
            console.error('Error logging in:', error);
        });
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUploadSong = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('album', album);
        formData.append('genre', genre);
        formData.append('duration', duration);

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            alert('Song uploaded successfully');
            setTitle('');
            setArtist('');
            setAlbum('');
            setGenre('');
            setDuration('');
            setFile(null);

            // Fetch updated songs
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/songs`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setSongs(response.data);
            })
            .catch(error => {
                console.error('Error fetching songs:', error);
            });
        })
        .catch(error => {
            console.error('Error uploading song:', error);
        });
    };

    return (
        <div className="screen-container">
            <div className="add-song-container">
                <h2>Add Song</h2>
                <form onSubmit={handleUploadSong}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Artist"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Album"
                        value={album}
                        onChange={(e) => setAlbum(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        required
                    />
                    <button type="submit">Upload Song</button>
                </form>
            </div>
            <div className="songs-container">
                <h2>Songs</h2>
                {songs.map((song, index) => (
                    <div key={index} className="song-card">
                        <h3>{song.title}</h3>
                        <p>{song.artist} - {song.album}</p>
                        <p>{song.genre} - {song.duration} min</p>
                        <audio controls>
                            <source src={song.s3_url} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ))}
            </div>
        </div>
    );
}
