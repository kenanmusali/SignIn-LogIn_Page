import React, { useState } from 'react';
import './style.css';

const LoginMenu = ({ isLoginMode, setIsLoginMode, setUser }) => {

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
    };

    const [formData, setFormData] = useState({
        userid: "",
        passwordid: ""
    })

    const loginUser = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/data?username=${formData.userid}&password=${formData.passwordid}`)
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    setIsLoginMode(true);
                    setUser(data[0])
                } else {
                    alert("Username not Found.");
                }
            });
    };

    return (
        <div className="login-menu">
            <div className='userName'>
                <p>User Name</p>
                <input type="text" placeholder='@' required maxLength={25}
                    onChange={(e) => setFormData({ ...formData, userid: e.target.value })} />
            </div>
            <div>
                <p>Password</p>
                <input type="password" required maxLength={50}
                    onChange={(e) => setFormData({ ...formData, passwordid: e.target.value })} />
            </div>
            <a onClick={loginUser} className='login'>{isLoginMode ? 'Sign In' : 'Log In'}</a>
            <a className='signin' onClick={toggleMode}>{isLoginMode ? 'Already have Account?' : 'No Account? Create One.'}</a>
        </div>
    );
};

export default LoginMenu;