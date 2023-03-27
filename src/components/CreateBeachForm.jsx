import React from 'react';
import styles from './CreateBeachFormStyles.module.css';
import logo from '../static/beach-logo.png';
import { AuthContext } from '../contexts/AuthContext';
import Button from './Button';


const CreateBeachForm = ({ handleClose, createBeach }) => {
    const { onLogin } = React.useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target.parentNode.parentNode));
        const dataMap = {
            name: data.name,
            location: data.location,
            country: data.country,
            image: data.image,
            rating: {
                beach: data.beach,
                infrastructure: data.infrastructure,
                prices: data.prices,
            }
        }
        console.log(dataMap);
        createBeach(dataMap);
        // if (data.password.length < 6) {
        //     alert('Password must be atleast 6 characters long!');
        // } else {
            // onLogin(data);
        // }
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
                <input className={styles.input} name="name" type="text" placeholder="Cool beach" />
                <label className={styles.label} htmlFor="">Location</label>
                <input className={styles.input} name="location" type="text" placeholder="8 characters or more" />
                <label className={styles.label} htmlFor="">Country</label>
                <input className={styles.input} name="country" type="text" placeholder="8 characters or more" />
                <label className={styles.label} htmlFor="">Image</label>
                <input className={styles.input} name="image" type="text" placeholder="8 characters or more" />
                <label className={styles.label} htmlFor="">Beach rating</label>
                <input className={styles.input} name="beach" type="number" placeholder="8 characters or more" />
                <label className={styles.label} htmlFor="">Infrastructure rating</label>
                <input className={styles.input} name="infrastructure" type="number" placeholder="8 characters or more" />
                <label className={styles.label} htmlFor="">Prices rating</label>
                <input className={styles.input} name="prices" type="number" placeholder="8 characters or more" />
                <div className={styles.buttonContainer}>
                    <Button color="red" text="Close" type="button" onClickFunction={handleClose} />
                    <Button color="green" text="Create" type="submit" onClickFunction={handleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default CreateBeachForm;