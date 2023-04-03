import React from 'react';
import styles from './LoginFormStyles.module.css';
import logo from '../static/beach-logo.png';
import Button from './Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {

    const initialValues = {
        email: '',
        password: '',
        repeatPassword: ''
    }

    const [userRegister, setUserRegister] = React.useState(initialValues);
    const { onRegister } = React.useContext(AuthContext);

    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setUserRegister(state => ({...state, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userRegister.password.length < 8) {
            alert('Password must be at least 8 characters long!');
        } else if (userRegister.password !== userRegister.repeatPassword) {
            alert('Password do not match!');
        } else {
            onRegister(userRegister);
            navigate('/beaches');
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.topContainer}>
                <div className={styles.imageContainer}>
                    <img className={styles.logo} src={logo} alt="logo" />
                </div>
                <h2 className={styles.heading}>Register</h2>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>

            <label className={styles.label} htmlFor="">Email</label>
            <input className={styles.input} name="email" type="email" placeholder="example@domain.com" onChange={onChangeHandler} />
            <label className={styles.label} htmlFor="">Password</label>
            <input className={styles.input} name="password" type="password" placeholder="8 characters or more" onChange={onChangeHandler} />
            <label className={styles.label} htmlFor="">Repeat Password</label>
            <input className={styles.input} name="repeatPassword" type="password" placeholder="Repeat password" onChange={onChangeHandler} />
            <div className={styles.buttonContainer}>
                <Button color="green" text="Register" type="submit" />
            </div>
            <Link className={styles.link} to='/login'>To login</Link>
            </form>
        </div>
    )
}

export default RegisterForm;