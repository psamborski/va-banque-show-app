import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import ReactPlayer from "react-player";

import "./MelodyPlayer.css";

import jingleSound from '../../assets/audio/final-melody.mp3';

const MelodyPlayer = (props) => {
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        setPlaying(!!props?.playing)
    }, [props?.playing]);


    return <>
        <ReactPlayer
            className="audio bonus-audio"
            url={jingleSound}
            playing={playing}
            controls={false}
            onEnded={() => setPlaying(false)}
        />
        <button onClick={() => setPlaying(!playing)} className="round-button jingle-audio-button">
            {playing ? '⏸︎' : '♪'}
        </button>
    </>
}

MelodyPlayer.propTypes = {
    playing: PropTypes.any
};

export default MelodyPlayer
