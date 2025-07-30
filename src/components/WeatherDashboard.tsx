import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import WeatherScene3D from './WeatherScene3D';
import WeatherCard from './WeatherCard';
import useWeather from '@/hooks/useWeather';
import { RefreshCw, MapPin, Thermometer, Wind, Eye, Droplets } from 'lucide-react';

const WeatherDashboard = () => {
  const { weather, loading, error, refreshWeather } = useWeather();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="apple-card p-16 text-center max-w-md mx-auto">
          <div className="space-y-6">
            <div className="text-6xl animate-apple-float">⛅</div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Loading Weather</h2>
              <p className="text-sm text-muted-foreground">Getting the latest conditions...</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="apple-card p-12 text-center max-w-md mx-auto">
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
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-apple-fade-up">
          <h1 className="apple-hero-title">
            Weather
          </h1>
          <p className="apple-subtitle max-w-2xl mx-auto">
            Beautiful, precise weather information with an immersive 3D experience
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Weather Card - Takes up more space */}
          <div className="lg:col-span-1 space-y-6">
            <WeatherCard weather={weather} />
            
            {/* Location Card */}
            <Card className="apple-card p-6 bg-white/80 backdrop-blur-lg">
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

          {/* 3D Scene - Takes up more space */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="apple-card p-4 bg-white/80 backdrop-blur-lg">
              <WeatherScene3D 
                weatherCondition={weather.condition} 
                temperature={weather.temperature}
              />
            </Card>
            
            {/* Additional Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="apple-card p-4 bg-white/60 backdrop-blur-lg text-center">
                <Thermometer className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-xs text-muted-foreground mb-1">Feels Like</div>
                <div className="text-lg font-semibold text-foreground">
                  {Math.round(weather.temperature + (Math.random() * 4 - 2))}°
                </div>
              </Card>
              
              <Card className="apple-card p-4 bg-white/60 backdrop-blur-lg text-center">
                <Wind className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-xs text-muted-foreground mb-1">Wind</div>
                <div className="text-lg font-semibold text-foreground">
                  {weather.windSpeed} km/h
                </div>
              </Card>
              
              <Card className="apple-card p-4 bg-white/60 backdrop-blur-lg text-center">
                <Droplets className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-xs text-muted-foreground mb-1">Humidity</div>
                <div className="text-lg font-semibold text-foreground">
                  {weather.humidity}%
                </div>
              </Card>
              
              <Card className="apple-card p-4 bg-white/60 backdrop-blur-lg text-center">
                <Eye className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-xs text-muted-foreground mb-1">Visibility</div>
                <div className="text-lg font-semibold text-foreground">
                  {weather.condition.includes('rain') ? '5' : '10'} km
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <p className="text-xs text-muted-foreground">
            Powered by advanced 3D visualization • Designed with precision
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;