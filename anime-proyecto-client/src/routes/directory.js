import { Routes, Route, useNavigate, useSearchParams, Navigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import logo from '../public/logo.webp'

const URL_SERVICE = '//localhost:4000/';

function AnimeDirectory() {
    const [resultGenres, setResultGenres] = useState([]);
    const [resultYears, setResultYears] = useState([]);
    const [resultTypeAnime, setTypeAnime] = useState([]);
    const [resulAnimeStatus, setAnimeStatus] = useState([]);
    const [resultAnime, setAnime] = useState([]);
    const [countResultAnime, setCountResultAnime] = useState([]);
  
    let animePerPage = 30;
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
          let sliceArray = {
            "init": (queryParams.page == 1) ? (queryParams.page - 1) : ((queryParams.page - 1) * animePerPage),
            "limit": (queryParams.page * animePerPage)
          }
          setAnime(animeObject.slice(sliceArray.init, sliceArray.limit));
        };
  
        if (queryParams.name === undefined || queryParams.name == "" || queryParams.name.length < 3) {
          axios.get(`${URL_SERVICE}animes/search-all`).then(resp => {
            sliceArrayPagesAnime(resp.data.result.rows);
            setCountResultAnime(returnPages(resp.data.result.rows.length));
            console.log(resultAnime);
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
        }
      } catch (err) {
  
      }
    },[]);
  
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
                          <img src={item.url_preview}
                            alt="" id="anime-latest-image" />
                          <div class="anime-matured" style={{background: (item.status_id == 1) ? '#0d730d' : (item.status_id == 2 ? '#424242' : 'rgb(190, 19, 19)')}}>
                            {(item.status_id == 1) ? 'En emisión' : (item.status_id == 2 ? 'Proximamente' : 'Finalizado')}
                          </div>
                        </div>
                        <div class="film-details">
                          <div class="anime-title">{item.name}</div>
                          <div class="anime-info">
                            <div class="anime-type-i">{item.typeAnime.name}</div>
                            <div class="anime-ep">Ep: {item.number_chapter}</div>
                            <div class="anime-year">{item.year}</div>
                          </div>
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


export default AnimeDirectory;
