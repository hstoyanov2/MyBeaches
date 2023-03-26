import React from 'react';
import BeachCard from './BeachCard';

const Content = (props) => {
    const { contentTitle, description, form = {}, list = {} } = props;
    const [beaches, setBeaches] = React.useState([])
    const cards = [1, 2, 3, 4]

    
    React.useEffect(() => {
        fetch('http://localhost:3030/jsonstore/beaches/')
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            setBeaches(data)})
    }, [])

    console.log(beaches);

    return (
        <div className="content-div">
            <h1 style={{margin: 'auto'}}>{contentTitle}</h1>
            <p style={{margin: 'auto'}}>{description}</p>
            <h3 style={{margin: 'auto', paddingTop: '300px'}}>Top rated locations:</h3>
            <div className="beach-list">
                {Object.values(beaches).map(beach => <BeachCard card={beach}/>)}
            </div>
        </div>
    )
}

export default Content;