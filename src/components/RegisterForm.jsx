import React from 'react';
import styles from './LoginFormStyles.module.css';
import logo from '../static/beach-logo.png';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
    const { onRegister } = React.useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        if (data.password.length < 8) {
            alert('Password must be at least 8 characters long!');
        } else if (data.password !== data.repeatPassword) {
            alert('Password do not match!');
        } else {
            onRegister(data);
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
            <input className={styles.input} name="email" type="email" placeholder="example@domain.com" />
            <label className={styles.label} htmlFor="">Password</label>
            <input className={styles.input} name="password" type="password" placeholder="8 characters or more" />
            <label className={styles.label} htmlFor="">Repeat Password</label>
            <input className={styles.input} name="repeatPassword" type="password" placeholder="Repeat password" />
            <button className={styles.button} type="submit">
                Register
            </button>
            </form>
        </div>
    )
}

export default RegisterForm;