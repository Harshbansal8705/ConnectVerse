import React from 'react'
import Login from './Login';
import Signup from './Signup';
import { Navigate } from 'react-router-dom';
import "../Signin.css";

export default function Signin() {
    const [isLogin, setIsLogin] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <>
            {user ? <Navigate to="/" /> : <div className="container fadeInDown">
                <div id="formContent">
                    {/* <!-- Tabs Titles --> */}
                    <h2 className={isLogin ? 'active' : 'inactive underlineHover'} onClick={() => setIsLogin(true)}>Login</h2>
                    <h2 className={!isLogin ? 'active' : 'inactive underlineHover'} onClick={() => setIsLogin(false)}>Sign Up</h2>
                    {isLogin ? <Login /> : <Signup />}
                </div>
            </div>}
        </>
    )
}
