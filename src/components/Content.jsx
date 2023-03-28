import React from 'react';
import BeachCard from './BeachCard';
import CreateBeachForm from './CreateBeachForm';
import Button from './Button';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Content = (props) => {
    const { contentTitle, description, secondHeading, fetchUrl = '', listOptions = {}, containerRef, hasUser } = props;
    const [create, setCreate] = React.useState(false);
    const [list, setList] = React.useState([]);

    const { auth } = React.useContext(AuthContext);
    console.log(auth);
    
    const navigate = useNavigate();

    React.useEffect(() => {
        fetch(fetchUrl)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            setList(Object.values(data))})
    }, [fetchUrl])

    // React.useEffect(() => {
    //     console.log(containerRef?.current.backgroundColor);
    //     if (containerRef) {
    //         containerRef.current.backgroundColor = 'gray';
    //     }
    // }, [create])

    const handleClose = () => {
        setCreate(false);
    }
    console.log(list);

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

    const editBeach = async (data, id) => {
        try {
            if (hasUser) {
                const response = await fetch(`${fetchUrl}${id}`, {
                    method: "PUT",
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
                    const updatedList = list.map((beach) => {
                        if (beach._id === id) {
                            return result;
                        };
                        return beach;
                    })
                    setList([updatedList]);
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

export default Content;