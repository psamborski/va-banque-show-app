import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import ReactPlayer from "react-player";

import categoryRevealSoundPlayer from '../../assets/audio/category-reveal.mp3';

const CategoryRevealSoundPlayer = (props) => {
    const [playing, setPlaying] = useState(false);

    // make sure to clean up
    useEffect(() => {
        setPlaying(props?.playing)
    }, [props?.playing]);


    return <ReactPlayer
        className="audio bonus-audio"
        url={categoryRevealSoundPlayer}
        playing={playing}
        controls={false}
        onEnded={() => setPlaying(false)}
    />
}

CategoryRevealSoundPlayer.propTypes = {
    playing: PropTypes.bool
};

export default CategoryRevealSoundPlayer
