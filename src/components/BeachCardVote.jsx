import React from 'react';
import styles from './BeachCardVoteStyles.module.css';
import logo from '../static/beach-logo.png';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from './Button';

const BeachCardEdit = ({ beach, handleClose, editBeach }) => {

    const { auth } = React.useContext(AuthContext);

    const { navigate } = useNavigate();

    const [values, setValues] = React.useState(beach);
    console.log(values);
    const onChangeHandler = (e) => {
            setValues(state => ({
                ...state,
                rating :
                    {
                        ...state.rating,
                        [auth._id] :
                            {
                                ...state.rating[auth._id], [e.target.name]: e.target.value
                            }
                    }
            }));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        editBeach(values);
    }
    return (
        <div className={styles.container}>
            {/* <div className={styles.topContainer}>
                <div className={styles.imageContainer}>
                    <img className={styles.logo} src={logo} alt="logo" />
                </div>
                <h2 className={styles.heading}>EDIT BEACH</h2>
            </div> */}
            <form className={styles.form} onSubmit={handleSubmit}>    
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Beach rating</label>
                        <input className={styles.inputRating} name="beach" type="number" placeholder="8 characters or more" onChange={onChangeHandler}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Infrastructure rating</label>
                        <input className={styles.inputRating} name="infrastructure" type="number" placeholder="8 characters or more" onChange={onChangeHandler}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Prices rating</label>
                        <input className={styles.inputRating} name="prices" type="number" placeholder="8 characters or more" onChange={onChangeHandler}/>
                    </div>
                <div className={styles.buttonContainer}>
                    <Button color="red" text="Close" type="button" onClickFunction={handleClose} />
                    <Button color="green" text="Vote" type="submit" onClickFunction={handleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default BeachCardEdit;