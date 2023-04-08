import React from 'react';
import styles from './BeachCardEditStyles.module.css';
import logo from '../static/beach-logo.png';
import Button from './Button';

const BeachCardEdit = ({ beach, handleClose, editBeach }) => {

    const [values, setValues] = React.useState(beach);
    const [errorMessage, setErrorMessage] = React.useState('');

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
            createdBy: beach.createdBy,
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
        let fields = [];
        if (values.name === '') {
            fields.push('name');
        }
        if (values.image === '') {
            fields.push('image');
        }
        if (values.location === '') {
            fields.push('location');
        }
        if (values.country === '') {
            fields.push('country');
        }
        if (fields.length > 0) {
            setErrorMessage(`Please fill all required fields: ${fields.join(', ')}.`);
        } else {
            editBeach(newValues);
        }
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.imageContainer}>
                    <img className={styles.logo} src={logo} alt="logo" />
                </div>
                <h2 className={styles.heading}>EDIT BEACH</h2>
                <h4 style={{color: 'red'}}>{errorMessage}</h4>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>        
                <div className={styles.innerDiv}>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Name</label>
                        <input className={styles.input} name="name" type="text" placeholder="Cool beach" defaultValue={beach.name} onChange={onChangeHandler}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Image</label>
                        <input className={styles.input} name="image" type="text" placeholder="A picture from the beach" defaultValue={beach.image} onChange={onChangeHandler}/>
                    </div>
                </div>
                <div className={styles.innerDiv}>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Location</label>
                        <input className={styles.input} name="location" type="text" placeholder="Corfu" defaultValue={beach.location} onChange={onChangeHandler}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Country</label>
                        <input className={styles.input} name="country" type="text" placeholder="Greece" defaultValue={beach.country} onChange={onChangeHandler}/>
                    </div>
                </div>
                <div className={styles.inputDiv}>
                    <label className={styles.label} htmlFor="">Description</label>
                    <textarea className={styles.textArea} name="description" type="text" placeholder="Write something for the beach" defaultValue={beach.description} onChange={onChangeHandler}/>
                </div>    
                <div className={styles.innerDiv}>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Beach rating</label>
                        <input className={styles.inputRating} name="beach" type="number" placeholder="1 to 5" defaultValue={beach.rating.beach} onChange={onChangeHandler}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Infrastructure rating</label>
                        <input className={styles.inputRating} name="infrastructure" type="number" placeholder="1 to 5" defaultValue={beach.rating.infrastructure} onChange={onChangeHandler}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Prices rating</label>
                        <input className={styles.inputRating} name="prices" type="number" placeholder="1 to 5" defaultValue={beach.rating.prices} onChange={onChangeHandler}/>
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