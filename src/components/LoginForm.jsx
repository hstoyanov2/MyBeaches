import React from 'react';
import styles from './LoginFormStyles.module.css';
import logo from '../static/beach-logo.png';
import { AuthContext } from '../contexts/AuthContext';


const LoginForm = () => {
    const { onLogin } = React.useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        // if (data.password.length < 6) {
        //     alert('Password must be atleast 6 characters long!');
        // } else {
            onLogin(data);
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

            <label className={styles.label} htmlFor="">Email</label>
            <input className={styles.input} name="email" type="email" placeholder="example@domain.com" />
            <label className={styles.label} htmlFor="">Password</label>
            <input className={styles.input} name="password" type="password" placeholder="8 characters or more" />
            <button className={styles.button} type="submit">
                Login
            </button>
            </form>
        </div>
    )
}

export default LoginForm;