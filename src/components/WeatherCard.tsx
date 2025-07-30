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
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain')) return '🌧';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('cloud')) return '☁️';
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return '☀️';
    return '⛅';
  };

  const getTemperatureRange = (temp: number) => {
    const high = temp + Math.floor(Math.random() * 3) + 2;
    const low = temp - Math.floor(Math.random() * 3) - 2;
    return { high, low };
  };

  const { high, low } = getTemperatureRange(weather.temperature);

  return (
    <Card className="apple-card p-8 bg-white/80 backdrop-blur-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {weather.location}
          </h2>
          <p className="text-base text-muted-foreground font-medium">
            {weather.description}
          </p>
        </div>

        {/* Main Temperature Display */}
        <div className="text-center space-y-4">
          <div className="text-7xl leading-none animate-apple-float">
            {getWeatherIcon(weather.condition)}
          </div>
          
          <div className="space-y-2">
            <div className="text-7xl font-thin text-foreground tracking-tighter">
              {Math.round(weather.temperature)}°
            </div>
            <div className="text-lg font-medium text-muted-foreground capitalize">
              {weather.condition}
            </div>
            <div className="text-sm text-muted-foreground">
              H:{high}° L:{low}°
            </div>
          </div>
        </div>

        {/* Weather Metrics */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="apple-metric-card bg-white/60">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Humidity
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {weather.humidity}%
            </div>
          </div>
          
          <div className="apple-metric-card bg-white/60">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Wind
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {weather.windSpeed} km/h
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;