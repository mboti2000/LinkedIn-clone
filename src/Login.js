import React, { useState } from 'react';
import './Login.css';
import { auth } from './firebase';
import { login } from './features/userSlice';

import { useDispatch } from 'react-redux';

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');

    const dispatch = useDispatch();

    const register = () =>{
        if(!name) return alert('Please enter a full name!');

        auth.createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic
            })
            .then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoURL: profilePic
                }));
            })
        }).catch(err => alert(err.message));
    };

    const loginToApp = (e) =>{
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then(userAuth =>{
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoURL: userAuth.user.phoneNumber
            }));
        }).catch(err => alert(err));
    };

    return (
        <div className="login">
            <img src="https://www.pinclipart.com/picdir/middle/55-557165_graphic-transparent-library-file-logo-wikimedia-commons-transparent.png" alt="" />

            <form>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full name required if registering" />
                <input value={profilePic} onChange={(e) => setProfilePic(e.target.value)} type="text" placeholder="Profile pic URL (optional)" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />

                <button onClick={loginToApp}>Sign In</button>
            </form>

            <p>
                Not a member?{" "}
                <span className="login__register" onClick={register}>Register Now</span>
            </p>
        </div>
    );
};

export default Login;