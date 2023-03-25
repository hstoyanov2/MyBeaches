import React from 'react';
import beachPhoto from '../static/2fa1ng3.jpg';

const BeachCard = () => {
    return (
        <div className="card">
            <img style={{width: '200px', height: '150px'}} src={beachPhoto} alt="Beach Image" />
            <h2>Title</h2>
            <h4>Location</h4>
            <p>Rating</p>
            <div className="rating">
                <p>Beach</p>
                <p>Infrastructure</p>
                <p>Prices</p>
            </div>
        </div>
    )
}

export default BeachCard;