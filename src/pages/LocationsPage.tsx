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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="apple-hero-title text-4xl">Locations</h1>
            <Button className="apple-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </div>
          <p className="apple-subtitle">Manage your weather locations</p>
        </div>

        {/* Search */}
        <Card className="apple-card p-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Search Locations</h2>
            <div className="relative">
              <Input
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80"
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </Card>

        {/* Current Location */}
        <Card className="apple-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Navigation className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Current Location</h3>
                <p className="text-sm text-muted-foreground">Use device location</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-foreground">22°</div>
              <div className="text-sm text-muted-foreground">Partly Cloudy</div>
            </div>
          </div>
        </Card>

        {/* Favorite Locations */}
        {favoriteLocations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center">
              <Star className="w-5 h-5 mr-2 text-amber-500" />
              Favorites
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteLocations.map((location) => (
                <Card key={location.id} className="apple-card p-6 hover:shadow-lg transition-all duration-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{location.name}</h3>
                        <p className="text-sm text-muted-foreground">{location.country}</p>
                      </div>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Favorite
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{getWeatherIcon(location.condition)}</span>
                        <div>
                          <div className="text-2xl font-semibold text-foreground">
                            {location.temperature}°
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {location.condition}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(location.id)}
                          className="p-2 hover:bg-amber-100"
                        >
                          <Star className="w-4 h-4 text-amber-500 fill-current" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLocation(location.id)}
                          className="p-2 hover:bg-red-100 text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Locations */}
        {otherLocations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">All Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherLocations.map((location) => (
                <Card key={location.id} className="apple-card p-6 hover:shadow-lg transition-all duration-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{location.name}</h3>
                        <p className="text-sm text-muted-foreground">{location.country}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{getWeatherIcon(location.condition)}</span>
                        <div>
                          <div className="text-2xl font-semibold text-foreground">
                            {location.temperature}°
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {location.condition}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(location.id)}
                          className="p-2 hover:bg-amber-100"
                        >
                          <Star className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLocation(location.id)}
                          className="p-2 hover:bg-red-100 text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
