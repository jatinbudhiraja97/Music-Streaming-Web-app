
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './favorites.css';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [showDropdown, setShowDropdown] = useState(null);

    useEffect(() => {
        // Fetch favorite songs
        axios.get('http://localhost:5000/Favorites')
            .then(response => {
                setFavorites(response.data);
            })
            .catch(error => console.error('Error fetching favorite songs:', error));
    }, []);

    const handleRemoveFromFavorites = (songId) => {
        axios.delete(`http://localhost:5000/Favorites/${songId}`)
        .then(response => {
            console.log('Song removed from favorites:', response.data);
            setFavorites(favorites.filter(song => song.id !== songId));  // Remove the song from state
            setShowDropdown(null);  // Hide dropdown after removing from favorites
        })
        .catch(error => console.error('Error removing from favorites:', error));
    };

    return (
        <div className="favorites-container">
            {favorites.map((song, index) => (
                <div key={index} className="favorite-card">
                    <h3>{song.title}</h3>
                    <p>Artist: {song.artist}</p>
                    <p>Album: {song.album}</p>
                    <p>Genre: {song.genre}</p>
                    <p>Duration: {song.duration} min</p>
                    <audio controls src={song.s3_url}>
                        Your browser does not support the audio element.
                    </audio>
                    <div className="three-dots" onClick={() => setShowDropdown(showDropdown === index ? null : index)}>⋮</div>
                    {showDropdown === index && (
                        <div className="dropdown">
                            <div className="dropdown-item" onClick={() => handleRemoveFromFavorites(song.id)}>Remove from Favorites</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Favorites;*/
































































































































































































import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './favorites.css';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [token, setToken] = useState('');
    const [showDropdown, setShowDropdown] = useState(null);

    useEffect(() => {
        // Fetch the token
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            email: 'testuser2@example.com',
            password: 'testpassword'
        })
        .then(response => {
            const { access_token } = response.data;
            setToken(access_token);

            // Fetch favorite songs
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/favorites`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            .then(response => {
                setFavorites(response.data);
            })
            .catch(error => console.error('Error fetching favorite songs:', error));
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Failed to fetch token');
        });
    }, []);

    const handleRemoveFromFavorites = (songId) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/favorites/${songId}`)
            .then(response => {
                console.log('Song removed from favorites:', response.data);
                setFavorites(favorites.filter(song => song.id !== songId));  // Remove the song from state
                setShowDropdown(null);  // Hide dropdown after removing from favorites
            })
            .catch(error => console.error('Error removing from favorites:', error));
    };
    

    return (
        <div className="favorites-container">
            {favorites.map((song, index) => (
                <div key={index} className="favorite-card">
                    <h3>{song.title}</h3>
                    <p>Artist: {song.artist}</p>
                    <p>Album: {song.album}</p>
                    <p>Genre: {song.genre}</p>
                    <p>Duration: {song.duration} min</p>
                    <audio controls src={song.s3_url}>
                        Your browser does not support the audio element.
                    </audio>
                    <div className="three-dots" onClick={() => setShowDropdown(showDropdown === index ? null : index)}>⋮</div>
                    {showDropdown === index && (
                        <div className="dropdown">
                            <div className="dropdown-item" onClick={() => handleRemoveFromFavorites(song.id)}>Remove from Favorites</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Favorites; 
