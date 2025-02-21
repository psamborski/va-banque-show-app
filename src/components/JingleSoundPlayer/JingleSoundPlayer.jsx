import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import ReactPlayer from "react-player";

import "./JingleSoundPlayer.css";

import jingleSound from '../../assets/audio/jingle.mp3';

const JingleSoundPlayer = (props) => {
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
        />
        <button onClick={() => setPlaying(!playing)} className="button jingiel-audio-button">
            {playing ? '⏸︎' : '►'}
        </button>
    </>
}

JingleSoundPlayer.propTypes = {
    playing: PropTypes.any
};

export default JingleSoundPlayer
