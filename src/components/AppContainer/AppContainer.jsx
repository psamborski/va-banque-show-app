import React, {useState} from "react"
import PropTypes from 'prop-types'
import {Link, useLocation} from "react-router-dom"
import {AnimatePresence} from "framer-motion"

import ScoreboardView from "../../views/ScoreboardView/ScoreboardView.jsx"
import ScoreboardMini from "../ScoreboardMini/ScoreboardMini.jsx"

import "./AppContainer.css"

const AppContainer = ({children}) => {
    const [showScoreboard, setShowScoreboard] = useState(false)
    const [showScoreboardMini, setShowScoreboardMini] = useState(false)

    const {pathname} = useLocation()

    const breadcrumbs = ['/', '/players', '/game/round/1', '/game/round/2', '/game/final']

    const getNextPage = () => {
        const curIdx = breadcrumbs.indexOf(pathname)

        if (curIdx === -1) {
            return breadcrumbs[0]
        }

        return breadcrumbs[(curIdx + 1) % breadcrumbs.length]
    }

    return <div className="app-container">
        {children}

        {/* scoreboards components */}
        <AnimatePresence>
            {showScoreboard && <ScoreboardView/>}
        </AnimatePresence>

        {showScoreboardMini && <ScoreboardMini/>}

        <div className={'app-btn-container'}>
            <Link to="/" className={"round-button"}>⌂</Link>
            <Link to="/game/round/1" className={"round-button"}>►</Link>
            <button
                onClick={() => setShowScoreboard(!showScoreboard)}
                className={"round-button"}>
                Ξ
            </button>
            <button
                onClick={() => setShowScoreboardMini(!showScoreboardMini)}
                className={"round-button"}
            >
                $
            </button>

            <Link to={getNextPage()} className="round-button next-round-button">⮕</Link>
        </div>
    </div>
}

AppContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default AppContainer
