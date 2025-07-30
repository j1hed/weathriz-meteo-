import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import WeatherScene3D from './WeatherScene3D';
import WeatherCard from './WeatherCard';
import useWeather from '@/hooks/useWeather';
import { RefreshCw, MapPin } from 'lucide-react';

const WeatherDashboard = () => {
  const { weather, loading, error, refreshWeather } = useWeather();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-card p-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="text-6xl animate-float">🌤️</div>
            <h2 className="text-2xl font-semibold text-foreground">Loading Weather...</h2>
            <p className="text-muted-foreground">Fetching the latest conditions</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-card p-8 text-center max-w-md">
          <div className="space-y-4">
            <div className="text-6xl">⚠️</div>
            <h2 className="text-xl font-semibold text-foreground">Weather Unavailable</h2>
            <p className="text-muted-foreground">{error || 'Failed to load weather data'}</p>
            <Button onClick={refreshWeather} className="mt-4">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 animate-weather-fade-in">
        <h1 className="text-5xl font-bold text-foreground text-shadow-lg mb-2">
          Weather Universe
        </h1>
        <p className="text-xl text-muted-foreground">
          Experience weather in a new dimension
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* 3D Weather Scene */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              <span className="text-3xl">🌐</span>
              Interactive Weather Scene
            </h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshWeather}
              className="glass-card border-white/30 hover:bg-white/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <Card className="glass-card p-2 overflow-hidden">
            <WeatherScene3D 
              weatherCondition={weather.condition} 
              temperature={weather.temperature}
            />
          </Card>
          
          <p className="text-sm text-muted-foreground text-center">
            🖱️ Drag to explore • 3D scene adapts to weather conditions
          </p>
        </div>

        {/* Weather Information */}
        <div className="space-y-6">
          <WeatherCard weather={weather} />
          
          {/* Additional Weather Info */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="glass-card p-6 text-center">
              <div className="space-y-3">
                <div className="text-4xl animate-pulse-glow">🌡️</div>
                <div className="text-sm text-muted-foreground">Feels Like</div>
                <div className="text-2xl font-bold text-primary">
                  {Math.round(weather.temperature + (Math.random() * 4 - 2))}°
                </div>
              </div>
            </Card>
            
            <Card className="glass-card p-6 text-center">
              <div className="space-y-3">
                <div className="text-4xl animate-drift">👁️</div>
                <div className="text-sm text-muted-foreground">Visibility</div>
                <div className="text-2xl font-bold text-primary">
                  {weather.condition.includes('rain') ? '5' : '10'} km
                </div>
              </div>
            </Card>
          </div>

          {/* Location Info */}
          <Card className="glass-card p-6">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span>Real-time data for {weather.location}</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-8">
        <p className="text-sm text-muted-foreground">
          Powered by advanced 3D weather visualization • Built with React Three Fiber
        </p>
      </div>
    </div>
  );
};

export default WeatherDashboard;