import React, {useState} from "react";
import {motion} from "framer-motion";
import {useParams} from "react-router-dom";

import "./RoundView.css";
import {rounds} from "../../static/questions.jsx";

const RoundView = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [hiddenPrices, setHiddenPrices] = useState(new Set());

    const {roundNum} = useParams();
    const questions = rounds[roundNum].questions;
    const categories = Object.keys(rounds[roundNum].questions);
    const prices = rounds[roundNum].prices

    const handleSelect = (category, index) => {
        const price = prices[index];
        setSelectedQuestion({category, question: questions[category][index], price});
    };

    const handleClose = () => {
        setHiddenPrices((prev) => new Set(prev).add(`${selectedQuestion.category}-${selectedQuestion.price}`));
        setSelectedQuestion(null);
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
            <motion.div
                initial={{scale: 0}}
                animate={{
                    scale: 1,
                }}
                transition={{
                    duration: .8,
                    ease: "linear",
                }}
                className="question-container"
            >
                <span>{selectedQuestion.question}</span>
                <button className="close-btn" onClick={handleClose}>
                    &#10006;
                </button>
            </motion.div>
        )}
    </div>);
}

export default RoundView
