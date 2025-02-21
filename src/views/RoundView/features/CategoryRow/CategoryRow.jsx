import React from "react";
import PropTypes from 'prop-types';
import {motion} from "framer-motion";

import './CategoryRow.css'

const CategoryRow = (props) => {
    const { categories } = props
    const questionBoxShowDelays = [0, 1, 2]

    return <div className="category-container">
        {categories.map((category, idx) => (
            <motion.div
                key={`cat-cont-${idx}`}
                className="category"
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
    </div>
}

CategoryRow.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CategoryRow