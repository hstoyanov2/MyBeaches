import React from 'react';

const LoginForm = () => {
    return (
        <form className="login-form" action="GET">
            <label htmlFor="">Email</label>
            <input name="email" type="email" placeholder="example@domain.com" />
            <label htmlFor="">Password</label>
            <input name="password" type="password" placeholder="8 characters or more" />
            <label htmlFor="">Repeat Password</label>
            <input name="repeat-password" type="password" />
        </form>
    )
}

export default LoginForm;