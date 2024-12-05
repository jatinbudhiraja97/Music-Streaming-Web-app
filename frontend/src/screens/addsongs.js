/*import React, { useState } from 'react';
import axios from 'axios';
import './addsongs.css';

const Addsongs = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [duration, setDuration] = useState('');
    const [file, setFile] = useState(null);

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

        axios.post('http://127.0.0.1:5000/Songs/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            if (response.status === 200) {
                alert('Song uploaded successfully');
                setTitle('');
                setArtist('');
                setAlbum('');
                setGenre('');
                setDuration('');
                setFile(null);
            } else {
                alert('Failed to upload songssssss');
            }
        })
        .catch(error => {
            console.error('Error uploading song:', error);
            alert('Failed to upload song');
        });
    };

    const handleAddAnotherSong = () => {
        setTitle('');
        setArtist('');
        setAlbum('');
        setGenre('');
        setDuration('');
        setFile(null);
    };

    return (
        <div className="add-songs-container">
            <h1>Add Songs</h1>
            <div className="form-container">
                <form onSubmit={handleUploadSong}>
                    <h2>Song Details</h2>
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
                    <div className="buttons">
                        <button type="button" onClick={handleAddAnotherSong}>Add Another Song</button>
                        <button type="submit">Upload Songs</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Addsongs;*/
















































































































































import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addsongs.css';

const Addsongs = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [duration, setDuration] = useState('');
    const [file, setFile] = useState(null);
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
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Failed to fetch token');
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
        })
        .catch(error => {
            console.error('Error uploading song:', error);
        });
    };

    return (
        <div className="add-songs-container">
            <h1>Add Songs</h1>
            <div className="form-container">
                <form onSubmit={handleUploadSong}>
                <h2>Song Details</h2>
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
                    <div className="buttons">
                        <button type="button" onClick={() => {}}>Add Another Song</button>
                        <button type="submit">Upload Songs</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Addsongs; 



