import logo from './logo.svg';
import './App.css';
import VideoJs from './components/videoJS';
import { Routes, Route, Link } from "react-router-dom";
import videojs from 'video.js'
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import store from "./store";
import axios from 'axios'

//imagenes
import pas from './public/pas.jpg';
import video from './public/video.png'

//login register

import './auth.css'



function App() {

  // store.dispatch({type: "loginIn", payload: {value: true}})
  console.log(store.getState())
  return (
    <>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />


        </Routes>
      </div>
    </>
  );
}

const Register = () => {
  
  
  const [mixname, setMixname] = useState('');
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  //display errors
  const displayErrors = (message, setErrorMessage) => {
    console.log(setErrorMessage)
    setErrorMessage(message);
    setTimeout(() => {setErrorMessage('')}, 2000)
  }
  
  
  const loginRequest = (e) => {
    
    if (mixname == '') {
      displayErrors('Falta usuario', setErrorMessage);
      return;
    }
    e.preventDefault();
  }
  const registerRequest = (e) => {
    e.preventDefault(); //previene recarga del submit
    console.log('aaasdaxc123', email == '', errorMessage)

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
      console.log(response);
    })
  }
  
  return (
    <>
      <div className="center">
          <h1>Registrate</h1>
          <form>
              <div className="text_field">
                  <input type="text" required value={email} onChange={e => setEmail(e.target.value)}/>
                  <label>Correo Electronico</label>
              </div>
              <div className="text_field">
                  <input type="text" required value={username} onChange={e => setUsername(e.target.value)}/>
                  <label>Username</label>
              </div>
              <div className="text_field">
                  <input type="password" required value={password} onChange={e => setPassword(e.target.value)}/>
                  <label>Contrasena</label>
              </div>
              <input type="submit" value="Registrarse" onClick={registerRequest}/>
              <p className="error" style={{color: 'white', marginTop: '10px', marginBottom: '0px'}}> {errorMessage} </p>
          </form>
          <h1></h1>
      </div>
    </>
  )
}

const Login = () => {
  return (
    <>
      <div className="center">
          <h1>Login</h1>
          <form action="post">
              <div className="text_field">
                  <input type="text" required/>
                  <span></span>
                  <label>Username o email</label>
              </div>
              <div className="text_field">
                  <input type="password" required/>
                  <span></span>
                  <label>Contrasena</label>
              </div>
              <div className="pass-forget"><a href="">Olvidaste&nbsp;la Contrasena?</a></div>
              <input type="submit" value="Iniciar Sesion"/>
              <div className="register_link">
                  ¿No tiene una cuenta? <a href="register">Registrate</a>
              </div>
          </form>
      </div>
    </>
  )
}

const NavBar = () => {
  return (
    <>
      <div className="header">
        <nav className="header-content">
            <ul className="nav-links">
                <input type="checkbox" id="check"/>
                <label htmlFor="check" className="checkbtn">
                    <i className="fas fa-bars"></i>
                    Menu
                </label>
                <div className="links">
                <li><a href="/">Home</a></li>
                <li><a href="">Movies</a></li>
                <li><a href="">TV Series</a></li>
                <li><a href="">Most Popular</a></li>
                <li className="btn"><a href="login">Login</a></li>
                <li className="btn"><a href="register">Register</a></li>
            </div>
            </ul>
        </nav>
      </div>
    </>
  )
}

function Home() {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    poster: "https://animeui.infura-ipfs.io/ipfs/bafybeigzq2fr4xepmamkra6y3aktftdmvgypdgdpsaugt6mgexqxnrntny/video-capture-2284.png",
    fill: true,
    sources: [{
      src: 'https://animeui.infura-ipfs.io/ipfs/bafybeifevc67pwnogqkf35pbvrr5ly5yygcwcnkulsx32lhw7nsxuwp4hu/The%20Prince%20of%20Tennis%20II%20U-17%20World%20Cup%20-%20S01E13%20%5B1080p%5D.mp4',
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  const videojsStyle = {
    position: 'relative !important',
    width: '20px !important',
    height: 'auto !important'
  }

  return (
    <>
      <div className="row-anime">
        <div className="header-anime">Animes recientes</div>
        <div className="latest-animes">
            <a href="#"><img src={pas} alt=""/></a>
            <div className="title-anime">
                Sankarea
            </div>
            <div className="title-type">TV</div>
        </div>
        <div className="latest-animes">
            <a href="#"><img src={pas} alt=""/></a>
            <div className="title-anime">
                Sankarea
            </div>
            <div className="title-type">Pelicula</div>
        </div>
    </div>
    <div className="content">
        <div className="header-emision">Últimos episodios
            <h2>Los episodios mas recientes</h2>
        </div>
        <div className="latest-episode">
            <a href="#"><img src={video} alt=""/></a>
            <div className="title-emision" >
                Sankarea
            </div>
            <div className="title-ep">
                Episodio 1
            </div>
        </div>
        <div className="latest-episode">
            <a href="#"><img src={video} alt=""/></a>
            <div className="title-emision" >
                Sankarea
            </div>
            <div className="title-ep">
                Episodio 2
            </div>
        </div>
        <div className="latest-episode">
            <a href="#"><img src={video} alt=""/></a>
            <div className="title-emision" >
                Sankarea
            </div>
            <div className="title-ep">
                Episodio 2
            </div>
        </div>
        <div className="latest-episode">
            <a href="#"><img src={video} alt=""/></a>
            <div className="title-emision" >
                Sankarea
            </div>
            <div className="title-ep">
                Episodio 2
            </div>
        </div>
        <div className="latest-episode">
            <a href="#"><img src={video} alt=""/></a>
            <div className="title-emision" >
                Sankarea
            </div>
            <div className="title-ep">
                Episodio 2
            </div>
        </div>
        <div className="latest-episode">
            <a href="#"><img src={video} alt=""/></a>
            <div className="title-emision" >
                Sankarea
            </div>
            <div className="title-ep">
                Episodio 2
            </div>
        </div>
        <div className="latest-episode">
            <a href="#"><img src={video} alt=""/></a>
            <div className="title-emision" >
                Sankarea
            </div>
            <div className="title-ep">
                Episodio 2
            </div>
        </div>
        <div className="latest-episode">
            <a href="#"><img src={video} alt=""/></a>
            <div className="title-emision" >
                Sankarea
            </div>
            <div className="title-ep">
                Episodio 2
            </div>
        </div>
    </div>
      {/* <div style={{width: "1280px", backgroundColor:"red", height: "720px", margin: "0 auto", backgroundColor: "red"}}>
        <VideoJs options={videoJsOptions} onReady={handlePlayerReady} style={{videojsStyle}}></VideoJs>
      </div>
      <nav>
        <Link to="/about">About</Link>
      </nav> */}
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
export default App;
