import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Trash2, Plus, Navigation } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  country: string;
  isFavorite: boolean;
  temperature: number;
  condition: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const LocationsPage = () => {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'New York',
      country: 'United States',
      isFavorite: true,
      temperature: 22,
      condition: 'Partly Cloudy',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: '2',
      name: 'London',
      country: 'United Kingdom',
      isFavorite: false,
      temperature: 15,
      condition: 'Rainy',
      coordinates: { lat: 51.5074, lng: -0.1278 }
    },
    {
      id: '3',
      name: 'Tokyo',
      country: 'Japan',
      isFavorite: true,
      temperature: 28,
      condition: 'Sunny',
      coordinates: { lat: 35.6762, lng: 139.6503 }
    },
    {
      id: '4',
      name: 'Sydney',
      country: 'Australia',
      isFavorite: false,
      temperature: 25,
      condition: 'Clear',
      coordinates: { lat: -33.8688, lng: 151.2093 }
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (id: string) => {
    setLocations(prev => prev.map(loc =>
      loc.id === id ? { ...loc, isFavorite: !loc.isFavorite } : loc
    ));
  };

  const removeLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain')) return '🌧️';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('cloud')) return '☁️';
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return '☀️';
    return '⛅';
  };

  const favoriteLocations = locations.filter(loc => loc.isFavorite);
  const otherLocations = locations.filter(loc => !loc.isFavorite);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-teal-300 to-white opacity-30 z-10" />
      <div className="container mx-auto px-4 py-6 space-y-6 relative z-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 animate-fade-in-up">
          <div>
            <h1 className="apple-hero-title text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-teal-400 to-white bg-clip-text text-transparent drop-shadow-lg">
              Locations
            </h1>
            <p className="apple-subtitle text-base text-muted-foreground">
              Manage your weather locations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 py-2 w-40 bg-white/80 rounded-full text-sm"
            />
            <Button className="apple-button px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 text-white font-semibold shadow hover:scale-105 transition-transform duration-200">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        {/* Current Location */}
        <Card className="apple-card p-4 bg-white/80 backdrop-blur-lg rounded-xl shadow animate-fade-in-right mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Navigation className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Current Location</h3>
                <p className="text-xs text-muted-foreground">Use device location</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-blue-500">22°</div>
              <div className="text-xs text-muted-foreground">Partly Cloudy</div>
            </div>
          </div>
        </Card>

        {/* Favorite Locations */}
        {favoriteLocations.length > 0 && (
          <div className="space-y-2 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-foreground flex items-center">
              <Star className="w-4 h-4 mr-1 text-teal-400" />
              Favorites
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {favoriteLocations.map((location) => (
                <Card key={location.id} className="apple-card p-4 bg-white/70 rounded-lg shadow hover:scale-105 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-500 text-base">{location.name}</h3>
                      <p className="text-xs text-muted-foreground">{location.country}</p>
                    </div>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-800 shadow animate-pulse px-2 py-1 text-xs">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Fav
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getWeatherIcon(location.condition)}</span>
                      <div>
                        <div className="text-lg font-semibold text-blue-500">
                          {location.temperature}°
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {location.condition}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(location.id)}
                        className="p-1 hover:bg-teal-100"
                      >
                        <Star className="w-4 h-4 text-teal-400 fill-current" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLocation(location.id)}
                        className="p-1 hover:bg-blue-100 text-blue-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Locations */}
        {otherLocations.length > 0 && (
          <div className="space-y-2 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-foreground text-center">All Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {otherLocations.map((location) => (
                <Card key={location.id} className="apple-card p-4 bg-white/70 rounded-lg shadow hover:scale-105 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-500 text-base">{location.name}</h3>
                      <p className="text-xs text-muted-foreground">{location.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getWeatherIcon(location.condition)}</span>
                      <div>
                        <div className="text-lg font-semibold text-blue-500">
                          {location.temperature}°
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {location.condition}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(location.id)}
                        className="p-1 hover:bg-teal-100"
                      >
                        <Star className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLocation(location.id)}
                        className="p-1 hover:bg-blue-100 text-blue-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationsPage;
