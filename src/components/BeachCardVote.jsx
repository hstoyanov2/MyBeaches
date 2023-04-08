import React from 'react';
import styles from './BeachCardVoteStyles.module.css';
import logo from '../static/beach-logo.png';
import { AuthContext } from '../contexts/AuthContext';
import Button from './Button';

const BeachCardVote = ({ beach, handleClose, voteBeach }) => {
    
    const errors = {
        beach: true,
        infrastructure: true,
        prices: true,
        comment: true,
    }
    
    const [blurErrors, setErrors] = React.useState(errors);
    const [errorMessage, setErrorMessage] = React.useState('');
    
    const { auth } = React.useContext(AuthContext);

    const initialValues = {
        createdBy: auth.email,
        beachId: beach._id,
        beach: 0,
        infrastructure: 0,
        prices: 0,
        comment: '',
    }

    const [values, setValues] = React.useState(initialValues);
    
    const onChangeHandler = (e) => {
        if (e.target.name === 'beach' || e.target.name === 'infrastructure' || e.target.name === 'prices') {
            if (e.target.value > 5) {
                e.target.value = 5;
            } else if (e.target.value < 1) {
                e.target.value = 1;
            };
        }
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value          
        }));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let fields = [];
        if (!values.beach) {
            fields.push('beach');
        }
        if (!values.infrastructure) {
            fields.push('infrastructure');
        }
        if (!values.prices) {
            fields.push('prices');
        }
        if (values.comment === '') {
            fields.push('comment');
        }
        if (fields.length > 0) {
            setErrorMessage(`Please fill all required fields: ${fields.join(', ')}.`);
        } else {
            voteBeach(values);
        }
    }
    
    const handleOnBlurError = (e) => {
        if (e.target.value === '') {
            setErrors((errors) => ({...errors, [e.target.name]: true}))
        } else {
            setErrors((errors) => ({...errors, [e.target.name]: false}))
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.imageContainer}>
                    <img className={styles.logo} src={logo} alt="logo" />
                </div>
                <h2 className={styles.heading}>RATE AND COMMENT BEACH</h2>
                <h4 style={{color: 'red'}}>{errorMessage}</h4>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.innerDiv}>    
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Beach rating</label>
                        <input className={styles.inputRating} name="beach" type="number" placeholder="1 to 5" onChange={onChangeHandler} onBlur={handleOnBlurError} style={{ borderBottom: blurErrors.beach ? '2px solid red' : ''}}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Infrastructure rating</label>
                        <input className={styles.inputRating} name="infrastructure" type="number" placeholder="1 to 5" onChange={onChangeHandler} onBlur={handleOnBlurError} style={{ borderBottom: blurErrors.infrastructure ? '2px solid red' : ''}}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Prices rating</label>
                        <input className={styles.inputRating} name="prices" type="number" placeholder="1 to 5" onChange={onChangeHandler} onBlur={handleOnBlurError} style={{ borderBottom: blurErrors.prices ? '2px solid red' : ''}}/>
                    </div>
                    <div className={styles.inputDiv}>
                        <label className={styles.label} htmlFor="">Comment</label>
                        <textarea className={styles.textArea} name="comment" type="text" placeholder="Write something for the beach" onChange={onChangeHandler} onBlur={handleOnBlurError} style={{ borderBottom: blurErrors.comment ? '2px solid red' : ''}}/>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <Button color="red" text="Close" type="button" onClickFunction={handleClose} />
                    <Button color="green" text="Vote" type="submit" onClickFunction={handleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default BeachCardVote;