import React from 'react';
import styles from './BeachCardEditStyles.module.css';
import logo from '../static/beach-logo.png';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Button from './Button';

const BeachCardEdit = ({ beach, handleClose, editBeach }) => {

    const { auth } = React.useContext(AuthContext);

    const { navigate } = useNavigate();

    const [values, setValues] = React.useState(beach);

    const onChangeHandler = (e) => {
        if (e.target.name === 'beach' || e.target.name === 'infrastructure' || e.target.name === 'prices') {
            setValues(state => ({...state, rating : { ...state.rating, [e.target.name]: e.target.value }}));
        } else {
            setValues(state => ({...state, [e.target.name]: e.target.value}));
        }
    }
    console.log(styles);
    const handleSubmit = (e) => {
        e.preventDefault();
        editBeach(values);
    }
    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.imageContainer}>
                    <img className={styles.logo} src={logo} alt="logo" />
                </div>
                <h2 className={styles.heading}>EDIT BEACH</h2>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>        
                <div className={styles.innerDiv}>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Name</label>
                        <input className={styles.input} name="name" type="text" placeholder="Cool beach" onChange={onChangeHandler}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Image</label>
                        <input className={styles.input} name="image" type="text" placeholder="8 characters or more" onChange={onChangeHandler}/>
                    </div>
                </div>
                <div className={styles.innerDiv}>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Location</label>
                        <input className={styles.input} name="location" type="text" placeholder="8 characters or more" onChange={onChangeHandler}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Country</label>
                        <input className={styles.input} name="country" type="text" placeholder="8 characters or more" onChange={onChangeHandler}/>
                    </div>
                </div>
                <div className={styles.inputDiv}>
                    <label className={styles.label} htmlFor="">Description</label>
                    <textarea className={styles.textArea} name="description" type="text" placeholder="8 characters or more" onChange={onChangeHandler}/>
                </div>    
                <div className={styles.innerDiv}>
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
                </div>
                <div className={styles.buttonContainer}>
                    <Button color="red" text="Close" type="button" onClickFunction={handleClose} />
                    <Button color="green" text="Edit" type="submit" onClickFunction={handleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default BeachCardEdit;