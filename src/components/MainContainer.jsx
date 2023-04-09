import React from 'react';
import Navbar from './Navbar';
import Content from './Content';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import BeachCardDetails from './BeachCardDetails';
import BeachCardEdit from './BeachCardEdit';
import NotFoundPage from './NotFoundPage';

const MainContainer = () => {
    const [auth, setAuth] = React.useState([]);
    const [hasUser, setHasUser] = React.useState(false);

    const mainContainerRef = React.useRef(null);

    const navigate = useNavigate();

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
                setAuth(result);
                setHasUser(true);
            }
        } catch (err) {
            alert(err);
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
                setAuth(result)
                setHasUser(true);
            }
        } catch (err) {
            alert(err);
        }
    }

    const onLogout = async () => {
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
                navigate('/');
                setAuth({});
                setHasUser(false);
            }
        } catch (err) {
            alert(err);
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
                        description="Welcome to our new web application designed for helping you choose your perfect holiday this summer(or maybe other season). You can also register and add beaches of your own, comment and rate other people beaches or just browse them. Have a nice time in our platform and don't forget to rate it."
                        secondHeading="Top rated locations:"
                        fetchUrl="http://localhost:3030/data/beaches"
                        listOptions={{sort: "sortBy=beachRating%20desc", count: 3}}
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
                        description="Here you can find a list of your beaches that you have created in this application. All this information gathered in one place along with user's rating and experiences will help you pick the ideal beach for this summer holiday. By clicking on the desired beach you will find more information about it."
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
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default MainContainer;