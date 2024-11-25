import React from 'react'
import GradientSlider from '../components/sliders/SliderBarTwo'

const Slider: React.FC = () => {
  return (
    <GradientSlider min={0} max={10} step={1} defaultValue={4}/>
  )
}

export default Slider