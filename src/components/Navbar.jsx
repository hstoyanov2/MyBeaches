import React from 'react';
import beachLogo from '../static/beach-logo.png';

const Navbar = () => {
    const hasUser = false;
    const [weather, setWeather] = React.useState({});

    React.useEffect(() => {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=42.15&longitude=24.75&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FMoscow")
        .then(response => response.json())
        .then(data => setWeather(data))
    }, [])

    console.log(weather);

    return ( hasUser ?
        <nav className="nav">
            <img src={beachLogo} alt="beach logo" className="nav-logo"/>
            <div className="nav-link">{weather?.current_weather?.weathercode}</div>
            <a href='/beaches' className="nav-link">Beaches</a>
            <a href='/my-beaches' className="nav-link">My Beaches</a>
            <a href='/account' className="nav-link">Account</a>
        </nav> :
        <nav className="nav">
            <img src={beachLogo} alt="beach logo" className="nav-logo"/>
            <div className="nav-link">{weather?.current_weather?.weathercode}</div>
            <a href='/beaches' className="nav-link">Beaches</a>
            <a href='/login' className="nav-link">Login</a>
            <a href='/register' className="nav-link">Register</a>
        </nav>
    )
    
}

export default Navbar;                            