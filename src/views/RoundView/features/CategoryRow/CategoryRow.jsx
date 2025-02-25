import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'

import './CategoryRow.css'
import QuestionBoard from '../QuestionBoard/QuestionBoard.jsx'

const CategoryRow = (props) => {
  const [revealedCategories, setRevealedCategories] = useState(new Set())
  const [clickedCategory, setClickedCategory] = useState(null)

  const { categories } = props
  const questionBoxShowDelays = [0, 1, 2]

  const { roundNum } = useParams()

  // Reset state when round changes
  useEffect(() => {
    setClickedCategory(null)
    setRevealedCategories(new Set())
  }, [roundNum])

  const handleCategoryClick = (categoryName, categoryIndex) => {
    setClickedCategory({ id: `cat-${categoryName}-n-${categoryIndex}`, text: categoryName })
  }

  const handleCategoryClose = () => {
    setRevealedCategories((prev) => new Set(prev).add(clickedCategory.id))
    setClickedCategory(null)
  }

  return (
    <div className="category-row">
      {categories.map((category, idx) => (
        <motion.div
          key={`category-row__item-${idx}`}
          className={`category-row__item ${
            revealedCategories.has(`cat-${category}-n-${idx}`) ? 'category-row__item--revealed' : ''
          }`}
          onClick={() => handleCategoryClick(category, idx)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: questionBoxShowDelays[Math.floor(Math.random() * questionBoxShowDelays.length)],
          }}
        >
          <span className="category-row__text">{category}</span>
        </motion.div>
      ))}

      <QuestionBoard
        selectedQuestion={clickedCategory}
        handleQuestionClose={handleCategoryClose}
      />
    </div>
  )
}

CategoryRow.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default CategoryRow