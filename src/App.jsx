import { useState } from 'react';
import './App.css';
import search from './assets/icons/search.svg';
import { useStateContext } from './Context';
import { BackgroundLayout, WeatherCard, MiniCard } from './Components';
 
function App() {
    const [input, setInput] = useState('');
    const { weather, thisLocation, values, place, setPlace } = useStateContext();
 
    const submitCity = () => {
        if (input.trim() === '') return; // Avoid empty submissions
        setPlace(input);
        setInput('');
    };
 
    return (
<div className='w-full h-screen text-white px-8'>
            {/* Navigation Bar */}
<nav className='w-full p-3 flex justify-between items-center'>
<h1 className='font-bold tracking-wide text-3xl'>South African Weather Services</h1>
<div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
<img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
<input
                        type="text"
                        placeholder='Search city'
                        className='focus:outline-none w-full text-[#212121] text-lg'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                submitCity();
                            }
                        }}
                    />
</div>
</nav>
 
            {/* Background */}
<BackgroundLayout />
 
            {/* Main Weather Display */}
<main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
                {thisLocation ? (
<WeatherCard
                        place={thisLocation}
                        windspeed={weather.wind?.speed} // Adjusted to match OpenWeatherMap response
                        humidity={weather.humidity}
                        temperature={weather.temp}
                        heatIndex={weather.feels_like} // "Feels like" temperature
                        iconString={weather.weather?.[0]?.icon} // Weather icon string
                        conditions={weather.weather?.[0]?.description} // Weather description
                    />
                ) : (
<p>Loading weather data...</p>
                )}
 
                {/* Forecast Section */}
<div className='flex justify-center gap-8 flex-wrap w-[60%]'>
                    {values?.map((curr, index) => (
<MiniCard
                            key={index}
                            time={curr.dt_txt} // Forecast time (adjust as needed)
                            temp={curr.main?.temp} // Forecast temperature
                            iconString={curr.weather?.[0]?.icon} // Forecast icon
                        />
                    ))}
</div>
</main>
</div>
    );
}
 
export default App;
