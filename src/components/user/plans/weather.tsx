import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { weather_key } from '@/assets/helpers';

interface WeatherData {
  location: { name: string };
  current: { condition: { icon:string }, temp_c: number };
  wind: { speed: number };
}

export default function Weather(){
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("Bali");
  const [error, setError] = useState<string | null>(null);
  
  // const apiKey = "dc3fb467ef3242e39d565141253003";
  const apiKey = weather_key();
  
  useEffect(() => {
    const fetchWeather = async () => {
      try{
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);  
        
        setWeather(response.data);
      }catch(err){
        setError("Could not fetch weather data");
      }
    };
  
    fetchWeather();
  }, [city]);
  
  return(
    <div>
      {error && <p>{error}</p>}
      {weather ? (
        <div className='flex items-center'>
          <h2 className='text-blue-950'><strong>{weather.location.name}</strong></h2>
          <p className='ml-5'>{weather.current.temp_c}°</p>
          <img src={weather.current.condition.icon} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};