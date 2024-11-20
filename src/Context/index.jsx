import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';
 
const StateContext = createContext();
 
export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Pretoria');
    const [thisLocation, setLocation] = useState('');
 
    // Fetch weather data
    const fetchWeather = async () => {
        const apiKey = '309758406bd583d56e96804991a8b388'; // Ensure this is correctly set in your .env file
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
 
        try {
            const response = await axios.get(apiUrl, {
                params: {
                    q: place, // Query city name
                    units: 'metric', // Use metric units (Celsius)
                    appid: apiKey // API key
                }
            });
 
            console.log(response.data);
 
            const thisData = response.data;
            setLocation(thisData.name); // Set city name
            setWeather(thisData.main); // Set weather details (e.g., temperature, humidity, etc.)
            setValues(thisData.weather); // Set additional weather info (e.g., description)
 
        } catch (e) {
            console.error(e);
            alert('This place does not exist or there was an issue with the API.');
        }
    };
 
    useEffect(() => {
        fetchWeather();
    }, [place]);
 
    return (
<StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
        }}>
            {children}
</StateContext.Provider>
    );
};
 
export const useStateContext = () => useContext(StateContext);