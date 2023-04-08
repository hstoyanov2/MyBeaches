import React from 'react';
import styles from './BeachCardStyles.module.css';
import Button from './Button';
import { AuthContext } from '../contexts/AuthContext';

const BeachCard = ({ vote, handleDeleteVote }) => {
    
    const { auth } = React.useContext(AuthContext);

    const handleClick = () => {
        handleDeleteVote(vote._id);
    }
    
    return (
        <div>
            <p>{vote.createdBy} {vote.beachId} {vote.beach} {vote.infrastructure} {vote.prices}</p>
            {vote._ownerId === auth._id && <button onClick={handleClick}>Delete</button>}
        </div>
        
    )
}

export default BeachCard;