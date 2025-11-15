import React, { useState } from 'react';
import { auth, provider } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const HandleGoogleLogin = ()=>{
    signInWithPopup(auth, provider)
    .then(result=>{
      onLogin(result.user)
      navigate('/')
    })
    .catch(err => alert('Google login failed: ' + err.message))
  }

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCred => {
        onLogin(userCred.user)
        navigate('/');
      })
      .catch(err => alert('Login failed: ' + err.message));
  };

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCred => {
      onLogin(userCred.user)
      navigate('/');
    })
      .catch(err => alert('Signup failed: ' + err.message));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={login}>🔐 Logan paul</button>
      <button onClick={signup}>🆕 Sign Up</button>
      <button onClick={HandleGoogleLogin}>🔐 Sign in with Google</button>
    </div>
  );
}

export default Login;