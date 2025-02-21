import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Link, useParams} from "react-router-dom";

import BonusSoundPlayer from "../../features/BonusSoundPlayer/BonusSoundPlayer.jsx";
import CategoryRevealSoundPlayer from "../../features/CategoryRevealSoundPlayer/CategoryRevealSoundPlayer.jsx";
import JingleSoundPlayer from "../../features/JingleSoundPlayer/JingleSoundPlayer.jsx";

import CategoryRow from "./features/CategoryRow/CategoryRow.jsx";

import "./RoundView.css";

import {rounds} from "../../static/questions.jsx";
import PrizesGrid from "./features/PrizesGrid/PrizesGrid.jsx";
import QuestionBoard from "./features/QuestionBoard/QuestionBoard.jsx";

const RoundView = () => {
    const [showAllQuestions, setShowAllQuestions] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [hiddenPrizes, setHiddenPrizes] = useState(new Set());
    const [bonusQuestionFlag, setBonusQuestionFlag] = useState(false);

    const {roundNum} = useParams();
    const questions = rounds[roundNum].questions;
    const categories = Object.keys(rounds[roundNum].questions);
    const prizes = rounds[roundNum].prizes
    const bonus = rounds[roundNum].bonus

    // make sure to clean up
    useEffect(() => {
        setSelectedQuestion(null);
        setHiddenPrizes(new Set());
        setShowAllQuestions(false);
        setBonusQuestionFlag(false);
    }, [roundNum]);

    const handlePrizeSelect = (category, index) => {
        const prize = prizes[index];
        if (bonus?.[category] === index) {
            setBonusQuestionFlag(true);
        }
        setSelectedQuestion({category, id: `cat-${category}-q-${index}`, question: questions[category][index], prize});
    };

    const handleQuestionClose = () => {
        setHiddenPrizes((prev) => new Set(prev).add(`${selectedQuestion.category}-${selectedQuestion.prize}`));
        setSelectedQuestion(null);
        setBonusQuestionFlag(false);
    };

    return <>
        {/* audio players */}
        <CategoryRevealSoundPlayer playing={showAllQuestions}/>
        <BonusSoundPlayer playing={bonusQuestionFlag}/>
        <JingleSoundPlayer/>

        {/* next round button */}
        <Link to={roundNum === '1' ? '/round/2' : '/final'} className="button next-round-button">⮕</Link>

        {/* proper component */}
        <AnimatePresence>
            {/* dummy board */}
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
            />}

            {/*game board grid*/}
            {showAllQuestions &&
                <div
                    key={`round-${roundNum}-view`}
                    className="round-view-container"
                >
                    <CategoryRow categories={categories}/>
                    <PrizesGrid
                        categories={categories}
                        prizes={prizes}
                        hiddenPrizes={hiddenPrizes}

                        handlePrizeSelect={handlePrizeSelect}
                    />
                </div>
            }
        </AnimatePresence>

        {/* question board */}
        <QuestionBoard
            selectedQuestion={selectedQuestion}
            bonusQuestionFlag={bonusQuestionFlag}
            handleQuestionClose={handleQuestionClose}
            setBonusQuestionFlag={setBonusQuestionFlag}
        />
    </>

}

export default RoundView
