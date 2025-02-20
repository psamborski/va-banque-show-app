import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Link, useParams} from "react-router-dom";

import "./RoundView.css";
import {rounds} from "../../static/questions.jsx";

const RoundView = () => {
    const [showAllQuestions, setShowAllQuestions] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [hiddenPrices, setHiddenPrices] = useState(new Set());
    const [bonusQuestionFlag, setBonusQuestionFlag] = useState(false);

    const {roundNum} = useParams();
    const questions = rounds[roundNum].questions;
    const categories = Object.keys(rounds[roundNum].questions);
    const prices = rounds[roundNum].prices
    const bonus = rounds[roundNum].bonus

    const questionBoxShowDelays = [0, 1, 2]

    // make sure to clean up
    useEffect(() => {
        setSelectedQuestion(null);
        setHiddenPrices(new Set());
        setShowAllQuestions(false);
        setBonusQuestionFlag(false);
    }, [roundNum]);

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

    return <>
        <Link to={roundNum === '1' ? '/round/2' : '/final'} className="button next-round-button">⮕</Link>
        <AnimatePresence>
            {!showAllQuestions && <motion.span
                key={`dummy-round-${roundNum}-view`}
                className={'dummy-view'}
                onClick={() => setShowAllQuestions(true)}
                initial={{opacity: 1}}
                exit={{
                    opacity: 0,
                    transition: {
                        duration: 0.2,
                        delay: 1.95,
                    }
                }}
            />
            }
            {showAllQuestions &&
                <div
                    key={`round-${roundNum}-view`}
                    className="round-view-container"
                >
                    <div className="category-container">
                        {categories.map((category, idx) => (
                            <motion.div
                                key={`cat-cont-${idx}`}
                                className="category"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.1,
                                    delay: questionBoxShowDelays[Math.floor(Math.random() * questionBoxShowDelays.length)],
                                }}
                            >
                                <span>{category}</span>
                            </motion.div>
                        ))}
                    </div>
                    <div className="price-container">
                        {categories.map((cat, catId) => (
                                <div
                                    key={`price-cat-${catId}-container`}
                                    className={`price-cat-container`}
                                >
                                    {prices.map((price, idx) => (
                                        <motion.div
                                            key={`${cat}-${price}`}
                                            className={`price-box ${hiddenPrices.has(`${cat}-${price}`) ? "used" : ""}`}
                                            onClick={() => handleSelect(cat, idx)}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{
                                                duration: 0.1,
                                                delay: questionBoxShowDelays[Math.floor(Math.random() * questionBoxShowDelays.length)],
                                            }}
                                        >
                                            {price}
                                        </motion.div>
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

                </div>
            }
        </AnimatePresence>
    </>

}

export default RoundView
