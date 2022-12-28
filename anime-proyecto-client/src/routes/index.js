import React, { useState, useEffect, useRef } from 'react';
import logo from '../public/logo.webp';

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
                  <div class="anime-info">
                    <div class="anime-type">TV</div>
                    <div class="anime-ep">Ep: 20</div>
                    <div class="anime-year">2022</div>
                  </div>
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
                  <div class="anime-info">
                    <div class="anime-type">TV</div>
                    <div class="anime-ep">Ep: 20</div>
                    <div class="anime-year">2022</div>
                  </div>
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
  }


export default Home;