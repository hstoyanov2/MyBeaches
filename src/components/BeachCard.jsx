import React from 'react';
import styles from './BeachCardStyles.module.css';
import { stars } from '../utils/stars';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const BeachCard = ({ card }) => {
    const { createdBy, name, location, rating, country, image, _id } = card;
    
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/beaches/${_id}`);
    }
    
    return (
        <>
            <div className={styles.card}>
                <img className={styles.cardImage} src={image} alt="Beach Image" />
                <h2 className={styles.cardHeading}>{name}</h2>
                <h4 className={styles.cardLocation}>Location: {location}, {country}</h4>
                <div className={styles.rating}>
                    {createdBy} rating:
                    <p className="rating-stat">Beach: {stars[rating?.beach]}</p>
                    <p className="rating-stat">Infrastructure: {stars[rating?.infrastructure]}</p>
                    <p className="rating-stat">Prices: {stars[rating?.prices]}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <Button color="blue" text="Details" type="button" onClickFunction={handleClick} customStyles={{width: '150px', margin: 'auto', textAlign: 'center'}} />
                </div>
            </div>
        </>
        
    )
}

export default BeachCard;