import React from 'react';
import styles from './CreateBeachFormStyles.module.css';
import logo from '../static/beach-logo.png';
import Button from './Button';
import { AuthContext } from '../contexts/AuthContext';


const CreateBeachForm = ({ handleClose, createBeach }) => {
    
    const { auth } = React.useContext(AuthContext);
    const userId = auth._id;
    
    const initialValues = {
        createdBy: auth.email,
        name: '',
        location: '',
        country: '',
        image: '',
        description: '',
        rating: {
        },
        beachRating: {
            beach: 0,
            infrastructure: 0,
            prices: 0,
        },
    };

    const [values, setValues] = React.useState(initialValues);

    const onChangeHandler = (e) => {
        if (e.target.name === 'beach' || e.target.name === 'infrastructure' || e.target.name === 'prices') {
            console.log(values.rating, values.rating.userId);
            setValues(state => (
                        {
                            ...state,
                            rating :
                                { 
                                    [userId] :
                                        {
                                            ...state.rating[userId], [e.target.name]: e.target.value
                                        }
                                },
                            beachRating: {...state.beachRating, [e.target.name]: e.target.value}
                        }
                    )
                );
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
                    <Button color="green" text="Create" type="submit" onClickFunction={handleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default CreateBeachForm;