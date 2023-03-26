import React from 'react';
import Navbar from './Navbar';
import Content from './Content';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { requestFactory } from '../utils/requester';

const MainContainer = () => {
    const [auth, setAuth] = React.useState([]);

    const baseUrl = 'http://localhost:3030/users';

    const urlChoices = {
        login: '/login',
        register: '/register',
        logout: './logout',
    }

    const onLogin = async (data) => {
        try {
            fetch(`${baseUrl}${urlChoices.login}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => setAuth(data))
        } catch (err) {
            console.log(err);
        }
    }

    const onRegister = async (data) => {
        try {
            const response = await fetch(`${baseUrl}${urlChoices.register}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error(response.status);
            } else if (response.status === 204) {
                return {};
            } else {
                const data = await response.json();
                console.log(data);
                setAuth(data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const onLogout = async () => {
        try {
            fetch(`${baseUrl}${urlChoices.logout}`)
            .then(response => response.json())
            .then(data => console.log(data))
        } catch (err) {
            console.log(err);
        }
    }

    const contextValues = {
        onLogin,
        onRegister,
        onLogout
    }

    return (
        <AuthContext.Provider value={contextValues}>
            <div className="main-container">
                <Navbar userAuth={auth}/>
                <Routes>
                    <Route path="/" element={<Content
                        contentTitle="Find the perfect beach"
                        description="text a lot of text here text a lot of text here text a lot of text here text a lot of text here "
                        form={null}
                        list={null}
                        />} 
                    />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
                    
                    
                    
            </div>
        </AuthContext.Provider>
    );
}

export default MainContainer;