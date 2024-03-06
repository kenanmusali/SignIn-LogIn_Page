import React, { useState } from 'react';
import './style.css';

const LoginMenu = ({ setIsLoginMode, setUser }) => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            userid: "",
            passwordid: ""
        });
    };

    const [formData, setFormData] = useState({
        userid: "",
        passwordid: "",
        todos:[]
    });

    const loginUser = (e) => {
        e.preventDefault();

        if (!formData.userid || !formData.passwordid) {
            alert("Please enter username and password.");
            return;
        }

        if (isLogin) {
            fetch(`http://localhost:3000/data?username=${formData.userid}&password=${formData.passwordid}`)
                .then(res => res.json())
                .then(data => {
                    if (data.length) {
                        setIsLoginMode(true);
                        setUser(data[0]);
                    } else {
                        alert("Username not found.");
                    }
                });
        } else {
            fetch('http://localhost:3000/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    setIsLogin(true);
                    setIsLoginMode(true);
                    setUser(data);
                });
        }
    };

    return (
        <div className="login-menu">
            <div className='userName'>
                <p>User Name</p>
                <input type="text" placeholder='@' required maxLength={25}
                    value={formData.userid}
                    onChange={(e) => setFormData({ ...formData, userid: e.target.value })} />
            </div>
            <div>
                <p>Password</p>
                <input type="password" required maxLength={50}
                    value={formData.passwordid}
                    onChange={(e) => setFormData({ ...formData, passwordid: e.target.value })} />
            </div>
            <a onClick={loginUser} className='login'>{isLogin ? 'Log In' : 'Sign In'}</a>
            <a onClick={toggleMode} className='signin'>{isLogin ? 'No Account? Create One.' : 'Already have Account?'}</a>
        </div>
    );
};

export default LoginMenu;
