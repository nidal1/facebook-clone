import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from './firebase';
import './login.css'


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();

    const register = () => {
        if (!name) {
            return alert("Please enter a full name ")
        }

        if (!email) {
            return alert("Please enter a full email ")
        }

        if (!password) {
            return alert("Please enter a password ")
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userAuth) => {
                updateProfile(userAuth.user, {
                    displayName: name,
                    photoUrl: profilePic,
                })
                    .then(() => {
                        dispatch(login({
                            email: userAuth.user.email,
                            uid: userAuth.user.uid,
                            displayName: name,
                            photoUrl: profilePic
                        }));
                    });
            })
            .catch((err) => {
                alert(err.message)
            });
    }

    const loginToApp = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userAuth) => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.displayName,
                    photoUrl: userAuth.photoUrl
                }));
            })
            .catch((err) => {
                alert(err.message)
            });
    }
    return (
        <div className="login">
            <img src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png" alt="" />
            <form action="">
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full name (required if register)" name="" id="" />

                <input value={profilePic} onChange={(e) => setProfilePic(e.target.value)} type="text" name="" id="" placeholder="Profile pic URL (Optional)" />

                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />

                <button type="submit" onClick={loginToApp}>Sign In</button>
            </form>
            <p>Not a member? <span className="login__register" onClick={register}>Register Now</span></p>
        </div>
    )
}

export default Login
