import React from 'react';
import styles from './BeachCardDetailsStyles.module.css';
import { stars } from '../utils/stars';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from './Button';
import BeachCardEdit from './BeachCardEdit';
import BeachCardVote from './BeachCardVote';
import BeachVote from './BeachVote';

const BeachCardDetails = () => {
    const { beachId } = useParams();
    const [beach, setBeach] = React.useState({});
    const [edit, setEdit] = React.useState(false);
    const [votes, setVotes] = React.useState([]);
    const [openVote, setOpenVote] = React.useState(false);

    const { auth, hasUser } = React.useContext(AuthContext);

    const navigate = useNavigate();

    React.useEffect(() => {
        fetch(`http://localhost:3030/data/beaches/${beachId}`)
        .then(response => response.json())
        .then(data => setBeach(data));
    }, [beachId]);
    
    React.useEffect(() => {
        fetch(`http://localhost:3030/data/votes?where=beachId%3D%22${beachId}%22`)
        .then(response => response.json())
        .then(data => {
            if (data.code === 200 || data.length > 0) {
                setVotes(data);
            } else {
                setVotes([]);
            }});
    }, [beachId]);

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
                return {};
            } else {
                // const result = await response.json();
                navigate('/beaches');
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
                    const result = await response.json();
                    setBeach(result);
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
        const userVote = votes.filter((vote) => vote._ownerId === auth._id);
        console.log(userVote);
        const url = userVote.length > 0 ? `http://localhost:3030/data/votes/${userVote[0]._id}` : "http://localhost:3030/data/votes/"
        const method =  userVote.length > 0 ? "PUT" : "POST"
        try {
            if (hasUser) {
                const response = await fetch(url, {
                    method: method,
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
                    const result = await response.json();
                    if (userVote.length > 0) {
                        setVotes([...votes.filter((vote) => 
                            vote._ownerId !== auth._id && vote.createdBy !== auth.email
                        ), result]);
                        setOpenVote(false);
                    } else {
                        setVotes([...votes, result]);
                        setOpenVote(false);
                    }
                    
                }
            } else {
                throw new Error('There is no user logged in.')
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    const handleDeleteVote = async (id) => {
        try {
            const response = await fetch(`http://localhost:3030/data/votes/${id}`, {
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
                // const result = await response.json();
                // navigate(`/beaches/${beachId}`);
                setVotes([...votes.filter((vote) => vote._id !== id)])
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
                <img className={styles.cardImage} src={beach.image} alt="Beach Image" />
                <h2 className={styles.cardHeading}>{beach.name}</h2>
                <h4 className={styles.cardLocation}>Location: {beach.location}, {beach.country}</h4>
                <p className={styles.description}>{beach.description}</p>
                <div className={styles.rating}>
                    {beach.createdBy} rating:
                    <div className="rating-stat">Beach: {stars[beach.rating?.beach]}</div>
                    <div className="rating-stat">Infrastructure: {stars[beach.rating?.infrastructure]}</div>
                    <div className="rating-stat">Prices: {stars[beach.rating?.prices]}</div>
                </div>
                <div className={styles.buttonContainer}>
                    {hasUser && auth._id === beach._ownerId && <Button color="yellow" text="Edit" type="button" onClickFunction={openEdit} />}
                    {hasUser && auth._id === beach._ownerId && <Button color="red" text="Delete" type="button" onClickFunction={handleDelete} />}
                    {hasUser && auth._id !== beach._ownerId && <Button color="blue" text="Vote" type="button" onClickFunction={handleOpenVote} />}
                </div>
                <div>
                    {votes.length > 0 && votes.map((vote) => {
                        return (
                            <BeachVote key={vote._id} vote={vote} handleDeleteVote={handleDeleteVote} />
                        )
                    })}
                </div>
            </div>
            {openVote && <BeachCardVote beach={beach} handleClose={handleVoteClose} voteBeach={voteBeach} />}
            {edit && <BeachCardEdit beach={beach} handleClose={handleClose} editBeach={editBeach} />}
        </>
    )
}

export default BeachCardDetails;