import React from 'react';
import styles from './BeachCardDetailsStyles.module.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from './Button';
import BeachCardEdit from './BeachCardEdit';
import BeachCardVote from './BeachCardVote';

const BeachCardDetails = () => {
    const { beachId } = useParams();
    const [beach, setBeach] = React.useState({});
    const [edit, setEdit] = React.useState(false);
    const [openVote, setOpenVote] = React.useState(false);

    const { auth, hasUser } = React.useContext(AuthContext);

    const navigate = useNavigate();

    React.useEffect(() => {
        fetch(`http://localhost:3030/data/beaches/${beachId}`)
        .then(response => response.json())
        .then(data => setBeach(data));
    }, [beachId])
    
    // const handleEdit = () => {
    //     navigate(`/beaches/${beachId}/edit`)
    // };

    const handleDelete = async () => {
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
                console.log('tupo');
                return {};
            } else {
                const result = await response.json();
                navigate('/beaches');
                console.log(result);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleClose = () => {
        setEdit(false);
    }

    const handleVoteClose = () => {
        setOpenVote(false);
    }

    const editBeach = async (data) => {
        try {
            if (hasUser) {
                const response = await fetch(`http://localhost:3030/data/beaches/${beachId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Authorization": auth.accessToken,
                    },
                    body: JSON.stringify(data)
                })
                if (!response.ok) {
                    throw new Error(response.status);
                } else if (response.status === 204) {
                    return {};
                } else {
                    // const result = await response.json();
                    setBeach(data);
                    setEdit(false);
                }
            } else {
                throw new Error('There is no user logged in.')
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    const voteBeach = async (data) => {
        try {
            if (hasUser) {
                const response = await fetch(`http://localhost:3030/data/beaches/${beachId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                if (!response.ok) {
                    throw new Error(response.status);
                } else if (response.status === 204) {
                    return {};
                } else {
                    // const result = await response.json();
                    setBeach(data);
                    setEdit(false);
                }
            } else {
                throw new Error('There is no user logged in.')
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    const openEdit = () => {
        setEdit(true);
    }

    const handleOpenVote = () => {
        setOpenVote(true);
    }

    return (
        <>
            <div className={styles.card}>
                <img style={{width: '250px', height: '180px'}} src={beach.image} alt="Beach Image" />
                <h2 className="card-heading">{beach.name}</h2>
                <h4 className="card-location">Location: {beach.location}, {beach.country}</h4>
                <p>{beach.description}
                </p>
                <div className="rating">
                    {beach.createdBy} rating:
                    <p className="rating-stat">Beach: {beach.beachRating?.beach}</p>
                    <p className="rating-stat">Infrastructure: {beach.beachRating?.infrastructure}</p>
                    <p className="rating-stat">Prices: {beach.beachRating?.prices}</p>
                </div>
                <div className={styles.buttonContainer}>
                    {hasUser && auth._id === beach._ownerId && <Button color="yellow" text="Edit" type="button" onClickFunction={openEdit} />}
                    {hasUser && auth._id === beach._ownerId && <Button color="red" text="Delete" type="button" onClickFunction={handleDelete} />}
                    {hasUser && auth._id !== beach._ownerId && <Button color="blue" text="Vote" type="button" onClickFunction={handleOpenVote} />}
                </div>
                {openVote && <BeachCardVote beach={beach} handleClose={handleVoteClose} editBeach={editBeach} />}
            </div>
            {edit && <BeachCardEdit beach={beach} handleClose={handleClose} editBeach={voteBeach} />}
        </>
    )
}

export default BeachCardDetails;