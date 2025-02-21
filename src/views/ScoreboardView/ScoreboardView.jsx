import React from "react";
import {motion} from "framer-motion";

import {usePlayers} from "../../context/PlayersContext";

import "./ScoreboardView.css";

const ScoreboardView = () => {
    const {players} = usePlayers();

    return (
        <motion.div
            className="scoreboard-view"
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
};

export default ScoreboardView