import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupForm({ setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          firstName,
          lastName,
          email,
          username,
          password,
        })
      )
        .then(() => setShowModal(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
     return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <form
      className='signupForm'
      onSubmit={handleSubmit}
    >
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div id="signuptext">Please Sign Up</div>
      <label id='firstName'>
        First Name
        <input
          id="input"
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label id='lastName'>
        Last Name
        <input
          id="input"
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label id='email'>
        Email
        <input
          id="input"
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label id='username'>
        Username
        <input
          id="input"
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label id='password'>
        Password
        <input
          id="input"
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label id='confirmPassword'>
        Confirm Password
        <input
          id="input"
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button
        id='submitButton1'
        type='submit'
      >
        Submit
      </button>
    </form>
  );
}

export default SignupForm;
