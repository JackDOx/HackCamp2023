// Select.js

import React from 'react';
import './Select.css'; // Import the CSS file

const Select = ({ options, prompt, selectedOption, onChange }) => {
  return (
    <div className="form-group">
      <label className="select-label">{prompt}</label>
      <div className="select-buttons">
        {options.map((option) => (
          <button
            type = "button"
            key={option}
            className={`select-button ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
