// import logo from './logo.svg';
// import VideoJs from './components/videoJS';
import { Routes, Route, useNavigate, useSearchParams, Navigate } from "react-router-dom";
// import videojs from 'video.js'
import React, { useState, useEffect, useRef } from 'react';
// import { useSelector } from "react-redux";
import configureStore from "./store";
import axios from 'axios'

//imagenes
import pas from './public/pas.jpg';
import video from './public/video.png'
import logo from './public/logo.webp'

//login register


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
          <Route path="/search" element={<AnimeDirectory />} />
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
            <span class="fas fa-search" id="searchIcon"></span>
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
              <i class="fa-solid fa-gear"></i>
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

function AnimeDirectory() {
  const [resultGenres, setResultGenres] = useState([]);
  const [resultYears, setResultYears] = useState([]);
  const [resultTypeAnime, setTypeAnime] = useState([]);
  const [resulAnimeStatus, setAnimeStatus] = useState([]);
  const [resultAnime, setAnime] = useState([]);
  const [countResultAnime, setCountResultAnime] = useState([]);

  let animePerPage = 20;
  const navigateAnime = useNavigate();

  //Get id DOM Lists
  const genreRef = useRef(null);
  const yearRef = useRef(null);
  const typeRef = useRef(null);
  const statusRef = useRef(null);

  const [getParams, setParams] = useSearchParams();

  const redirectPage = useNavigate();

  //console.log(params.page);

  useEffect(() => {
    axios.get(`${URL_SERVICE}genres/search`).then(resp => {
      setResultGenres(resp.data.message);
    }).catch(error => console.log(`${error}`));

    axios.get(`${URL_SERVICE}animes/search-years`).then(resp => {
      setResultYears(resp.data.years)
    }).catch(error => console.log(`${error}`));

    axios.get(`${URL_SERVICE}typeanime/search`).then(resp => {
      setTypeAnime(resp.data.message)
    }).catch(error => console.log(`${error}`));

    axios.get(`${URL_SERVICE}anime-status/search`).then(resp => {
      setAnimeStatus(resp.data.message);
    }).catch(error => console.log(`${error}`));

    try {
      const queryParams = Object.fromEntries([...getParams]);
      const returnPages = count => {
        let countArr = [];
        for (let i = 1; i <= Math.ceil(count / animePerPage); i++) {
          countArr.push(i);
        }
        return countArr;
      }
      console.log(queryParams.page);
      console.log(queryParams.genres);

      //Return results by pages
      const sliceArrayPagesAnime = animeObject => {
        setAnime(animeObject.slice((queryParams.page == 1) ? (queryParams.page - 1) : (queryParams.page - 1) * animePerPage), (queryParams.page * animePerPage));
      };

      if (queryParams.name === undefined) {
        axios.get(`${URL_SERVICE}animes/search-all`).then(resp => {
          sliceArrayPagesAnime(resp.data.result.rows);
          setCountResultAnime(returnPages(resp.data.result.rows.length));
        }).catch(error => console.log(`${error}`));
        return;
      }

      if (queryParams.name !== undefined && queryParams.genres === undefined && queryParams.year === undefined && queryParams.type === undefined && queryParams.status === undefined) {
        axios.post(`${URL_SERVICE}animes/search`, { name: queryParams.name }).then(resp => {
          sliceArrayPagesAnime(resp.data.result.rows);
          setCountResultAnime(returnPages(resp.data.result.rows.length));
        }).catch(error => console.log(`${error}`));
        return;
      }

      if (queryParams.name !== undefined && queryParams.genres.split('-').length > 0 || queryParams.year.split('-').length > 0 || queryParams.type.split('-').length > 0 || queryParams.status.split('-').length > 0) {
        redirectPage('/search?page=1');
        window.location.reload(false);
      } else if (queryParams.genres.split('-').length > 0 || queryParams.year.split('-').length > 0 || queryParams.type.split('-').length > 0 || queryParams.status.split('-').length > 0) {
        const filters = {
          genres: () => {

          }
        }
        axios.post(`${URL_SERVICE}animes/search`, {
          genreId: (queryParams.genres.split('-').length > 0) ? queryParams.genres.split('-') : [],
          year: (queryParams.year.split('-').length > 0) ? queryParams.year.split('-') : [],
          type: (queryParams.type.split('-').length > 0) ? queryParams.type.split('-') : [],
          status: (queryParams.status.split('-').length > 0) ? queryParams.status.split('-') : [],
        }).then(resp => {
          sliceArrayPagesAnime(resp.data.result.rows);
          setCountResultAnime(returnPages(resp.data.result.rows.length));
        }).catch(error => console.log(`${error}`));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div class="directory-anime-container">
        <div class="filter-container">
          <button class="select-filter" onClick={() => {
            genreRef.current.classList.toggle("show");
          }}>
            Genero:
            Todos
          </button>
          <button class="select-filter" onClick={() => {
            yearRef.current.classList.toggle("show");
          }}>
            Ano:
            Todos
          </button>
          <button class="select-filter" onClick={() => {
            typeRef.current.classList.toggle("show");
          }}>
            Tipos:
            Todos
          </button>
          <button class="select-filter" onClick={() => {
            statusRef.current.classList.toggle("show");
          }}>
            Estado:
            Todos
          </button>
          <button class="select-filter2">
            Filtrar
          </button>
          {/* <!-- Genres container --> */}
          <div ref={genreRef} class="container-filters zoomIn" id="dropdown">
            {
              resultGenres.map(item => {
                return (
                  <>
                    <div class="selected-box">
                      <input type="checkbox" key={item.id} id={`${item.id}-genre`} />
                      <label for={`${item.id}-genre`} class="filter-selected-checkbox">{item.name}</label>
                    </div>
                  </>
                )
              })
            }
          </div>
          {/* <!-- End of Genres Container --> */}
          {/* <!-- Year Container  --> */}
          <div ref={yearRef} class="container-filters zoomIn" id="dropdown-year">
            {
              resultYears.map(item => {
                return (
                  <>
                    <div class="selected-box">
                      <input type="checkbox" id={item} key={item} />
                      <label for={item} class="filter-selected-checkbox">{item}</label>
                    </div>
                  </>
                )
              })
            }
          </div>
          {/* <!-- End of Year Container --> */}
          {/* <!-- Type Container  --> */}
          <div ref={typeRef} class="container-filters zoomIn" id="dropdown-type">
            {
              resultTypeAnime.map(item => {
                return (
                  <>
                    <div class="selected-box">
                      <input type="checkbox" id={item.name} key={item.id} />
                      <label for={item.name} class="filter-selected-checkbox">{item.name}</label>
                    </div>
                  </>
                )
              })
            }
          </div>
          {/* <!-- End of Type Container --> */}
          {/* <!-- Status Container  --> */}
          <div ref={statusRef} class="container-filters zoomIn" id="dropdown-status">
            {
              resulAnimeStatus.map(item => {
                return (
                  <>
                    <div class="selected-box">
                      <input type="checkbox" id={item.id} key={item.id} />
                      <label for={item.id} class="filter-selected-checkbox">{item.name}</label>
                    </div>
                  </>
                )
              })
            }
          </div>
          {/* <!-- End of Status Container --> */}
        </div>
      </div>
      <div class="container-anime">
        <div class="anime-container-text">
          Lista de Animes
        </div>
        <div class="latest-animes">
          {
            resultAnime.map(item => {
              return (
                <>
                  <a href="#">
                    <div class="info-anime">
                      <div class="film-poster">
                        <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11499-SeYog5nP4Uks.png"
                          alt="" id="anime-latest-image" />
                        <div class="anime-matured">+18</div>
                      </div>
                      <div class="film-details">
                        <div class="anime-title">{item.name}</div>
                        <div class="anime-type-i">{item.typeAnime.name}</div>
                      </div>
                    </div>
                  </a>
                </>
              )
            })
          }
        </div>
      </div>
      <div class="pagination">
        <a><i class="fa-solid fa-arrow-left"></i></a>
        {
          countResultAnime.map(item => {
            return (
              <>
                <a onClick={() => {
                  setParams({ page: item });
                  window.location.reload(false);
                }}>{item}</a>
              </>
            )
          })
        }
        <a><i class="fa-solid fa-arrow-right"></i></a>
      </div>

           {/* <!-- Footer Start --> */}
           <div class="container-footer">
        <div class="footer-about">
          <div class="footer-top">
            <div class="logo-footer"><img src={logo} alt="logo" id="logo" /></div>
            <div class="footer-group">
              <div class="footer-line">Unete</div>
              <div class="item-footer">
                <a href="#"><i class="fa-brands fa-discord" id="discord"></i></a>
              </div>
            </div>
            <div class="clear-fix"></div>
          </div>
          <div class="footer-az">
            <div class="footer-az-info">
              <span class="az">A-Z Lista</span>
              <span class="az-info">Orden de búsqueda por nombre alfabético de la A a la Z.</span>
            </div>
            <div class="az-bottons">
              <ul><a class="button" href="#">Todos</a></ul>
              <ul><a class="button" href="#">#</a></ul>
              <ul><a class="button" href="#">0-9</a></ul>
              <ul><a class="button" href="#">A</a></ul>
              <ul><a class="button" href="#">B</a></ul>
              <ul><a class="button" href="#">C</a></ul>
              <ul><a class="button" href="#">D</a></ul>
              <ul><a class="button" href="#">E</a></ul>
              <ul><a class="button" href="#">F</a></ul>
              <ul><a class="button" href="#">G</a></ul>
              <ul><a class="button" href="#">H</a></ul>
              <ul><a class="button" href="#">I</a></ul>
              <ul><a class="button" href="#">J</a></ul>
              <ul><a class="button" href="#">K</a></ul>
              <ul><a class="button" href="#">L</a></ul>
              <ul><a class="button" href="#">M</a></ul>
              <ul><a class="button" href="#">N</a></ul>
              <ul><a class="button" href="#">O</a></ul>
              <ul><a class="button" href="#">P</a></ul>
              <ul><a class="button" href="#">Q</a></ul>
              <ul><a class="button" href="#">R</a></ul>
              <ul><a class="button" href="#">S</a></ul>
              <ul><a class="button" href="#">T</a></ul>
              <ul><a class="button" href="#">U</a></ul>
              <ul><a class="button" href="#">V</a></ul>
              <ul><a class="button" href="#">X</a></ul>
              <ul><a class="button" href="#">Y</a></ul>
              <ul><a class="button" href="#">Z</a></ul>
              <ul><a class="button" href="#">Q</a></ul>
            </div>
            <div class="clear-fix"></div>
          </div>
          <div class="footer-links">
            <div class="url-links">
              <ul>
                <li><a href="#">Terminos de Servicios</a></li>
                <li><a href="#">Politicas de Privacidad</a></li>
              </ul>
            </div>
            <div class="clear-fix"></div>
          </div>
          <div class="about-text">AnimeUI no almacena ningún archivo en nuestro servidor, solo nos vinculamos a los
            medios
            alojados en servicios de terceros.
          </div>
          <p class="copyright">© AnimeUI.com</p>
        </div>
      </div>
      {/* <!-- Footer End --> */}
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
          <img src="https://bafkreigfffty3r6ym63d2rn6zandfpr6af4hnc2pggujttbzs24n4hpsvi.ipfs.nftstorage.link/" alt="" />
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
              <div class="title-episode">Episodio 20</div>
              <img src="https://animeui.com/wp-content/uploads/2022/11/video-capture-9430.jpg" alt=""
                id="episode-latest-image" />
              <div class="anime-type">TV</div>
              <div class="title-anime">Spy x Family</div>
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

      {/* <!-- Trending Animes --> */}
      <div class="container-anime">
        <div class="anime-container-text">
          Tendencias actuales
        </div>
        <div class="latest-animes">
          <a href="#">
            <div class="info-anime">
              <div class="film-poster">
                <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-FlochcFsyoF4.png"
                  alt="" id="anime-latest-image" />
                <div class="anime-matured">+18</div>
              </div>
              <div class="film-details">
                <div class="anime-title">Chainsaw Man</div>
                <div class="anime-type-i">TV</div>
              </div>
            </div>
          </a>
        </div>
      </div>
      {/* <!-- End Trending Animes --> */}

      {/* <!-- Latest Anime --> */}
      <div class="container-anime">
        <div class="anime-container-text">
          Ultimos Animes
        </div>
        <div class="latest-animes">
          <a href="#">
            <div class="info-anime">
              <div class="film-poster">
                <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-FlochcFsyoF4.png"
                  alt="" id="anime-latest-image" />
                <div class="anime-matured">+18</div>
              </div>
              <div class="film-details">
                <div class="anime-title">Chainsaw Man</div>
                <div class="anime-type-i">TV</div>
              </div>
            </div>
          </a>
        </div>
      </div>
      {/* <!-- End Latest Anime --> */}

      {/* <!-- Footer Start --> */}
      <div class="container-footer">
        <div class="footer-about">
          <div class="footer-top">
            <div class="logo-footer"><img src={logo} alt="logo" id="logo" /></div>
            <div class="footer-group">
              <div class="footer-line">Unete</div>
              <div class="item-footer">
                <a href="#"><i class="fa-brands fa-discord" id="discord"></i></a>
              </div>
            </div>
            <div class="clear-fix"></div>
          </div>
          <div class="footer-az">
            <div class="footer-az-info">
              <span class="az">A-Z Lista</span>
              <span class="az-info">Orden de búsqueda por nombre alfabético de la A a la Z.</span>
            </div>
            <div class="az-bottons">
              <ul><a class="button" href="#">Todos</a></ul>
              <ul><a class="button" href="#">#</a></ul>
              <ul><a class="button" href="#">0-9</a></ul>
              <ul><a class="button" href="#">A</a></ul>
              <ul><a class="button" href="#">B</a></ul>
              <ul><a class="button" href="#">C</a></ul>
              <ul><a class="button" href="#">D</a></ul>
              <ul><a class="button" href="#">E</a></ul>
              <ul><a class="button" href="#">F</a></ul>
              <ul><a class="button" href="#">G</a></ul>
              <ul><a class="button" href="#">H</a></ul>
              <ul><a class="button" href="#">I</a></ul>
              <ul><a class="button" href="#">J</a></ul>
              <ul><a class="button" href="#">K</a></ul>
              <ul><a class="button" href="#">L</a></ul>
              <ul><a class="button" href="#">M</a></ul>
              <ul><a class="button" href="#">N</a></ul>
              <ul><a class="button" href="#">O</a></ul>
              <ul><a class="button" href="#">P</a></ul>
              <ul><a class="button" href="#">Q</a></ul>
              <ul><a class="button" href="#">R</a></ul>
              <ul><a class="button" href="#">S</a></ul>
              <ul><a class="button" href="#">T</a></ul>
              <ul><a class="button" href="#">U</a></ul>
              <ul><a class="button" href="#">V</a></ul>
              <ul><a class="button" href="#">X</a></ul>
              <ul><a class="button" href="#">Y</a></ul>
              <ul><a class="button" href="#">Z</a></ul>
              <ul><a class="button" href="#">Q</a></ul>
            </div>
            <div class="clear-fix"></div>
          </div>
          <div class="footer-links">
            <div class="url-links">
              <ul>
                <li><a href="#">Terminos de Servicios</a></li>
                <li><a href="#">Politicas de Privacidad</a></li>
              </ul>
            </div>
            <div class="clear-fix"></div>
          </div>
          <div class="about-text">AnimeUI no almacena ningún archivo en nuestro servidor, solo nos vinculamos a los
            medios
            alojados en servicios de terceros.
          </div>
          <p class="copyright">© AnimeUI.com</p>
        </div>
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
