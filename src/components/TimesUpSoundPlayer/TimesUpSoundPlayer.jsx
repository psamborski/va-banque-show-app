import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import timesUpSound from '../../assets/audio/times-up.mp3'

const TimesUpSoundPlayer = () => {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 't') {
        setPlaying((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <ReactPlayer
      className="audio bonus-audio"
      url={timesUpSound}
      playing={playing}
      controls={false}
      onEnded={() => setPlaying(false)}
    />
  )
}

export default TimesUpSoundPlayer
