import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, useHistory, Redirect } from 'react-router-dom';
import { login } from "../../store/session";
import image from "../../assets/static/Landing-page-image.png"
import "./landing.css"
export default function LandingPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) {

        return <Redirect to="/home" />;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {

            setErrors(['The provided credentials are incorrect']);
        }
    };

    return (
        <div id='landing-page'>

            <div id="landing-navigation">
                <span id='logo'
                    onClick={() => {
                        sessionUser ? history.push('/home') : history.push('/')
                    }}
                >
                    Linked
                    <span className='nav-bar-logo'>Up</span>
                </span>
                <div className="landing-links">
                    <div id="signup-link">
                        <NavLink exact to="/signup"
                        >Join now</NavLink>

                    </div>
                    <div id='login-link'>
                        <NavLink exact to="/login"> Sign in</NavLink>

                    </div>
                </div>
            </div>
            <div id="landing-body">
                <div>
                    <h2 id="welcome">Welcome to your professional community</h2>
                    <form className='landing-login-form' onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => (
                                <li className='validation-errors' style={{ 'listStyle': 'none', textAlign: "left" }} key={idx}>{error}</li>
                            ))}
                        </ul>
                        <label>
                            Email
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <button className='login-button' type="submit">Sign In</button>
                    </form>
                    <div >
                        <button className='login-button demo-button'
                            onClick={() => {
                                dispatch(login("demo@aa.io", "password"));
                            }}
                        >Demo User</button>

                    </div>
                </div>
                <img className='landing-image' src={image}></img>
            </div>
            <div className='contact-card-container'>

                <div className='contact-card'>
                    Connect with the Developer
                    <div>
                        Jay Levin
                    </div>
                    <span className='contact-links'>


                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://linkedin.com/in/jay-levin">LinkedIn</a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://github.com/jaylevin96"

                        >GitHub</a>

                    </span>

                </div>

            </div>

        </div >)

}
