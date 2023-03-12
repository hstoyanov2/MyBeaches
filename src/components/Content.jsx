import React from 'react';
import BeachCard from './BeachCard';

const Content = (props) => {
    const { contentTitle, description, form = {}, list = {} } = props;
    
    const cards = [1, 2, 3, 4]

    return (
        <div className="content-div">
            <h1 style={{margin: 'auto'}}>{contentTitle}</h1>
            <p style={{margin: 'auto'}}>{description}</p>
            <h3 style={{margin: 'auto', paddingTop: '300px'}}>Top rated locations:</h3>
            <div className="beach-list">
                {cards.map(card => <BeachCard card={card}/>)}
            </div>
        </div>
    )
}

export default Content;