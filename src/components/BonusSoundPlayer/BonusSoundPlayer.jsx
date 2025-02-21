import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import ReactPlayer from "react-player";

import bonusSound from '../../assets/audio/bonus-sound.mp3';

const BonusSoundPlayer = (props) => {
    const [playing, setPlaying] = useState(false);

    // make sure to clean up
    useEffect(() => {
        setPlaying(props?.playing)
    }, [props?.playing]);


    return <ReactPlayer
            className="audio bonus-audio"
            url={bonusSound}
            playing={playing}
            controls={false}
        />
}

BonusSoundPlayer.propTypes = {
    playing: PropTypes.bool
};

export default BonusSoundPlayer
