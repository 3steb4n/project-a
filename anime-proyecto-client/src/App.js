// import logo from './logo.svg';
// import VideoJs from './components/videoJS';
import { Routes, Route, Link } from "react-router-dom";
// import videojs from 'video.js'
import React, { useState, useEffect } from 'react';
// import { useSelector } from "react-redux";
import configureStore from "./store";
import axios from 'axios'

//imagenes
import pas from './public/pas.jpg';
import video from './public/video.png'

//login register

import './auth.css'

import { useNavigate } from 'react-router-dom';

const { persistor, store } = configureStore();

const URL_SERVICE = '//localhost:4000/';

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

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

const NavBar = () => {
  const navigate = useNavigate();
  const [animeName, setAnimeName] = useState('');

  const searchAnime = event => {
    let limitCharacters = 3; //Min valor mayor o igual a 3
    
    setAnimeName(event.target.value);

    if (event.target.value.length >= limitCharacters) {
      const animeRequest = { name: event.target.value };

      console.log('Anime name: ' + event.target.value + event.target.value.length);
      axios.post(`${URL_SERVICE}animes/search`, animeRequest).then(res => {
        if (res.status != 200) {
          return;
        }
        console.log(res.data);
      }).catch(err => console.log(`Error ${err}`));
    }
  };

  const logOut = (e) => {
    e.preventDefault()
    alert('Jerman la mama xDDDD')
    store.dispatch({ type: 'logOut', payload: {} })
    navigate('/')
  }

  let logginButton;
  if (store.getState().login) {
    logginButton = [
      <li className="btn"><a onClick={(e) => { e.preventDefault() }}>{store.getState().user.username}</a></li>,
      <li className="btn"><a href="register" onClick={logOut}>Logout</a></li>
    ]
  } else {
    logginButton = [<li key={1} className="btn"><a href="login">Iniciar Sesion</a></li>, <li key={2} className="btn"><a href="register">Registrarse</a></li>]
  }
  return (
    <>
    
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
      <input type="checkbox" id="check" />
      <div class="sidebar">
        <div class="close-menu">
          <label for="check" class="closebtn">Cerrar Menu</label>
        </div>
        <ul>
          <div class="login-side">
            <li><a href="#">{logginButton}</a></li>
          </div>
          <li><a href="/">Home</a></li>
          <li><a href="#">Directorio Anime</a></li>
          <li><a href="#">TV Series</a></li>
          <li><a href="#">Peliculas</a></li>
          <li><a href="#">ONAS</a></li>
        </ul>
      </div>
      <div class="navbar">
        <div class="section">
          <div class="menu">
            <label for="check" class="open-side">
              <i class="fas fa-bars"></i>
            </label>
          </div>
          <div class="logo">AnimexD</div>
          <div class="search">
            <input type="text" id="animeName" name="animeName" value={animeName} onChange={searchAnime} placeholder="Buscar Anime..." />
            <span class="fas fa-search" id="searchIcon"></span>
          </div>
          <div class="social">
            <div class="item">
              <a href="#"><i class="fa-brands fa-discord" id="discord"></i></a>
            </div>
            <div class="item">
              <a href="#"><i class="fa-brands fa-twitter" id="discord"></i></a>
            </div>
            <div class="item">
              <a href="#"><i class="fa-brands fa-telegram" id="discord"></i></a>
            </div>

          </div>
        </div>
        <div class="section-2">
          <div class="auth">
            <ul>
              {logginButton}
            </ul>
          </div>
        </div>
      </div>

      <div class="search-info">
        <div class="search-anime">
            <div class="search-anime-title">BLEACH: Sennen Kessen-hen</div>
            <div class="search-anime-type">Anime</div>
            <img src={video} alt="" id="search-anime-image"/>
        </div>
        <div class="search-anime">
            <div class="search-anime-title">Sankarea</div>
            <div class="search-anime-type">Anime</div>
            <img src={video} alt="" id="search-anime-image"/>
        </div>
        <div class="search-anime">
            <div class="search-anime-title">Sankarea</div>
            <div class="search-anime-type">Anime</div>
            <img src={video} alt="" id="search-anime-image"/>
        </div>
        <div class="more-information"><a href="#">Más Resultados</a></div>
    </div>
    </>
  )
}

function Home() {
  const playerRef = React.useRef(null);

  return (
    <>
      {/* <!-- Anime Slider  --> */}

      <div class="container-primary">
        <div class="trending-anime">
          <a href="#"><div class="ranking-number">#1 Lo mas visto</div>
            <div class="title-name">Sankarea</div>
            <div class="anime-type">TV</div>
            <div class="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste magnam ducimus impedit saepe optio esse veniam voluptates soluta possimus facilis ipsam, aut, rerum exercitationem, quisquam reiciendis tempore voluptas ut eum?</div>
            <img src={video} alt="" /></a>
        </div>
        <a class="prev" onClick="plusSlides(-1)">❮</a>
        <a class="next" onClick="plusSlides(1)">❯</a>
      </div>

      {/* <!-- End Anime Slider  --> */}

      {/* <!-- Latest Episodes --> */}

      <div class="container-episodes">
        <div class="episode-header">
          Ultimos Episodios
        </div>
        <div class="latest-episodes">
          <div class="episode-info">
            <div class="title-episode">Episodio 1</div>
            <a href="#"><img src={video} alt="" id="episode-latest-image" /></a>
            <div class="title-anime">Sankarea</div>
          </div>
          <div class="episode-info">
            <div class="title-episode">Episodio 1</div>
            <a href="#"><img src={video} alt="" id="episode-latest-image" /></a>
            <div class="title-anime">Sankarea</div>
          </div>
          <div class="episode-info">
            <div class="title-episode">Episodio 1</div>
            <a href="#"><img src={video} alt="" id="episode-latest-image" /></a>
            <div class="title-anime">Sankarea</div>
          </div>
          <div class="episode-info">
            <div class="title-episode">Episodio 1</div>
            <a href="#"><img src={video} alt="" id="episode-latest-image" /></a>
            <div class="title-anime">Sankarea</div>
          </div>
          <div class="episode-info">
            <div class="title-episode">Episodio 1</div>
            <a href="#"><img src={video} alt="" id="episode-latest-image" /></a>
            <div class="title-anime">Sankarea</div>
          </div>
          <div class="episode-info">
            <div class="title-episode">Episodio 1</div>
            <a href="#"><img src={video} alt="" id="episode-latest-image" /></a>
            <div class="title-anime">Sankarea</div>
          </div>
        </div>

      </div>

      {/* <!-- End Latest Episodes  --> */}

      <div class="container-anime">
        <div class="anime-header">
          Ultimos Animes
        </div>
        <div class="latest-animes">
          <div class="info-anime">
            <div class="anime-title">Sankarea</div>
            <a href="#"><img src={pas} alt="" id="anime-latest-image" /></a>
          </div>
        </div>
      </div>

      {/* <!-- Footer Start --> */}

      <div class="container-footer">
        <div class="logo">AnimexD</div>
        <div class="copyright">
          Copyright © 2022 AnimexD. Todos los derechos reservados
        </div>
        <div class="disclaimer">
          Descargo de responsabilidad: este sitio AnimexD no almacena ningún archivo en su servidor. Todos los contenidos son proporcionados por terceros no afiliados.
        </div>
        <br />
      </div>

      {/* <!-- Footer End --> */}
    </>
  );


  // const videoJsOptions = {
  //   autoplay: false,
  //   controls: true,
  //   responsive: true,
  //   poster: "https://animeui.infura-ipfs.io/ipfs/bafybeigzq2fr4xepmamkra6y3aktftdmvgypdgdpsaugt6mgexqxnrntny/video-capture-2284.png",
  //   fill: true,
  //   sources: [{
  //     src: 'https://animeui.infura-ipfs.io/ipfs/bafybeifevc67pwnogqkf35pbvrr5ly5yygcwcnkulsx32lhw7nsxuwp4hu/The%20Prince%20of%20Tennis%20II%20U-17%20World%20Cup%20-%20S01E13%20%5B1080p%5D.mp4',
  //     type: 'video/mp4'
  //   }]
  // };

  // const handlePlayerReady = (player) => {
  //   playerRef.current = player;

  //   // You can handle player events here, for example:
  //   player.on('waiting', () => {
  //     videojs.log('player is waiting');
  //   });

  //   player.on('dispose', () => {
  //     videojs.log('player will dispose');
  //   });
  // };

  // const videojsStyle = {
  //   position: 'relative !important',
  //   width: '20px !important',
  //   height: 'auto !important'
  // }

}


export default App;
