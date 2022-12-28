import { Routes, Route, useNavigate, useSearchParams, Navigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import configureStore from "../store";
import axios from 'axios'
const { persistor, store } = configureStore();

const Login = () => {
    const [mixname, setMixname] = useState('');
    const [password, setPassword] = useState('');
  
    const [errorMessage, setErrorMessage] = useState('');
  
    const navigate = useNavigate();
  
    console.log(store.getState().login, 'holy')
    // console.log(store)
    useEffect(() => {
      if (store.getState().login) navigate('/')
    });
  
    //display errors
    const displayErrors = (message) => {
      setErrorMessage(message);
      setTimeout(() => { setErrorMessage('') }, 2000)
    }
    const loginRequest = (e) => {
      e.preventDefault();
  
      if (mixname == '') {
        displayErrors('Falta usuario o email');
        return;
      }
      if (password == '') {
        displayErrors('Falta usuario');
        return;
      }
  
      let params = new URLSearchParams();
      params.append('email', mixname);
      params.append('username', mixname);
      params.append('password', password);
      axios.post('//localhost:4000/users/login', params).then((response) => {
        console.log(response.data, 'aaa');
        if (response.data.status == 200) {
          displayErrors(response.data.message);
          console.log(response.data.token)
          params = new URLSearchParams();
          params.append('token', response.data.token);
          //verifica token
          axios.post('//localhost:4000/users/verify_token', params).then((response) => {
            if (response.data.status == 200) {
              console.log(response.data)
              const data = response.data.data
              displayErrors('Redirigiendo...');
              store.dispatch({ type: "loginIn", payload: { value: true, data: data } })
              navigate('/')
            }
          })
          // setTimeout(() => { navigate('/') }, 4000);
        } else {
          displayErrors(response.data.message);
          return;
        }
      })
    }
    return (
      <>
        <div className="center">
          <h1>Login</h1>
          <form action="post">
            <div className="text_field">
              <input type="text" value={mixname} onChange={(e) => { setMixname(e.target.value) }} />
              <span></span>
              <label>Username o email</label>
            </div>
            <div className="text_field">
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
              <span></span>
              <label>Contrasena</label>
            </div>
            <div className="pass-forget"><a href="">Olvidaste&nbsp;la Contrasena?</a></div>
            <input type="submit" value="Iniciar Sesion" onClick={loginRequest} />
            <p className="error" style={{ color: 'white', marginTop: '10px', marginBottom: '0px' }}> {errorMessage} </p>
  
            <div className="register_link">
              ¿No tiene una cuenta? <a href="register">Registrate</a>
            </div>
          </form>
        </div>
      </>
    )
  }

export default Login;