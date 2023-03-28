import React from 'react';
import styles from './BeachCardDetailsStyles.module.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from './Button';

const BeachCardDetails = () => {
    const { beachId } = useParams();
    const [beach, setBeach] = React.useState({});

    const { auth } = React.useContext(AuthContext);

    React.useEffect(() => {
        fetch(`http://localhost:3030/data/beaches/${beachId}`)
        .then(response => response.json())
        .then(data => setBeach(data));
    }, [beachId])
    
    const handleEdit = () => {

    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3030/data/beaches/${beachId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": auth.accessToken,
                },
            });
            if (!response.ok) {
                throw new Error(response.status);
            } else if (response.status === 204) {
                return {};
            } else {
                const result = await response.json();
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.card}>
            <img style={{width: '250px', height: '180px'}} src={beach.image} alt="Beach Image" />
            <h2 className="card-heading">{beach.name}</h2>
            <h4 className="card-location">Location: {beach.location}, {beach.country}</h4>
            {/* <p>Rating</p> */}
            <div className="rating">
                Rating
                <p className="rating-stat">Beach: {beach.rating?.beach}</p>
                <p className="rating-stat">Infrastructure: {beach.rating?.infrastructure}</p>
                <p className="rating-stat">Prices: {beach.rating?.prices}</p>
            </div>
            {auth && auth._id === beach._ownerId && <Button color="yellow" text="Edit" type="button" onClickFunction={handleEdit} />}
            {auth && auth._id === beach._ownerId && <Button color="red" text="Delete" type="button" onClickFunction={handleDelete} />}
        </div>

    )
}

export default BeachCardDetails;