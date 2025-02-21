import React, {useState} from "react";
import PropTypes from 'prop-types';
import {motion} from "framer-motion";

import './CategoryRow.css'
import QuestionBoard from "../QuestionBoard/QuestionBoard.jsx";

const CategoryRow = (props) => {
    const [revealedCategories, setRevealedCategories] = useState(new Set());
    const [clickedCategory, setClickedCategory] = useState(null);

    const { categories } = props
    const questionBoxShowDelays = [0, 1, 2]

    const handleCategoryClick = (categoryName, categoryIndex) => {
        setClickedCategory({id: `cat-${categoryName}-n-${categoryIndex}`, text: categoryName});

    }

    const handleCategoryClose = () => {
        setRevealedCategories((prev) => new Set(prev).add(clickedCategory.id))
        setClickedCategory(null)
    }

    return <div className="category-container">
        {categories.map((category, idx) => (
            <motion.div
                key={`cat-cont-${idx}`}
                className={`category ${revealedCategories.has(`cat-${category}-n-${idx}`) ? 'revealed' : ''}`}
                onClick={() => handleCategoryClick(category, idx)}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{
                    duration: 0.1,
                    delay: questionBoxShowDelays[Math.floor(Math.random() * questionBoxShowDelays.length)],
                }}
            >
                <span>{category}</span>
            </motion.div>
        ))}

        <QuestionBoard
            selectedQuestion={clickedCategory}
            handleQuestionClose={handleCategoryClose}
        />
    </div>
}

CategoryRow.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CategoryRow