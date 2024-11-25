import { useState } from 'react';
import './App.css'
// import MovieCard from './components/MovieCard'
import MultiplierSelector from './components/sliders/SliderBar'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Slider from './pages/Slider';
import GradientSliderTwo from './components/sliders/SliderBarThree';
import StepSlider from './components/sliders/SliderBarFour';

function App() {
  const queryClient = new QueryClient();
  const [selectedToken, setSelectedToken] = useState('STRK');
  const [selectedMultiplier, setSelectedMultiplier] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <div className='my-6 bg-gray-950 h-screen'>
        <MultiplierSelector setSelectedMultiplier={setSelectedMultiplier} selectedToken={selectedToken} />
        <div className='flex gap-6 items-center flex-wrap ml-4'>
          <button className='border p-2 rounded' onClick={() => setSelectedToken('STRK')}>Set STRK Token</button>
          <button className='border p-2 rounded' onClick={() => setSelectedToken('USDC')}>Set USDC Token</button>
          <button className='border p-2 rounded' onClick={() => setSelectedToken('ETH')}>Set ETH Token</button>
          <button className='border p-2 rounded' onClick={() => setSelectedToken('DAI')}>Set DAI Token</button>

          <p>Selected Multiplier: {selectedMultiplier}</p>
        </div>
        <section className='my-6 ml-4'>
          <Slider />
        </section>
        <section className='my-6 ml-4'>
          <GradientSliderTwo min={0} max={10} step={0.5} defaultValue={4} />
        </section>
        <section className='my-6 ml-4'>
          <StepSlider
            min={0}
            max={10}
            step={1}
            defaultValue={1}
          />
        </section>
      </div>
    </QueryClientProvider>
  )
}

export default App
