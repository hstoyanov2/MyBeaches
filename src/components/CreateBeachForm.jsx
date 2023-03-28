import React from 'react';
import styles from './CreateBeachFormStyles.module.css';
import logo from '../static/beach-logo.png';
import Button from './Button';


const CreateBeachForm = ({ handleClose, createBeach }) => {
    
    const initialValues = {
        name: '',
        location: '',
        country: '',
        image: '',
        rating: {
            beach: 0,
            infrastructure: 0,
            prices: 0
        }
    };

    const [values, setValues] = React.useState(initialValues);

    const onChangeHandler = (e) => {
        if (e.target.name === 'beach' || e.target.name === 'infrastructure' || e.target.name === 'prices') {
            setValues(state => ({...state, rating : { ...state.rating, [e.target.name]: e.target.value }}));
        } else {
            setValues(state => ({...state, [e.target.name]: e.target.value}));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createBeach(values);
    }

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.imageContainer}>
                    <img className={styles.logo} src={logo} alt="logo" />
                </div>
                <h2 className={styles.heading}>LOG IN</h2>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>        
                <label className={styles.label} htmlFor="">Name</label>
                <input className={styles.input} name="name" type="text" placeholder="Cool beach" onChange={onChangeHandler}/>
                <label className={styles.label} htmlFor="">Location</label>
                <input className={styles.input} name="location" type="text" placeholder="8 characters or more" onChange={onChangeHandler}/>
                <label className={styles.label} htmlFor="">Country</label>
                <input className={styles.input} name="country" type="text" placeholder="8 characters or more" onChange={onChangeHandler}/>
                <label className={styles.label} htmlFor="">Image</label>
                <input className={styles.input} name="image" type="text" placeholder="8 characters or more" onChange={onChangeHandler}/>
                <label className={styles.label} htmlFor="">Beach rating</label>
                <input className={styles.input} name="beach" type="number" placeholder="8 characters or more" onChange={onChangeHandler}/>
                <label className={styles.label} htmlFor="">Infrastructure rating</label>
                <input className={styles.input} name="infrastructure" type="number" placeholder="8 characters or more" onChange={onChangeHandler}/>
                <label className={styles.label} htmlFor="">Prices rating</label>
                <input className={styles.input} name="prices" type="number" placeholder="8 characters or more" onChange={onChangeHandler}/>
                <div className={styles.buttonContainer}>
                    <Button color="red" text="Close" type="button" onClickFunction={handleClose} />
                    <Button color="green" text="Create" type="submit" onClickFunction={handleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default CreateBeachForm;