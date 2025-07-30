import { Card } from '@/components/ui/card';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  description: string;
}

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  const getWeatherIcon = (condition: string) => {
    if (condition.toLowerCase().includes('rain')) return '🌧️';
    if (condition.toLowerCase().includes('snow')) return '❄️';
    if (condition.toLowerCase().includes('cloud')) return '☁️';
    if (condition.toLowerCase().includes('clear')) return '☀️';
    return '🌤️';
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 0) return 'text-blue-400';
    if (temp < 10) return 'text-blue-300';
    if (temp < 20) return 'text-green-400';
    if (temp < 30) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <Card className="glass-card p-8 animate-weather-fade-in">
      <div className="text-center space-y-6">
        {/* Location */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground text-shadow">
            {weather.location}
          </h1>
          <p className="text-muted-foreground capitalize">
            {weather.description}
          </p>
        </div>

        {/* Main Temperature Display */}
        <div className="space-y-4">
          <div className="text-8xl animate-float">
            {getWeatherIcon(weather.condition)}
          </div>
          <div className={`text-6xl font-light ${getTemperatureColor(weather.temperature)} text-shadow-lg`}>
            {Math.round(weather.temperature)}°
          </div>
          <div className="text-xl text-muted-foreground capitalize font-medium">
            {weather.condition}
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-6 pt-4">
          <div className="space-y-2">
            <div className="text-3xl opacity-60">💧</div>
            <div className="text-sm text-muted-foreground">Humidity</div>
            <div className="text-2xl font-semibold text-primary">{weather.humidity}%</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-3xl opacity-60">💨</div>
            <div className="text-sm text-muted-foreground">Wind Speed</div>
            <div className="text-2xl font-semibold text-primary">{weather.windSpeed} km/h</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;