import React from 'react';
import Navbar from './Navbar';
import Content from './Content';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import BeachCardDetails from './BeachCardDetails';
import BeachCardEdit from './BeachCardEdit';

const MainContainer = () => {
    const [auth, setAuth] = React.useState([]);
    const [hasUser, setHasUser] = React.useState(false);

    const mainContainerRef = React.useRef(null);

    const baseUrl = 'http://localhost:3030/users';

    const urlChoices = {
        login: '/login',
        register: '/register',
        logout: '/logout',
    }

    const onLogin = async (data) => {
        try {
            const response = await fetch(`${baseUrl}${urlChoices.login}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                if (response.status === 403) {
                    alert('Email and/or password are not correct.');
                } else {
                    alert(`Error logging in: ${response.status}.`);
                }
                throw new Error(response);
            } else if (response.status === 204) {
                return {};
            } else {
                const result = await response.json();
                console.log(result);
                setAuth(result);
                setHasUser(true);
            }
        } catch (err) {
            
        }
    }

    const onRegister = async (data) => {
        try {
            const response = await fetch(`${baseUrl}${urlChoices.register}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                if (response.status === 409) {
                    alert('Email already exists.');
                } else {
                    alert(`Error logging in: ${response.status}.`);
                }
                throw new Error(response.status);
            } else if (response.status === 204) {
                return {};
            } else {
                const result = await response.json();
                console.log(result);
                setAuth(result)
                setHasUser(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onLogout = async () => {
        console.log('logout')
        try {
            const response = await fetch(`${baseUrl}${urlChoices.logout}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": auth.accessToken,
                },
            });
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                console.log(auth);
                setAuth({});
                setHasUser(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {

    }, [hasUser])

    const contextValues = {
        auth,
        hasUser,
        onLogin,
        onRegister,
        onLogout
    }

    return (
        <AuthContext.Provider value={contextValues}>
            <div className="main-container" ref={mainContainerRef} >
                <Navbar />
                <Routes>
                    <Route path="/" element={<Content
                        contentTitle="Find the perfect beach"
                        description="text a lot of text here text a lot of text here text a lot of text here text a lot of text here "
                        secondHeading="Top rated locations:"
                        fetchUrl="http://localhost:3030/data/beaches"
                        listOptions={null}
                        />} 
                    />
                    <Route path="/beaches" element={<Content
                        contentTitle="A list of all the beaches"
                        description="Here you can find a list of all the beaches that users have created in this application. All this information gathered in one place along with user's rating and experiences will help you pick the ideal beach for this summer holiday. By clicking on the desired beach you will find more information about it."
                        secondHeading="Beach list"
                        fetchUrl="http://localhost:3030/data/beaches"
                        listOptions={null}
                        containerRef={mainContainerRef}
                        hasUser={hasUser}
                        />} 
                    />
                    <Route path="/my-beaches" element={<Content
                        contentTitle="A list of your beaches"
                        description="Here you can find a list of all the beaches that users have created in this application. All this information gathered in one place along with user's rating and experiences will help you pick the ideal beach for this summer holiday. By clicking on the desired beach you will find more information about it."
                        secondHeading="Beach list"
                        fetchUrl="http://localhost:3030/data/beaches"
                        listOptions={{filter: `where=_ownerId%3D%22${auth._id}%22`}}
                        containerRef={mainContainerRef}
                        hasUser={hasUser}
                        />} 
                    />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/beaches/:beachId" element={<BeachCardDetails />} />
                    <Route path="/beaches/:beachId/edit" element={<BeachCardEdit />} />
                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default MainContainer;