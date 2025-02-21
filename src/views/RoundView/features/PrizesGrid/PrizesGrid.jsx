import React from "react";
import PropTypes from 'prop-types';
import {motion} from "framer-motion";

import './PrizesGrid.css'

const PrizesGrid = (props) => {
    const { categories, prizes, hiddenPrizes } = props
    const { handlePrizeSelect } = props

    const questionBoxShowDelays = [0, 1, 2]

    return <div className="prize-container">
        {categories.map((cat, catId) => (
                <div
                    key={`prize-cat-${catId}-container`}
                    className={`prize-cat-container`}
                >
                    {prizes.map((prize, idx) => (
                        <motion.div
                            key={`${cat}-${prize}`}
                            className={`prize-box ${hiddenPrizes.has(`${cat}-${prize}`) ? "used" : ""}`}
                            onClick={() => handlePrizeSelect(cat, idx)}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.1,
                                delay: questionBoxShowDelays[Math.floor(Math.random() * questionBoxShowDelays.length)],
                            }}
                        >
                            {prize}
                        </motion.div>
                    ))}
                </div>
            )
        )}
    </div>
}

PrizesGrid.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    prizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    hiddenPrizes: PropTypes.instanceOf(Set).isRequired,

    handlePrizeSelect: PropTypes.func.isRequired,
};

export default PrizesGrid