import React from "react";
import PropTypes from 'prop-types';
import {AnimatePresence, motion} from "framer-motion";

import './QuestionBoard.css'

const QuestionBoard = (props) => {
    const {
        selectedQuestion,
        bonusQuestionFlag,
        handleQuestionClose,
        setBonusQuestionFlag
    } = props


    return <AnimatePresence>
        {selectedQuestion && <motion.div
            key={`${selectedQuestion.id}-q`}
            initial={{scale: 0}}
            animate={{
                scale: 1,
                rotateY: bonusQuestionFlag ? 180 : 0
            }}
            transition={{
                duration: bonusQuestionFlag ? 0 : .8,
                ease: "linear",
                delay: bonusQuestionFlag ? 1 : 0,
            }}
            exit={{
                scale: 0,
                transition: {
                    duration: .2
                }
            }}
            className={`question-container`}
        >
            <span>{selectedQuestion.text}</span>
            <button className="button close-btn" onClick={handleQuestionClose}>
                &#10006;
            </button>
        </motion.div>}
        {bonusQuestionFlag && (
            <motion.div
                key={`${selectedQuestion.id}-b`}
                initial={{scale: 0}}
                animate={{
                    scale: 1,
                    rotateX: 360,
                }}
                transition={{
                    duration: .8,
                    ease: "linear",
                }}
                exit={{
                    rotateY: -90,
                    transition: {
                        duration: .4,
                    }
                }}
                className={`question-container bonus`}
                onClick={() => setBonusQuestionFlag(false)}
            >
                <span>PREMIA</span>
            </motion.div>
        )}
    </AnimatePresence>
}

QuestionBoard.propTypes = {
    selectedQuestion: PropTypes.object.isRequired,
    bonusQuestionFlag: PropTypes.bool,

    setBonusQuestionFlag: PropTypes.object,
    handleQuestionClose: PropTypes.object.isRequired
};

export default QuestionBoard