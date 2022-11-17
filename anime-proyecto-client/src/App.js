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
import logo from './public/logo.webp'

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
  const [resultAnime, setResultAnime] = useState([]);

  const searchAnime = event => {
    let limitCharacters = 3; //Min valor mayor o igual a 3

    setAnimeName(event.target.value);

    if (event.target.value.length == 0) {
      document.getElementById('search-info').style.display = 'none';
    }

    if (event.target.value.length >= limitCharacters) {
      document.getElementById('search-info').style.display = 'block';
      const animeRequest = { name: event.target.value };

      console.log('Anime name: ' + event.target.value + event.target.value.length);
      axios.post(`${URL_SERVICE}animes/search`, animeRequest).then(res => {
        if (res.data.result.count == 0) {
          setResultAnime(['No hay resultados']);
          return;
        }
        setResultAnime(res.data.result.rows);
        console.log(res.data.result.rows);
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
          <li><a id="login" href="#">Iniciar Sesion</a></li>
          <li><a id="login" href="#">Registrarse</a></li>
          <li><a href="#">Home</a></li>
          <li><a href="#">Directorio Anime</a></li>
          <li><a href="#">TV Series</a></li>
          <li><a href="#">Peliculas</a></li>
          <li><a href="#">ONAS</a></li>
        </ul>
      </div>
      <div class="navbar">
        <div class="section">
          <div class="menu">
            <label for="check" class="checkbtn-1">
              <i class="fas fa-bars"></i>
            </label>
          </div>
          <div class="logo"><img src={logo} alt="" id="logo" /></div>
          <div class="search">
            <input type="text" id="animeName" name="animeName" value={animeName} onChange={searchAnime} placeholder="Buscar Anime..." />
            <span class="fas fa-search" id="searchIcon"></span>
          </div>
          <div class="social">
            <div class="item">
              <a href=""><i class="fa-brands fa-discord" id="discord"></i></a>
            </div>
            <div class="item">
              <a href=""><i class="fa-brands fa-twitter" id="twitter"></i></a>
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
      <div id="search-info" class="search-info">
        {resultAnime.map(item => {
          { console.log(`${resultAnime.length}`) }
          {
            if (resultAnime.length == 1 && item == 'No hay resultados') {
              console.log(item);
              return (
                <div class="search-anime">
                  <div class="search-anime-title">No hay resultados</div>
                  <img src={video} alt="" id="search-anime-image" />
                </div>
              );
            }
          }
          {
            if (resultAnime.length > 1) {
              return (
                <div key={item.id} class="search-anime">
                  <div class="search-anime-title">{item.name}</div>
                  <div class="search-anime-type">{item.typeAnime.name}</div>
                  <img src={video} alt="" id="search-anime-image" />
                </div>
              );
            }
            {
              if (resultAnime.length > 5) {
                return (
                  <div class="more-information"><a href="#">Más Resultados</a></div>
                )
              }
            }
          }
        })}
      </div>
    </>
  )
}

function Home() {
  const playerRef = React.useRef(null);

  return (
    <>
      {/* <!-- Anime Slider  --> */}
      <div class="anime-trending-container">
        <div class="anime-trending-text">Recomendado para ti</div>
        <div class="anime-trending-slider">
            <img src={video} alt=""/>
            <div class="container-trending-info">
                <div class="anime-trending-name">Sankarea</div>
                <a href="#">
                    <div class="anime-trending-watchnow">Ver Ahora</div>
                    <div class="anime-trending-watchnow2"><i class="fa-solid fa-play"></i></div>
                </a>
            </div>
        </div>
    </div>
      {/* <!-- End Anime Slider  --> */}

      {/* <!-- Latest Episodes --> */}

      <div class="anime-container-flex">
        <div class="anime-container-episodes">
            <div class="anime-container-text">Ultimos episodios</div>
            <div class="episode-info">
                <a href="#">
                    <div class="title-episode">Episodio 1</div>
                    <img src={video} alt="" id="episode-latest-image"/>
                    <div class="title-anime">Sankarea</div>
                </a>
            </div>
        </div>
        <div class="anime-container-news">
            <div class="anime-news-container">
                <div class="anime-news-text">Ultimas Noticias</div>
                <a href="#">
                    <div class="news-text">Nueva version de AnimexD, es posible que errores ocurran asi porfavor
                        reportar cualquier problema.</div>
                </a>
            </div>
        </div>
    </div>
      {/* <!-- End Latest Episodes  --> */}
      <div class="container-anime">
        <div class="anime-header">
            Ultimos Animes
        </div>
        <div class="latest-animes">
            <a href="#">
                <div class="info-anime">
                    <img src={pas} alt="" id="anime-latest-image"/>
                    <div class="anime-title">Sankarea</div>
                </div>
            </a>
        </div>
    </div>

      {/* <!-- Footer Start --> */}

      <div class="container-footer">
        <div class="logo"><img src={logo} alt="" id="logo"/></div>
        <div class="copyright">
            Copyright © 2022 AnimexD. Todos los derechos reservados
        </div>
        <div class="disclaimer">
            Descargo de responsabilidad: este sitio AnimexD no almacena ningún archivo en su servidor. Todos los
            contenidos son proporcionados por terceros no afiliados.
        </div>
        <br/>
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
