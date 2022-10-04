import React from 'react';

import videojs from 'video.js'
import 'video.js/dist/video-js.css';

const VideoJs = (props) => {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const {options, onReady} = props;

    React.useEffect(()=> {
        if (!playerRef.current) {
            console.log('test')
            const videoElement = videoRef.current;

            if(!videoElement) return;

            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player funk');
                onReady && onReady(player);
            })
        } else {

        }
    }, [options, videoRef])

    React.useEffect(() => {
        const player = playerRef.current;
        return () => {
            if (player) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <video ref={videoRef} className='video-js vjs-big-play-centered' />
        </div>
    );
}

export default VideoJs;