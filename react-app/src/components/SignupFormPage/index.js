import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [title, setTitle] = useState('')
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {

      const formData = new FormData();
      formData.append('first_name', firstname)
      formData.append('last_name', lastname)
      formData.append('title', title)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('profileImage', image)

      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords must match']);
    }
  };
  // console.log(image);

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
      <h2 id="cheesy-professional">Make the most of your professional life</h2>
      <div className="sign-in-page-container" style={{ marginTop: "2em", marginBottom: "2em" }}>
        <form className="login-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <ul>
            {errors.map((error, idx) => <li className="validation-errors" key={idx} style={{ listStyle: "none" }}>{error} </li>)}
          </ul>

          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          <input
            type="text"
            value={firstname}
            placeholder="First name"
            onChange={(e) => setFirstname(e.target.value)}
            required
          />


          <input
            type="text"
            value={lastname}
            placeholder="Last name"
            onChange={(e) => setLastname(e.target.value)}
            required
          />


          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />




          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label id="profile-button-upload">
            Add A Profile Picture
            <input id="file-input" type='file'
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ "display": "none" }}
            ></input>
          </label>

          <button type="submit">Join</button>
        </form>

      </div>
      <div id="bottom-join" style={{ marginBottom: "2em" }}>
        Already on LinkedUp? <NavLink to="/login">Sign in</NavLink>
      </div>
    </>
  );
}

export default SignupFormPage;
