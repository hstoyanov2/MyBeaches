import React from 'react';
import beachLogo from '../static/beach-logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = ({userAuth}) => {
    const [user, hasUser] = React.useState(false);
    const [weather, setWeather] = React.useState({});

    const { onLogout } = React.useContext(AuthContext)

    React.useEffect(() => {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=42.15&longitude=24.75&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FMoscow")
        .then(response => response.json())
        .then(data => setWeather(data))
    }, [])

    console.log(weather);

    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate('/')
    }

    React.useEffect(() => {
        if (Object.keys(userAuth).length == 0 || userAuth === undefined || userAuth === null) {
            hasUser(false);
        } else {
            hasUser(true);
        }

    }, [userAuth])

    return ( user ?
        <nav className="nav">
            <img src={beachLogo} alt="beach logo" className="nav-logo" onClick={navigateToHomePage}/>
            <div className="nav-link">{weather?.current_weather?.weathercode}</div>
            <a href='/beaches' className="nav-link">Beaches</a>
            <a href='/my-beaches' className="nav-link">My Beaches</a>
            <a href='/account' className="nav-link">Account</a>
            <a href='/' className="nav-link" onClick={onLogout}>Logout</a>
        </nav> :
        <nav className="nav">
            <NavLink to="/" className="nav-logo">
                <img src={beachLogo} alt="beach logo" className="nav-logo"/>
            </NavLink>
            <div className="nav-link">{weather?.current_weather?.weathercode}</div>
            <a href='/beaches' className="nav-link">Beaches</a>
            <NavLink to='/login' className="nav-link">Login</NavLink>
            <NavLink to='/register' className="nav-link">Register</NavLink>
        </nav>
    )
    
}

export default Navbar;                            