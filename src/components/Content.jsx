import React from 'react';
import BeachCard from './BeachCard';
import CreateBeachForm from './CreateBeachForm';
import Button from './Button';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Content = (props) => {
    const { contentTitle, description, secondHeading, fetchUrl = '', listOptions = {}, hasUser } = props;
    const [create, setCreate] = React.useState(false);
    const [list, setList] = React.useState([]);
    
    const { auth } = React.useContext(AuthContext);
    
    const navigate = useNavigate();

    let url = listOptions?.filter ? `${fetchUrl}?${listOptions?.filter}` : fetchUrl;
    url = listOptions?.sort ? `${fetchUrl}?${listOptions?.sort}` : fetchUrl;
    
    React.useEffect(() => {
        try {
            fetch(url)
            .then(response => response.json())
            .then((data) => {
                if (data.code === 200 || data.length > 0) {
                    if (listOptions?.count && typeof listOptions?.count === 'number') {
                        const list = Object.values(data).slice(0, listOptions.count);
                        setList(list);
                    } else {
                    setList(Object.values(data));
                    }
                } else {
                    setList([]);
                }
            })
        } catch (err) {

        }
        
    }, [fetchUrl, url])

    const handleClose = () => {
        setCreate(false);
    }

    const createBeach = async (data) => {
        try {
            if (hasUser) {
                const response = await fetch(fetchUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Authorization": auth.accessToken,
                    },
                    body: JSON.stringify(data)
                })
                if (!response.ok) {
                    throw new Error(response.status);
                } else if (response.status === 204) {
                    return {};
                } else {
                    const result = await response.json();
                    setList([...list, result]);
                    setCreate(false);
                    navigate('/beaches');
                }
            } else {
                throw new Error('There is no user logged in.')
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="content-div">
            <h1 style={{margin: 'auto'}}>{contentTitle}</h1>
            <p style={{margin: 'auto', maxWidth: '500px'}}>{description}</p>
            <h3 style={{margin: 'auto', paddingTop: '100px'}}>{secondHeading}</h3>
            <div className="beach-list">
                {Object.values(list).map(beach => <BeachCard card={beach} key={beach._id}/>)}
            </div>
            {hasUser && <Button color="blue" text="Add beach" type="button" onClickFunction={() => {setCreate(true)}} customStyles={{width: '200px', margin: 'auto'}} />}
            {create && <CreateBeachForm handleClose={handleClose} createBeach={createBeach} />}
        </div>
    )
}

// const testBeaches = 
// {
//     "37ea250e-7f4d-44ef-a6c8-d48e00699975": {
//         "name":"Ammolofoi Beach",
//         "location":"Nea Peramos",
//         "country":"Greece",
//         "image":"https://i.ytimg.com/vi/HIMTTjqUyrw/maxresdefault.jpg",
//         "description": "Text description of beach Text description of beach Text description of beach Text description of beach ",
//         "rating": {
//             "beach":5,
//             "infrastructure":4.5,
//             "prices":4
//         },
//         "_id":"37ea250e-7f4d-44ef-a6c8-d48e00699975"
//     },
//     "4758308b-a1b3-435d-bab0-7c1c6ed953d6": {
//         "name":"Mesi Beach",
//         "location":"Mesi",
//         "country":"Greece",
//         "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDvsHZXQdIAaLu2SXxcg6Y5eChvIASVZdlTIetPmj3-tszVlaZiMz4dHStHSA05uMFgs&usqp=CAU",
//         "description": "Text description of beach Text description of beach Text description of beach Text description of beach ",
//         "rating": {
//             "beach":4.5,
//             "infrastructure":3.5,
//             "prices":4.5
//         },
//         "_id":"4758308b-a1b3-435d-bab0-7c1c6ed953d6"
//     },
//     "4b2124ff-1e61-4f04-9675-4489bc1ab429": {
//         "name":"Kavacite Beach",
//         "location":"Sozopol",
//         "country":"Bulgaria",
//         "image":"https://rezervaciq.com/img/objects/sights_1247_37744293100350062355084eae7bafc19e49766cb.jpg",
//         "description": "Text description of beach Text description of beach Text description of beach Text description of beach ",
//         "rating": {
//             "beach":4.5,
//             "infrastructure":5,
//             "prices":2.5
//         },
//         "_id":"4b2124ff-1e61-4f04-9675-4489bc1ab429"
//     }
// }


export default Content;