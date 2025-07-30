import WeatherScene3D from './WeatherScene3D';
import WeatherCard from './WeatherCard';
import useWeather from '@/hooks/useWeather';
import { RefreshCw, MapPin, Thermometer, Wind, Eye, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const WeatherDashboard = () => {
  const { weather, loading, error, refreshWeather } = useWeather();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="apple-card p-16 text-center max-w-md mx-auto animate-fade-in">
              <div className="space-y-6">
                <div className="text-6xl animate-apple-float">⛅</div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-foreground">Loading Weather</h2>
                  <p className="text-sm text-muted-foreground">Getting the latest conditions...</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="apple-card p-12 text-center max-w-md mx-auto animate-fade-in">
              <div className="space-y-6">
                <div className="text-5xl">⚠️</div>
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-foreground">Unable to Load Weather</h2>
                  <p className="text-sm text-muted-foreground">{error || 'Please try again'}</p>
                  <Button onClick={refreshWeather} className="apple-button mt-4">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative">
      {/* Apple-style gradient bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-pink-300 to-yellow-200 opacity-30 z-10" />
      <div className="container mx-auto px-6 py-12 space-y-12 relative z-20">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <h1 className="apple-hero-title text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
            Today's Weather
          </h1>
          <p className="apple-subtitle max-w-2xl mx-auto text-lg text-muted-foreground">
            Current conditions with an immersive 3D experience
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Weather Card */}
          <div className="lg:col-span-1 space-y-6 animate-fade-in-left">
            <WeatherCard weather={weather} />
            {/* Location Card */}
            <Card className="apple-card p-6 bg-white/80 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{weather.location}</div>
                    <div className="text-xs text-muted-foreground">Current Location</div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={refreshWeather}
                  className="text-primary hover:bg-primary/10"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* 3D Scene */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in-right">
            <Card className="apple-card p-4 bg-white/80 backdrop-blur-lg shadow-xl hover:scale-105 transition-transform duration-500">
              <div className="animate-apple-float">
                <WeatherScene3D 
                  weatherCondition={weather.condition} 
                  temperature={weather.temperature}
                />
              </div>
            </Card>
            {/* Additional Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: <Thermometer className="w-6 h-6 text-primary mx-auto mb-2" />,
                  label: 'Feels Like',
                  value: `${Math.round(weather.temperature + (Math.random() * 4 - 2))}°`
                },
                {
                  icon: <Wind className="w-6 h-6 text-primary mx-auto mb-2" />,
                  label: 'Wind',
                  value: `${weather.windSpeed} km/h`
                },
                {
                  icon: <Droplets className="w-6 h-6 text-primary mx-auto mb-2" />,
                  label: 'Humidity',
                  value: `${weather.humidity}%`
                },
                {
                  icon: <Eye className="w-6 h-6 text-primary mx-auto mb-2" />,
                  label: 'Visibility',
                  value: `${weather.condition.includes('rain') ? '5' : '10'} km`
                }
              ].map((metric, idx) => (
                <Card
                  key={idx}
                  className="apple-card p-4 bg-white/60 backdrop-blur-lg text-center shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  {metric.icon}
                  <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                  <div className="text-lg font-semibold text-foreground">{metric.value}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 animate-fade-in-up">
          <p className="text-xs text-muted-foreground">
            Powered by advanced 3D visualization • Designed with precision
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;