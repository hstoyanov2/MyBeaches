import React from 'react';
import styles from './NavbarStyles.module.css';
import beachLogo from '../static/beach-logo.png';
import weatherIcons from '../static/weatherIcons.json';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
    // const [user, hasUser] = React.useState(false);
    const [weather, setWeather] = React.useState({});

    const { auth, hasUser, onLogout } = React.useContext(AuthContext)

    React.useEffect(() => {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=42.15&longitude=24.75&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FMoscow")
        .then(response => response.json())
        .then(data => setWeather(data))
    }, [])

    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate('/')
    }
    
    return ( hasUser ?
        <nav className={styles.nav}>
            <img src={beachLogo} alt="beach logo" className={styles.navLogo} onClick={navigateToHomePage}/>
            <div className={styles.weatherDiv}><span className={styles.navSpan}>{weather?.current_weather?.temperature}°C</span><img src={weatherIcons[weather?.current_weather?.weathercode]?.day.image} alt="weather code icon" className={styles.weatherIcon}></img></div>
            <NavLink to='/beaches' className={styles.navLink}>Beaches</NavLink>
            <NavLink to='/my-beaches' className={styles.navLink}>My Beaches</NavLink>
            <div className={styles.navLink}>User: {<span style={{color: 'blue'}}>{auth.email}</span>}</div>
            <NavLink to='/' className={styles.navLink} onClick={onLogout}>Logout</NavLink>
        </nav> :
        <nav className={styles.nav}>
            <NavLink to="/" className={styles.navLogo} style={{}}>
                <img src={beachLogo} alt="beach logo" className={styles.navLogo}/>
            </NavLink>
            <div className={styles.weatherDiv}><span className={styles.navSpan}>{weather?.current_weather?.temperature}°C</span><img src={weatherIcons[weather?.current_weather?.weathercode]?.day.image}alt="weather code icon" className={styles.weatherIcon}></img></div>
            <NavLink to='/beaches' className={styles.navLink}>Beaches</NavLink>
            <NavLink to='/login' className={styles.navLink}>Login</NavLink>
            <NavLink to='/register' className={styles.navLink}>Register</NavLink>
        </nav>
    )
    
}

export default Navbar;                            