import React from 'react';
import styles from './BeachCardStyles.module.css';

const BeachCard = ({card}) => {
    const { name, location, rating, country, image, _id } = card;

    return (
        <div className={styles.card}>
            <img style={{width: '250px', height: '180px'}} src={image} alt="Beach Image" />
            <h2 className="card-heading">{name}</h2>
            <h4 className="card-location">Location: {location}, {country}</h4>
            {/* <p>Rating</p> */}
            <div className="rating">
                Rating
                <p className="rating-stat">Beach: {rating?.beach}</p>
                <p className="rating-stat">Infrastructure: {rating?.infrastructure}</p>
                <p className="rating-stat">Prices: {rating?.prices}</p>
            </div>
        </div>
    )
}

export default BeachCard;