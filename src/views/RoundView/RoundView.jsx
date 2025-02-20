import React, {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useParams} from "react-router-dom";

import "./RoundView.css";
import {rounds} from "../../static/questions.jsx";

const RoundView = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [hiddenPrices, setHiddenPrices] = useState(new Set());
    const [bonusQuestionFlag, setbonusQuestionFlag] = useState(false);
    const [displayBonusView, setDisplayBonusView] = useState(false);

    const {roundNum} = useParams();
    const questions = rounds[roundNum].questions;
    const categories = Object.keys(rounds[roundNum].questions);
    const prices = rounds[roundNum].prices
    const bonus = rounds[roundNum].bonus

    const handleSelect = (category, index) => {
        const price = prices[index];
        if (bonus?.[category] === index) {
            setbonusQuestionFlag(true);
            setDisplayBonusView(true);
        }
        setSelectedQuestion({category, id: `cat-${category}-q-${index}`, question: questions[category][index], price});
    };

    const handleClose = () => {
        setHiddenPrices((prev) => new Set(prev).add(`${selectedQuestion.category}-${selectedQuestion.price}`));
        setSelectedQuestion(null);
        setbonusQuestionFlag(false);
        setDisplayBonusView(false);
    };

    return (<div className="main-container">
        <div className="category-container">
            {categories.map((category, idx) => (<div key={`cat-cont-${idx}`} className="category">
                <span>{category}</span>
            </div>))}
        </div>
        <div className="price-container">
            {categories.map((cat, catId) => (
                    <div
                        key={`price-cat-${catId}-container`}
                        className={`price-cat-container`}
                    >
                        {prices.map((price, idx) => (
                            <div
                                key={`${cat}-${price}`}
                                className={`price-box ${hiddenPrices.has(`${cat}-${price}`) ? "used" : ""}`}
                                onClick={() => handleSelect(cat, idx)}
                            >
                                {price}
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
        {selectedQuestion && (
            <>
                <motion.div
                    key={`${selectedQuestion.id}-q`}
                    initial={{scale: 0}}
                    animate={{
                        scale: 1,
                        rotateY: displayBonusView ? 180 : 0
                    }}
                    transition={{
                        duration: displayBonusView ? 0 : .8,
                        ease: "linear",
                        delay: displayBonusView ? 1 : 0,
                    }}
                    className={`question-container`}
                >
                    <span>{selectedQuestion.question}</span>
                    <button className="close-btn" onClick={handleClose}>
                        &#10006;
                    </button>
                </motion.div>
                {<AnimatePresence>
                    {bonusQuestionFlag && displayBonusView && (
                        <motion.div
                            key={`${selectedQuestion.id}-b`}
                            initial={{scale: 0}}
                            animate={{
                                scale: 1,
                                rotateX: bonusQuestionFlag ? 360 : 0,
                                // rotateY: (bonusQuestionFlag && !displayBonusView) ? 180 : 0
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
                            onClick={() => setDisplayBonusView(false)}
                        >
                            <span>PREMIA</span>
                        </motion.div>
                    )}
                </AnimatePresence>}
            </>
        )}
    </div>);
}

export default RoundView
