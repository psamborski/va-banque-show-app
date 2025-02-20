import React, {useState} from "react";
import {motion} from "framer-motion";

const categories = ["Historia", "Nauka", "Sztuka", "Sport", "Geografia"];
const prices = [200, 400, 600, 800, 1000];

const questions = {
    "Historia": ["Pytanie 1", "Pytanie 2", "Pytanie 3", "Pytanie 4", "Pytanie 5"],
    "Nauka": ["Pytanie 6", "Pytanie 7", "Pytanie 8", "Pytanie 9", "Pytanie 10"],
    "Sztuka": ["Pytanie 11", "Pytanie 12", "Pytanie 13", "Pytanie 14", "Pytanie 15"],
    "Sport": ["Pytanie 16", "Pytanie 17", "Pytanie 18", "Pytanie 19", "Pytanie 20"],
    "Geografia": ["Pytanie 21", "Pytanie 22", "Pytanie 23", "Pytanie 24", "Pytanie 25"],
};

const App = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [hiddenPrices, setHiddenPrices] = useState(new Set());

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

export default App
