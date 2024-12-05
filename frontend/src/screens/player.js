/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './player.css';

const Player = () => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [showDropdown, setShowDropdown] = useState(null);

    useEffect(() => {
        // Fetch songs
        axios.get('http://localhost:5000/Songs')
            .then(response => setSongs(response.data))
            .catch(error => console.error('Error fetching songs:', error));
    }, []);

    const handlePlaySong = (song) => {
        setCurrentSong(song);
    };

    const handleAddToFavorites = (songId) => {
        axios.post('http://localhost:5000/Favorites', { song_id: songId })
            .then(response => {
                console.log('Song added to favorites:', response.data);
                setShowDropdown(null);  // Hide dropdown after adding to favorites
            })
            .catch(error => console.error('Error adding to favorites:', error));
    };

    return (
        <div className="screen-container">
            <div className="header-container">
                <div className="header-item">#</div>
                <div className="header-item">Title</div>
                <div className="header-item">Artist</div>
                <div className="header-item">Album</div>
                <div className="header-item">Genre</div>
                <div className="header-item">Duration</div>
            </div>
            <div className="song-container">
                {songs.map((song, index) => (
                    <div key={index} className="song-item" onMouseEnter={() => setShowDropdown(index)} onMouseLeave={() => setShowDropdown(null)}>
                        <div className="song-detail" onClick={() => handlePlaySong(song)}>{index + 1}</div>
                        <div className="song-detail" onClick={() => handlePlaySong(song)}>{song.title}</div>
                        <div className="song-detail" onClick={() => handlePlaySong(song)}>{song.artist}</div>
                        <div className="song-detail" onClick={() => handlePlaySong(song)}>{song.album}</div>
                        <div className="song-detail" onClick={() => handlePlaySong(song)}>{song.genre}</div>
                        <div className="song-detail" onClick={() => handlePlaySong(song)}>{song.duration} min</div>
                        <div className="three-dots" onClick={() => setShowDropdown(index)}>⋮</div>
                        {showDropdown === index && (
                            <div className="dropdown">
                                <div className="dropdown-item" onClick={() => handleAddToFavorites(song.id)}>Add to Favorites</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {currentSong && (
                <div className="audio-player">
                    <audio controls autoPlay src={currentSong.s3_url}>
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default Player;
*/



























































































































































































import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './player.css';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const Player = () => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [showDropdown, setShowDropdown] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        // Fetch the token
        axios.post(`${BASE_URL}/login`, {
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

        // Fetch songs
        axios.get(`${BASE_URL}/songs`)
            .then(response => setSongs(response.data))
            .catch(error => console.error('Error fetching songs:', error));
    }, []);

    const handlePlaySong = (song) => {
        setCurrentSong(song);
    };

    const handleAddToFavorites = (songId) => {
        if (!token) {
            alert('Token not available');
            return;
        }

        axios.post(`${BASE_URL}/favorites`, { song_id: songId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Song added to favorites:', response.data);
            setShowDropdown(null);  // Hide dropdown after adding to favorites
        })
        .catch(error => console.error('Error adding to favorites:', error));
    };

    return (
        <div className="screen-container">
            <div className="header-container">
                <div className="header-item">#</div>
                <div className="header-item">Title</div>
                <div className="header-item">Artist</div>
                <div className="header-item">Album</div>
                <div className="header-item">Genre</div>
                <div className="header-item">Duration</div>
            </div>
            <div className="song-container">
                {songs.map((song, index) => (
                    <div key={index} className="song-item" onMouseEnter={() => setShowDropdown(index)} onMouseLeave={() => setShowDropdown(null)}>
                        <div className="song-detail" onClick={() => handlePlaySong(song)}>{index + 1}</div>
                        <div className="song-detail" onClick={() => handlePlaySong(song)}>{song.title}</div>
                        <div className="song-detail" onClick={() => handlePlaySong(song)}>{song.artist}</div>
                        <div className="song-detail" onClick={() => handlePlaySong(song)}>{song.album}</div>
                        <div className="song-detail" onClick={() => handlePlaySong(song)}>{song.genre}</div>
                        <div className="song-detail" onClick={() => handlePlaySong(song)}>{song.duration} min</div>
                        <div className="three-dots" onClick={() => setShowDropdown(index)}>⋮</div>
                        {showDropdown === index && (
                            <div className="dropdown">
                                <div className="dropdown-item" onClick={() => handleAddToFavorites(song.id)}>Add to Favorites</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {currentSong && (
                <div className="audio-player">
                    <audio controls autoPlay src={currentSong.s3_url}>
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default Player;
