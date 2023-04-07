import React from 'react';
import styles from './BeachCardStyles.module.css';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const BeachCard = ({ card, editBeach }) => {
    const { createdBy, name, location, rating, country, image, beachRating, _id } = card;
    // console.log(card);
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/beaches/${_id}`);
    }
    // console.log('beach card');
    return (
        <>
            <div className={styles.card}>
                <img style={{width: '250px', height: '180px'}} src={image} alt="Beach Image" />
                <h2 className="card-heading">{name}</h2>
                <h4 className="card-location">Location: {location}, {country}</h4>
                <div className="rating">
                    {createdBy} rating:
                    <p className="rating-stat">Beach: {beachRating?.beach}</p>
                    <p className="rating-stat">Infrastructure: {beachRating?.infrastructure}</p>
                    <p className="rating-stat">Prices: {beachRating?.prices}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <Button color="blue" text="Details" type="button" onClickFunction={handleClick} customStyles={{width: '150px', margin: 'auto', textAlign: 'center'}} />
                </div>
            </div>
        </>
        
    )
}

export default BeachCard;