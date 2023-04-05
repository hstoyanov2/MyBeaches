import React from 'react';
import styles from './BeachCardDetailsStyles.module.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from './Button';
import BeachCardEdit from './BeachCardEdit';

const BeachCardDetails = () => {
    const { beachId } = useParams();
    const [beach, setBeach] = React.useState({});
    const [edit, setEdit] = React.useState(false);

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
                    // const updatedList = list.map((beach) => {
                    //     if (beach._id === id) {
                    //         return result;
                    //     };
                    //     return beach;
                    // })
                    // setList([updatedList]);
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

    return (
        <>
            <div className={styles.card}>
                <img style={{width: '250px', height: '180px'}} src={beach.image} alt="Beach Image" />
                <h2 className="card-heading">{beach.name}</h2>
                <h4 className="card-location">Location: {beach.location}, {beach.country}</h4>
                <p>{beach.description}
                </p>
                <div className="rating">
                    Rating
                    <p className="rating-stat">Beach: {beach.rating?.beach}</p>
                    <p className="rating-stat">Infrastructure: {beach.rating?.infrastructure}</p>
                    <p className="rating-stat">Prices: {beach.rating?.prices}</p>
                </div>
                {auth && auth._id === beach._ownerId && <Button color="yellow" text="Edit" type="button" onClickFunction={openEdit} />}
                {auth && auth._id === beach._ownerId && <Button color="red" text="Delete" type="button" onClickFunction={handleDelete} />}
            </div>
            {edit && <BeachCardEdit beach={beach} handleClose={handleClose} editBeach={editBeach} />}
        </>
    )
}

export default BeachCardDetails;