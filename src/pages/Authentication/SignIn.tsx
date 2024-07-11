import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assurez-vous que ce chemin est correct
import './Login.css'; // Assurez-vous que le fichier CSS est dans le bon chemin

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authError, setAuthError] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError('');
    setPasswordError('');
    setAuthError('');

    if (email === '') {
      setEmailError('Please enter your email');
      return;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Password must be 8 characters or longer');
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      await authLogin(email, password);
      navigate('/');
    } catch (error) {
      setAuthError('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="login-box">
      <h2>Sign In</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="user-box">
          <input
            type="email"
            value={email}
            placeholder="Enter email address here"
            onChange={(ev) => setEmail(ev.target.value)}
            className="user-box"
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            value={password}
            placeholder="Enter password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className="user-box"
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        {authError && <p className="errorLabel">{authError}</p>}
        <input
          onClick={onButtonClick}
          className="inputButton"
          type="button"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default SignIn;
