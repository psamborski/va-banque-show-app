import React from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import './QuestionBoard.css'

const QuestionBoard = (props) => {
  const { selectedQuestion, bonusQuestionFlag, handleQuestionClose, setBonusQuestionFlag } = props

  return (
    <AnimatePresence>
      {selectedQuestion && (
        <motion.div
          key={`${selectedQuestion.id}-q`}
          onClick={handleQuestionClose}
          initial={{ scale: 0 }}
          animate={{
            scale: 1, rotateY: bonusQuestionFlag ? 180 : 0,
          }}
          transition={{
            duration: bonusQuestionFlag ? 0 : 0.8, ease: 'linear', delay: bonusQuestionFlag ? 1 : 0,
          }}
          exit={{
            scale: 0, transition: {
              duration: 0.2,
            },
          }}
          className="question-board__container"
        >
          <span className="question-board__text">{selectedQuestion.text}</span>
        </motion.div>
      )}
      {bonusQuestionFlag && (
        <motion.div
          key={`${selectedQuestion.id}-b`}
          initial={{ scale: 0 }}
          animate={{
            scale: 1, rotateX: 360,
          }}
          transition={{
            duration: 0.8, ease: 'linear',
          }}
          exit={{
            rotateY: -90, transition: {
              duration: 0.4,
            },
          }}
          className="question-board__container question-board__container--bonus"
          onClick={() => setBonusQuestionFlag(false)}
        >
          <span className="question-board__bonus-text">PREMIA</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

QuestionBoard.propTypes = {
  selectedQuestion: PropTypes.object.isRequired,
  bonusQuestionFlag: PropTypes.bool,
  setBonusQuestionFlag: PropTypes.func,
  handleQuestionClose: PropTypes.func.isRequired,
}

export default QuestionBoard