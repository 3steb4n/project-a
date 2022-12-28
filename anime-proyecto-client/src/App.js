import { Routes, Route, useNavigate, useSearchParams, Navigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
// import { useSelector } from "react-redux";
import configureStore from "./store";
import axios from 'axios'

//imagenes
import logo from './public/logo.webp'

// Routes
import Index from "./routes/index"
import Register from './routes/register'
import Login from './routes/login'
import AnimeDirectory from './routes/directory'


const { persistor, store } = configureStore();

const URL_SERVICE = '//localhost:4000/';

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/search" element={<AnimeDirectory />} />
        </Routes>
      </div>
    </>
  );
}

function show() {
  document.getElementById('dropdown').classList.toggle("show")
}

window.onclick = function (event) {
  if (!event.target.matches('#options')) {
      var dropdowns = document.getElementsByClassName("options-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}

// Search Bar
const NavBar = () => {
  const navigate = useNavigate();
  const [animeName, setAnimeName] = useState('');
  const [resultAnime, setResultAnime] = useState([]);

  const searchAnime = event => {
    let limitCharacters = 3; // Min valor mayor o igual a 3

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
          <li><a href="http://localhost:3000/">Home</a></li>
          <li><a href="/search?page=1">Directorio Anime</a></li>
          <li><a href="#">TV Series</a></li>
          <li><a href="#">Peliculas</a></li>
          <li><a href="#">ONAS</a></li>
        </ul>
      </div>
      <div class="navbar">
        <div class="section">
          <div class="menu">
            <label for="check" class="checkbtn">
              <i class="fas fa-bars"></i>
            </label>
          </div>
          <div class="logo"><img src={logo} alt="" id="logo" /></div>

          <div class="search">
            <input type="text" id="animeName" name="animeName" value={animeName} onChange={searchAnime} placeholder="Buscar Anime..." />
            <a href={"/search?page=1&name=" + animeName}>
              <span class="fas fa-search" id="searchIcon"></span>
            </a>
          </div>
          <div class="social">
            <div class="item">
              <a href=""><i class="fa-brands fa-discord" id="discord"></i></a>
            </div>
          </div>
        </div>
        <div class="section-2">
          <div class="auth">
            <ul>
              {logginButton}
              <label for="options">
                <div class="fa-solid fa-gear" onClick={show} id="options"></div>
                <div class="options-content" id="dropdown">
                  <a href="#">Cerrar Session</a>
                </div>
              </label>
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
                <div class="search-anime2">
                  <div class="notfound">No hay resultados</div>
                </div>
              );
            }
          }
          {
            if (resultAnime.length > 0) {
              return (
                <div key={item.id} class="search-anime">
                  <div class="search-anime-title">{item.name}</div>
                  <div class="search-anime-type">{item.typeAnime.name}</div>
                  <img src={item.url_preview} alt="" id="search-anime-image" />
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



export default App;
