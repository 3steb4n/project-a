import logo from './logo.svg';
import './App.css';
import VideoJs from './components/videoJS';
import { Routes, Route, Link } from "react-router-dom";
import videojs from 'video.js'
import React from 'react';

function App() {
  return (
    <>
      <div className="App">
        <h1>Jerman la mama xd</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </>
  );
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
      <main>
        <h2>A jerman le gustan gruesas xd</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <div style={{width: "1280px", backgroundColor:"red", height: "720px", margin: "0 auto", backgroundColor: "red"}}>
        <VideoJs options={videoJsOptions} onReady={handlePlayerReady} style={{videojsStyle}}></VideoJs>
      </div>
      <nav>
        <Link to="/about">About</Link>
      </nav>
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
