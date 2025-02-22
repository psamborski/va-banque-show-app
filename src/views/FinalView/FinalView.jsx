import React, {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import JingleSoundPlayer from "../../components/JingleSoundPlayer/JingleSoundPlayer.jsx";
import MelodyPlayer from "../../components/MelodyPlayer/MelodyPlayer.jsx";

import "./FinalView.css";

import {final} from "../../data/questions.jsx";

const FinalView = () => {
    const [showCategory, setShowCategory] = useState(false);
    const [showFinalQuestion, setShowFinalQuestion] = useState(false);

    return <div
        className="final-view-container"
        onClick={() => setShowCategory(true)}
    >
        {/*music players*/}
        {showCategory && !showFinalQuestion && <JingleSoundPlayer/>}
        {showCategory && showFinalQuestion && <MelodyPlayer/>}

        {/*proper component*/}
        {showCategory && <AnimatePresence>
            <motion.div
                initial={{scale: 0}}
                animate={{
                    scale: 1,
                    rotateY: !showFinalQuestion ? 180 : 0
                }}
                transition={{
                    duration: !showFinalQuestion ? 0 : .8,
                    ease: "linear",
                    delay: !showFinalQuestion ? 1 : 0,
                }}
                exit={{
                    scale: 0,
                    transition: {
                        duration: .2
                    }
                }}
                className={`question-container`}
            >
                <span className={'final-question-category small'}>{final.category}</span>
                <span className={'final-question-question'}>{final.question}</span>
            </motion.div>
            {!showFinalQuestion && <motion.div
                key={`final-category-box`}
                initial={{scale: 0}}
                animate={{
                    scale: 1,
                }}
                transition={{
                    duration: .8, ease: "linear",
                }}
                exit={{
                    rotateY: -90, transition: {
                        duration: .4,
                    }
                }}
                className={`question-container`}
                onClick={() => setShowFinalQuestion(true)}
            >
                <span className={'final-question-category'}>{final.category}</span>

            </motion.div>}
        </AnimatePresence>}
    </div>;
}

export default FinalView
