// GradientSlider.jsx
import React, { useState, useCallback } from 'react';
import './slider.css';

interface ISliderProps {
    min: number;
    max: number;
    step: number;
    defaultValue: number;
}

const GradientSlider: React.FC<ISliderProps> = ({ min = 0, max = 10, step = 1, defaultValue = 4 }) => {
  const [value, setValue] = useState(defaultValue);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  }, []);

  const getTrackPercentage = useCallback(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const marks = Array.from({ length: max + 1 }, (_, i) => i);

  return (
    <div className="slider-container">
      <div className="slider-labels">
        <span>Min</span>
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

      <div className="marks-container">
        {marks.map((mark) => (
          <div 
            key={mark} 
            className={`mark ${value === mark ? 'active' : ''}`}
          >
            <span className="mark-label">{mark + 10}x</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradientSlider;