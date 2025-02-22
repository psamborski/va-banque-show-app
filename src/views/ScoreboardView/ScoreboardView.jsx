import React from "react"
import PropTypes from "prop-types"
import {motion} from "framer-motion"

import {usePlayers} from "../../context/PlayersContext"

import "./ScoreboardView.css"

const ScoreboardView = (props) => {
    const {players} = usePlayers();

    const {hideScoreboard} = props

    return (
        <motion.div
            className="scoreboard-view"
            onClick={() => hideScoreboard()}
            initial={{scale: 0}}
            animate={{
                scale: 1,
            }}
            transition={{
                duration: .4,
                ease: "linear",
            }}
            exit={{
                scale: 0,
                transition: {
                    duration: .2
                }
            }}
        >
            {players.map(player => (
                <div key={`sb-${player.id}`} className="scoreboard-player-box">
                    <h2>{player.name}</h2>
                    <span className={'scoreboard-balance'}>{player.balance} zł</span>
                </div>
            ))}
        </motion.div>
    );
}

ScoreboardView.propTypes = {
    hideScoreboard: PropTypes.func
}

export default ScoreboardView