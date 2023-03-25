import React from 'react';
import beachLogo from '../static/beach-logo.png';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const hasUser = false;
    const [weather, setWeather] = React.useState({});

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

    // const beach = {
    //     name: "Kavacite Beach",
    //     location: "Sozopol",
    //     country: "Bulgaria",
    //     image: "https://rezervaciq.com/img/objects/sights_1247_37744293100350062355084eae7bafc19e49766cb.jpg",
    //     rating: {
    //         beach: 4.50,
    //         infrastructure: 5,
    //         prices: 2.50
    //     }
    // }

    // React.useEffect(() => {
    //     fetch('http://localhost:3030/jsonstore/beaches/', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(beach)
    //     }).then(response => response.json()).then((data) => console.log(data))
    // }, [])

    return ( hasUser ?
        <nav className="nav">
            <img src={beachLogo} alt="beach logo" className="nav-logo" onClick={navigateToHomePage}/>
            <div className="nav-link">{weather?.current_weather?.weathercode}</div>
            <a href='/beaches' className="nav-link">Beaches</a>
            <a href='/my-beaches' className="nav-link">My Beaches</a>
            <a href='/account' className="nav-link">Account</a>
        </nav> :
        <nav className="nav">
            <NavLink to="/" className="nav-logo">
                <img src={beachLogo} alt="beach logo" className="nav-logo"/>
            </NavLink>
            <div className="nav-link">{weather?.current_weather?.weathercode}</div>
            <a href='/beaches' className="nav-link">Beaches</a>
            <NavLink to='/login' className="nav-link">Login</NavLink>
            <a href='/register' className="nav-link">Register</a>
        </nav>
    )
    
}

export default Navbar;                            