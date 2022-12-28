import { Routes, Route, useNavigate, useSearchParams, Navigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import configureStore from "../store";
import axios from 'axios'
const { persistor, store } = configureStore();


const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const navigate = useNavigate();
  
    useEffect(() => {
      if (store.getState().login) navigate('/')
    });
  
    //display errors
    const displayErrors = (message) => {
      setErrorMessage(message);
      setTimeout(() => { setErrorMessage('') }, 2000)
    }
  
    const registerRequest = (e) => {
      e.preventDefault(); //previene recarga del submit
      // console.log('aaasdaxc123', email == '', errorMessage)
  
      if (email == '') {
        displayErrors('Falta Email');
        return;
      }
      if (username == '') {
        displayErrors('Falta username');
        return;
      }
      if (password == '') {
        displayErrors('Falta password');
        return;
      }
      const params = new URLSearchParams();
      params.append('email', email);
      params.append('username', username);
      params.append('password', password);
      axios.post('//localhost:4000/users/register', params).then((response) => {
        console.log(response.data, 'aaa');
        if (response.data.status == '200') {
          displayErrors(response.data.message);
          setTimeout(() => {
            navigate('/login')
          }, 4000);
        } else {
          displayErrors(response.data.message);
          return;
        }
      })
    }
  
    return (
      <>
        <div className="center">
          <h1>Registrate</h1>
          <form>
            <div className="text_field">
              <input type="text" required value={email} onChange={e => setEmail(e.target.value)} />
              <label>Correo Electronico</label>
            </div>
            <div className="text_field">
              <input type="text" required value={username} onChange={e => setUsername(e.target.value)} />
              <label>Username</label>
            </div>
            <div className="text_field">
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
              <label>Contrasena</label>
            </div>
            <input type="submit" value="Registrarse" onClick={registerRequest} />
            <p className="error" style={{ color: 'white', marginTop: '10px', marginBottom: '0px' }}> {errorMessage} </p>
          </form>
          <h1></h1>
        </div>
      </>
    )
  }

export default Register;