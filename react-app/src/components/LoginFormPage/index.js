import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import './LoginForm.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <span id='logo'
        onClick={() => {
          sessionUser ? history.push('/home') : history.push('/')
        }}
        style={{ marginTop: "1em", display: "block" }}
      >
        Linked
        <span className='nav-bar-logo'>Up</span>
      </span>
      <div className="sign-in-page-container">
        <h1>Sign in</h1>
        <div>Stay updated on your professional world</div>
        {/* <h3>Stay updated on your professional world</h3> */}
        <form className="login-form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>

          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>
        </form>
      </div>
      <div id="bottom-join">
        New to LinkedUp? <NavLink to="/signup">Join now</NavLink>
      </div>
    </>
  );
}

export default LoginFormPage;
