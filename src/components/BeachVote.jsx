import React from 'react';
import styles from './BeachVoteStyles.module.css';
import { stars } from '../utils/stars';
import Button from './Button';
import { AuthContext } from '../contexts/AuthContext';

const BeachCard = ({ vote, handleDeleteVote }) => {
    
    const { auth } = React.useContext(AuthContext);

    const handleClick = () => {
        handleDeleteVote(vote._id);
    }
    
    return (
        <div className={styles.voteContainer}>
            <div className={styles.voteHeading}>
                <span>{vote.createdBy} rating and comment:</span>
                <span>{vote._createdOn}</span>
                <div className={styles.voteButton}>
                    {vote._ownerId === auth._id && <Button color="red" text="Delete" type="button" onClickFunction={handleClick} customStyles={{width: '65px', margin: 'auto', height: '22px', textAlign: 'center', fontSize: '14px'}} />}
                </div>
            </div>
            <div className={styles.voteRating}>
                <div className={styles.voteRate}><span className={styles.voteCategory}>Beach: </span><span className={styles.stars}>{stars[vote.beach]}</span></div>
                <div className={styles.voteRate}><span className={styles.voteCategory}>Infrastructure: </span><span className={styles.stars}>{stars[vote.infrastructure]}</span></div>
                <div className={styles.voteRate}><span className={styles.voteCategory}>Prices: </span><span className={styles.stars}>{stars[vote.prices]}</span></div>
            </div>
            <div className={styles.voteComment}>
                Comment: {vote.comment || 'Test comment'}
            </div>
        </div>
    )
}

export default BeachCard;