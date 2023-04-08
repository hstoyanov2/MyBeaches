import React from 'react';
import styles from './LoginFormStyles.module.css';
import logo from '../static/beach-logo.png';
import Button from './Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {

    const initialValues = {
        email: '',
        password: ''
    }

    const [userLogin, setUserLogin] = React.useState(initialValues);
    const { onLogin } = React.useContext(AuthContext);

    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setUserLogin(state => ({...state, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(userLogin);
        navigate('/beaches');
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
            <input className={styles.input} name="email" type="email" placeholder="example@domain.com" onChange={onChangeHandler} />
            <label className={styles.label} htmlFor="">Password</label>
            <input className={styles.input} name="password" type="password" placeholder="********" onChange={onChangeHandler} />
            <div className={styles.buttonContainer}>
                <Button color="green" text="Log in" type="submit" />
            </div>
            <Link className={styles.link} to='/register'>To register</Link>
            </form>
        </div>
    )
}

export default LoginForm;