// GradientSlider.jsx
import React, { useState, useCallback } from 'react';
import './slider-two.css';

interface ISliderProps {
    min: number;
    max: number;
    step: number;
    defaultValue: number;
}

const GradientSliderTwo: React.FC<ISliderProps> = ({ min = 0, max = 10, step = 1, defaultValue = 4 }) => {
  const [value, setValue] = useState(defaultValue);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  }, []);

  const getTrackPercentage = useCallback(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const marks = Array.from({ length: max + 1 }, (_, i) => i);

  return (
    <div className='slide-container'>
        <div className="slide-headings">
            <span>Low</span>
            <span>Max</span>
        </div>
        <div className="slider-track-container">
        <div 
          className="slider-track-fill"
          style={{ width: `${getTrackPercentage()}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="slider-input"
        />
        <div className="slider-thumb" style={{ left: `${getTrackPercentage()}%` }}>
          <div className="slider-thumb-inner" />
        </div>
      </div>
      <p>{value}</p>
    </div>
  );
};

export default GradientSliderTwo;