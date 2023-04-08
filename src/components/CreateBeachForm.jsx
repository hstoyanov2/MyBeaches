import React from 'react';
import styles from './CreateBeachFormStyles.module.css';
import logo from '../static/beach-logo.png';
import Button from './Button';
import { AuthContext } from '../contexts/AuthContext';


const CreateBeachForm = ({ handleClose, createBeach }) => {
    
    const {auth} = React.useContext(AuthContext);

    const initialValues = {
        createdBy: auth.email,
        name: '',
        location: '',
        country: '',
        image: '',
        description: '',
        rating: {
            beach: 1,
            infrastructure: 1,
            prices: 1,
        },
        beachRating: 1,
    };

    const [values, setValues] = React.useState(initialValues);

    const onChangeHandler = (e) => {
        if (e.target.name === 'beach' || e.target.name === 'infrastructure' || e.target.name === 'prices') {
            if (e.target.value > 5) {
                e.target.value = 5;
            } else if (e.target.value < 1) {
                e.target.value = 1;
            };
            setValues(state => ({...state, rating : { ...state.rating, [e.target.name]: e.target.value }}));
        } else {
            setValues(state => ({...state, [e.target.name]: e.target.value}));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const rating = ((Number(values.rating.beach) + Number(values.rating.infrastructure) + Number(values.rating.prices)) / 3).toFixed(2);
        const newValues = {
            createdBy: auth.email,
            name: values.name,
            location: values.location,
            country: values.country,
            image: values.image,
            description: values.description,
            rating: {
                beach: values.rating.beach,
                infrastructure: values.rating.infrastructure,
                prices: values.rating.prices,
            },
            beachRating: Number(rating),
        }
        createBeach(newValues);
    }

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.imageContainer}>
                    <img className={styles.logo} src={logo} alt="logo" />
                </div>
                <h2 className={styles.heading}>CREATE BEACH</h2>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>        
                <div className={styles.innerDiv}>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Name</label>
                        <input className={styles.input} name="name" type="text" placeholder="Cool beach" onChange={onChangeHandler}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Image</label>
                        <input className={styles.input} name="image" type="text" placeholder="A picture from the beach" onChange={onChangeHandler}/>
                    </div>
                </div>
                <div className={styles.innerDiv}>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Location</label>
                        <input className={styles.input} name="location" type="text" placeholder="Corfu" onChange={onChangeHandler}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Country</label>
                        <input className={styles.input} name="country" type="text" placeholder="Greece" onChange={onChangeHandler}/>
                    </div>
                </div>
                <div className={styles.inputDiv}>
                    <label className={styles.label} htmlFor="">Description</label>
                    <textarea className={styles.textArea} name="description" type="text" placeholder="Write something for the beach" onChange={onChangeHandler}/>
                </div>    
                <div className={styles.innerDiv}>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Beach rating</label>
                        <input className={styles.inputRating} name="beach" type="number" placeholder="1 to 5" onChange={onChangeHandler}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Infrastructure rating</label>
                        <input className={styles.inputRating} name="infrastructure" type="number" placeholder="1 to 5" onChange={onChangeHandler}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Prices rating</label>
                        <input className={styles.inputRating} name="prices" type="number" placeholder="1 to 5" onChange={onChangeHandler}/>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <Button color="red" text="Close" type="button" onClickFunction={handleClose} />
                    <Button color="green" text="Create" type="submit" onClickFunction={handleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default CreateBeachForm;