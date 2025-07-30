import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Thermometer, Wind, Droplets, Eye } from 'lucide-react';

interface ForecastDay {
  date: string;
  dayName: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
  humidity: number;
  windSpeed: number;
}

interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  precipitation: number;
}

const ForecastPage = () => {
  const dailyForecast: ForecastDay[] = [
    {
      date: '2024-01-30',
      dayName: 'Today',
      high: 22,
      low: 15,
      condition: 'Partly Cloudy',
      precipitation: 20,
      humidity: 65,
      windSpeed: 15
    },
    {
      date: '2024-01-31',
      dayName: 'Tomorrow',
      high: 25,
      low: 18,
      condition: 'Sunny',
      precipitation: 5,
      humidity: 55,
      windSpeed: 12
    },
    {
      date: '2024-02-01',
      dayName: 'Thursday',
      high: 20,
      low: 12,
      condition: 'Rainy',
      precipitation: 80,
      humidity: 85,
      windSpeed: 20
    },
    {
      date: '2024-02-02',
      dayName: 'Friday',
      high: 23,
      low: 16,
      condition: 'Cloudy',
      precipitation: 30,
      humidity: 70,
      windSpeed: 18
    },
    {
      date: '2024-02-03',
      dayName: 'Saturday',
      high: 26,
      low: 19,
      condition: 'Sunny',
      precipitation: 10,
      humidity: 50,
      windSpeed: 10
    },
    {
      date: '2024-02-04',
      dayName: 'Sunday',
      high: 24,
      low: 17,
      condition: 'Partly Cloudy',
      precipitation: 25,
      humidity: 60,
      windSpeed: 14
    },
    {
      date: '2024-02-05',
      dayName: 'Monday',
      high: 21,
      low: 14,
      condition: 'Cloudy',
      precipitation: 40,
      humidity: 75,
      windSpeed: 16
    }
  ];

  const hourlyForecast: HourlyForecast[] = [
    { time: '12 PM', temperature: 22, condition: 'Partly Cloudy', precipitation: 20 },
    { time: '1 PM', temperature: 23, condition: 'Partly Cloudy', precipitation: 15 },
    { time: '2 PM', temperature: 24, condition: 'Sunny', precipitation: 10 },
    { time: '3 PM', temperature: 25, condition: 'Sunny', precipitation: 5 },
    { time: '4 PM', temperature: 24, condition: 'Partly Cloudy', precipitation: 10 },
    { time: '5 PM', temperature: 23, condition: 'Partly Cloudy', precipitation: 15 },
    { time: '6 PM', temperature: 21, condition: 'Cloudy', precipitation: 25 },
    { time: '7 PM', temperature: 20, condition: 'Cloudy', precipitation: 30 },
  ];

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain')) return '🌧️';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('cloud')) return '☁️';
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return '☀️';
    return '⛅';
  };

  const getPrecipitationColor = (precipitation: number) => {
    if (precipitation >= 70) return 'text-blue-600';
    if (precipitation >= 40) return 'text-blue-500';
    if (precipitation >= 20) return 'text-blue-400';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="apple-hero-title text-4xl">Forecast</h1>
          <p className="apple-subtitle">Detailed weather forecast for New York</p>
        </div>

        {/* Hourly Forecast */}
        <Card className="apple-card p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Hourly Forecast</h2>
            </div>
            
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-2">
                {hourlyForecast.map((hour, index) => (
                  <Card 
                    key={index} 
                    className="apple-card p-4 min-w-[120px] bg-white/60 text-center hover:bg-white/80 transition-all duration-200"
                  >
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-muted-foreground">
                        {hour.time}
                      </div>
                      <div className="text-2xl">
                        {getWeatherIcon(hour.condition)}
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        {hour.temperature}°
                      </div>
                      <div className={`text-xs ${getPrecipitationColor(hour.precipitation)}`}>
                        {hour.precipitation}%
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* 7-Day Forecast */}
        <Card className="apple-card p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">7-Day Forecast</h2>
            </div>
            
            <div className="space-y-2">
              {dailyForecast.map((day, index) => (
                <Card 
                  key={index} 
                  className="apple-card p-4 bg-white/60 hover:bg-white/80 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 text-sm font-medium text-foreground">
                        {day.dayName}
                      </div>
                      <div className="text-2xl">
                        {getWeatherIcon(day.condition)}
                      </div>
                      <div className="min-w-[100px]">
                        <div className="text-sm font-medium text-foreground">
                          {day.condition}
                        </div>
                        <div className={`text-xs ${getPrecipitationColor(day.precipitation)}`}>
                          {day.precipitation}% chance
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Droplets className="w-4 h-4" />
                          <span>{day.humidity}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Wind className="w-4 h-4" />
                          <span>{day.windSpeed} km/h</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-lg font-semibold text-foreground">
                          {day.high}°
                        </span>
                        <span className="text-lg text-muted-foreground">
                          {day.low}°
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="apple-card p-6 text-center">
            <Thermometer className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-xs text-muted-foreground mb-1">Feels Like</div>
            <div className="text-2xl font-semibold text-foreground">24°</div>
          </Card>
          
          <Card className="apple-card p-6 text-center">
            <Wind className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-xs text-muted-foreground mb-1">Wind Speed</div>
            <div className="text-2xl font-semibold text-foreground">15 km/h</div>
          </Card>
          
          <Card className="apple-card p-6 text-center">
            <Droplets className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-xs text-muted-foreground mb-1">Humidity</div>
            <div className="text-2xl font-semibold text-foreground">65%</div>
          </Card>
          
          <Card className="apple-card p-6 text-center">
            <Eye className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-xs text-muted-foreground mb-1">Visibility</div>
            <div className="text-2xl font-semibold text-foreground">10 km</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForecastPage;