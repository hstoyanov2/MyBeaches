import React from 'react';
import Navbar from './Navbar';
import Content from './Content';
import LoginForm from './LoginForm';
import { Routes, Route } from 'react-router-dom';

const MainContainer = () => {
    return (
        <div className="main-container">
            <Navbar />
            <Routes>
                <Route path="/" element={<Content
                    contentTitle="Find the perfect beach"
                    description="text a lot of text here text a lot of text here text a lot of text here text a lot of text here "
                    form={null}
                    list={null}
                    />} 
                />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
            
            
            
        </div>
    );
}

export default MainContainer;