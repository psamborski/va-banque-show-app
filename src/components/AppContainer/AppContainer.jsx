import React, {useState} from "react"
import PropTypes from 'prop-types'
import {AnimatePresence} from "framer-motion"

import ScoreboardView from "../../views/ScoreboardView/ScoreboardView.jsx"

import "./AppContainer.css"

const AppContainer = ({children}) => {
    const [showScoreboard, setShowScoreboard] = useState(false)
    return <div className="app-container">
        {children}

        {/* scoreboard logic */}
        <AnimatePresence>
            {showScoreboard && <ScoreboardView />}
        </AnimatePresence>
        <button onClick={() => setShowScoreboard(!showScoreboard)} className="round-button show-scoreboard-button">
            Ξ
        </button>
    </div>
}

AppContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default AppContainer
