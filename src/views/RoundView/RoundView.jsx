import React, {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Link, useParams} from "react-router-dom";

import "./RoundView.css";
import {rounds} from "../../static/questions.jsx";

const RoundView = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [hiddenPrices, setHiddenPrices] = useState(new Set());
    const [bonusQuestionFlag, setBonusQuestionFlag] = useState(false);

    const {roundNum} = useParams();
    const questions = rounds[roundNum].questions;
    const categories = Object.keys(rounds[roundNum].questions);
    const prices = rounds[roundNum].prices
    const bonus = rounds[roundNum].bonus

    const handleSelect = (category, index) => {
        const price = prices[index];
        if (bonus?.[category] === index) {
            setBonusQuestionFlag(true);
        }
        setSelectedQuestion({category, id: `cat-${category}-q-${index}`, question: questions[category][index], price});
    };

    const handleClose = () => {
        setHiddenPrices((prev) => new Set(prev).add(`${selectedQuestion.category}-${selectedQuestion.price}`));
        setSelectedQuestion(null);
        setBonusQuestionFlag(false);
    };

    return (<div className="round-view-container">
        <Link to={roundNum === '1' ? '/round/2' : '/final'} className="button next-round-button">⮕</Link>
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
        <AnimatePresence>
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
                <span>{selectedQuestion.question}</span>
                <button className="button close-btn" onClick={handleClose}>
                    &#10006;
                </button>
            </motion.div>}
            {selectedQuestion && bonusQuestionFlag && (
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
    </div>);
}

export default RoundView
