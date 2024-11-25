import React, { useMemo, useCallback, useState } from 'react';
import { useMaxMultiplier } from '../../hooks/useMaxMultiplier';


interface ISliderBarProps {
    setSelectedMultiplier: any;
    selectedToken: string;
}

const MultiplierSelector: React.FC<ISliderBarProps> = ({ setSelectedMultiplier, selectedToken }) => {

    const { data, isLoading, error } = useMaxMultiplier();
    const [actualValue, setActualValue] = useState(4.0);

    const maxMultiplier = useMemo(() => {
        return data?.[selectedToken] || 11.0;
    }, [data, selectedToken]);

    const TOTAL_MARKS = 11;
    const STEP_SIZE = (maxMultiplier - 1) / (TOTAL_MARKS - 1);

    const mapSliderToValue = useCallback((sliderValue: number) => {
        // Direct mapping from slider value to multiplier
        return Math.min(maxMultiplier, Math.max(1, sliderValue));
    }, [maxMultiplier]);

    const handleMultiplierChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const sliderValue = parseFloat(e.target.value);
            const value = Number(mapSliderToValue(sliderValue).toFixed(1));
            setActualValue(value);
            setSelectedMultiplier(value);
        },
        [setSelectedMultiplier, mapSliderToValue]
    );

    const getSliderPercentage = useCallback(() => {
        return ((actualValue - 1) / (maxMultiplier - 1)) * 100;
    }, [actualValue, maxMultiplier]);

    const getCurrentMark = useCallback(() => {
        const markIndex = Math.round((actualValue - 1) * (TOTAL_MARKS - 1) / (maxMultiplier - 1));
        return Math.min(Math.max(0, markIndex), TOTAL_MARKS - 1);
    }, [actualValue, maxMultiplier]);

    if (isLoading) return <div className="w-full h-12 bg-gray-200 animate-pulse rounded">Loading multiplier data...</div>;
    if (error) return <div className="text-red-500">Error loading multiplier data: {error.message}</div>;

    const currentMark = getCurrentMark();

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium text-gray-600">
                    <span>Low</span>
                    <span>Max</span>
                </div>

                <div className="relative">
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div
                            className="absolute h-2 bg-blue-500 rounded-full transition-all"
                            style={{ width: `${getSliderPercentage()}%` }}
                        />
                    </div>

                    <input
                        type="range"
                        min="1"
                        max={maxMultiplier}
                        step={0.1}
                        value={actualValue}
                        onChange={handleMultiplierChange}
                        className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                    />
                </div>

                <div className="flex justify-between mt-6">
                    {Array.from({ length: TOTAL_MARKS }).map((_, index) => {
                        const markValue = 1 + (index * STEP_SIZE);
                        const isActive = index === currentMark;

                        return (
                            <div className={`meter-label ${isActive ? 'active' : ''}`}>
                                {index}x
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-4 text-center font-medium text-gray-700">
                Selected Multiplier: {actualValue.toFixed(1)}
            </div>
        </div>
    );
};

export default MultiplierSelector;