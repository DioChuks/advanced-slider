// StepSlider.jsx
import React, { useState, useCallback } from 'react';
import './slider-three.css';

const StepSlider = ({ min = 0, max = 10, step = 1, defaultValue = 1 }) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    }, []);

    // Create array of step markers
    const steps = Array.from(
        { length: Math.floor((max - min) / step) + 1 },
        (_, i) => min + (i * step)
    );

    const multipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const getTrackPercentage = useCallback(() => {
        return ((value - min) / (max - min)) * 100;
    }, [value, min, max]);

    return (
        <div className="step-slider-container">
            <div className="slider-labels">
                <span>Min</span>
                <span>Max</span>
            </div>
            <div className="slider-wrapper">
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
                    className="step-slider"
                />
                <div className="step-markers">
                    {steps.map((stepValue) => (
                        <div
                            key={stepValue}
                            className={`step-mark ${value >= stepValue ? 'active' : ''}`}
                        />
                    ))}
                </div>
                <div className="step-multipliers">
                    {Array.from(multipliers).map((_, index) => (
                        <div
                            key={index}
                            className={`step-multiplier ${value >= index ? 'active' : ''}`}
                        >x{index}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StepSlider;