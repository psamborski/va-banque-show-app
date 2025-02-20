import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = ["Historia", "Nauka", "Sztuka", "Sport", "Geografia"];
const values = [200, 400, 600, 800, 1000];

const questions = {
    "Historia": ["Pytanie 1", "Pytanie 2", "Pytanie 3", "Pytanie 4", "Pytanie 5"],
    "Nauka": ["Pytanie 6", "Pytanie 7", "Pytanie 8", "Pytanie 9", "Pytanie 10"],
    "Sztuka": ["Pytanie 11", "Pytanie 12", "Pytanie 13", "Pytanie 14", "Pytanie 15"],
    "Sport": ["Pytanie 16", "Pytanie 17", "Pytanie 18", "Pytanie 19", "Pytanie 20"],
    "Geografia": ["Pytanie 21", "Pytanie 22", "Pytanie 23", "Pytanie 24", "Pytanie 25"],
};

export default function VaBanque() {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [hiddenValues, setHiddenValues] = useState(new Set());

    const handleSelect = (category, index) => {
        const value = values[index];
        if (!hiddenValues.has(`${category}-${value}`)) {
            setSelectedQuestion({ category, question: questions[category][index], value });
        }
    };

    const handleClose = () => {
        setHiddenValues((prev) => new Set(prev).add(`${selectedQuestion.category}-${selectedQuestion.value}`));
        setSelectedQuestion(null);
    };

    return (
        <div className="p-4 text-center">
            <div className="grid grid-cols-5 gap-2">
                {categories.map((cat, idx) => (
                    <div key={idx} className="p-2 font-bold bg-gray-800 text-white rounded">
                        {cat}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-5 gap-2 mt-2">
                {categories.map((cat) =>
                    values.map((val, idx) => (
                        <button
                            key={`${cat}-${val}`}
                            className={`p-4 bg-blue-500 text-white font-bold rounded ${
                                hiddenValues.has(`${cat}-${val}`) ? "opacity-20 cursor-not-allowed" : ""
                            }`}
                            onClick={() => handleSelect(cat, idx)}
                            disabled={hiddenValues.has(`${cat}-${val}`)}
                        >
                            {val}
                        </button>
                    ))
                )}
            </div>
            {selectedQuestion && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 text-white"
                >
                    <div className="p-6 bg-gray-900 rounded-lg text-xl">
                        <p>{selectedQuestion.question}</p>
                        <button className="mt-4 bg-red-500 px-4 py-2 rounded" onClick={handleClose}>
                            Zamknij
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
