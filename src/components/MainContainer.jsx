import React from 'react';
import Navbar from './Navbar';
import Content from './Content';
import LoginForm from './LoginForm';

const MainContainer = () => {
    return (
        <div className="main-container">
            <Navbar />
            {/* <Content
                contentTitle="Find the perfect beach"
                description="text a lot of text here text a lot of text here text a lot of text here text a lot of text here "
                form={null}
                list={null}
            /> */}
            <LoginForm />
        </div>
    );
}

export default MainContainer;