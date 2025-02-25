import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import ScoreboardView from '../../views/ScoreboardView/ScoreboardView.jsx'
import ScoreboardMini from '../ScoreboardMini/ScoreboardMini.jsx'

import './AppContainer.css'
import TimesUpSoundPlayer from '../TimesUpSoundPlayer/TimesUpSoundPlayer.jsx'

const AppContainer = ({ children }) => {
  const [showScoreboard, setShowScoreboard] = useState(false)
  const [showScoreboardMini, setShowScoreboardMini] = useState(false)

  const { pathname } = useLocation()

  const breadcrumbs = ['/', '/players', '/game/round/1', '/game/round/2', '/game/final']

  const getNextPage = () => {
    const curIdx = breadcrumbs.indexOf(pathname)

    if (curIdx === -1) {
      return breadcrumbs[0]
    }

    return breadcrumbs[(curIdx + 1) % breadcrumbs.length]
  }

  return (
    <div className="app-container">
      {children}

      {/* scoreboards components */}
      <AnimatePresence>
        {showScoreboard && <ScoreboardView hideScoreboard={() => setShowScoreboard(false)} />}
      </AnimatePresence>

      {showScoreboardMini && <ScoreboardMini />}

      <div className="app__button-container">
        <Link to="/" className="button app__button app__button--round">⏮</Link>
        <button
          onClick={() => setShowScoreboardMini(!showScoreboardMini)}
          className="button app__button app__button--round"
        >
          $
        </button>
        <button
          onClick={() => setShowScoreboard(!showScoreboard)}
          className="button app__button app__button--round"
        >
          Ξ
        </button>
        <Link to={getNextPage()} className="button app__button app__button--round app__button--next">⮕</Link>
      </div>
    </div>
  )
}

AppContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default AppContainer
