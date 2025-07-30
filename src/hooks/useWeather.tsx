import { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  description: string;
}

const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock weather data - In a real app, you'd fetch from a weather API
  const mockWeatherData: WeatherData[] = [
    {
      temperature: 22,
      condition: 'partly cloudy',
      humidity: 65,
      windSpeed: 15,
      location: 'New York',
      description: 'Pleasant weather with scattered clouds'
    },
    {
      temperature: 28,
      condition: 'sunny',
      humidity: 45,
      windSpeed: 8,
      location: 'Los Angeles',
      description: 'Clear skies and warm weather'
    },
    {
      temperature: 12,
      condition: 'rainy',
      humidity: 85,
      windSpeed: 22,
      location: 'London',
      description: 'Light rain with overcast skies'
    },
    {
      temperature: -2,
      condition: 'snowy',
      humidity: 90,
      windSpeed: 18,
      location: 'Montreal',
      description: 'Heavy snowfall expected'
    }
  ];

  const fetchWeather = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Get a random weather condition for demo
        const randomWeather = mockWeatherData[Math.floor(Math.random() * mockWeatherData.length)];
        setWeather(randomWeather);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const refreshWeather = () => {
    fetchWeather();
  };

  return { weather, loading, error, refreshWeather };
};

export default useWeather;