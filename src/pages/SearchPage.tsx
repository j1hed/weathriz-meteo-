import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, TrendingUp, Star, Clock } from 'lucide-react';

interface SearchResult {
  id: string;
  name: string;
  country: string;
  region: string;
  temperature: number;
  condition: string;
  isPopular?: boolean;
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const popularLocations: SearchResult[] = [
    { id: '1', name: 'New York', country: 'United States', region: 'New York', temperature: 22, condition: 'Partly Cloudy', isPopular: true },
    { id: '2', name: 'London', country: 'United Kingdom', region: 'England', temperature: 15, condition: 'Rainy', isPopular: true },
    { id: '3', name: 'Tokyo', country: 'Japan', region: 'Tokyo', temperature: 28, condition: 'Sunny', isPopular: true },
    { id: '4', name: 'Paris', country: 'France', region: 'Île-de-France', temperature: 18, condition: 'Cloudy', isPopular: true },
    { id: '5', name: 'Sydney', country: 'Australia', region: 'New South Wales', temperature: 25, condition: 'Clear', isPopular: true },
    { id: '6', name: 'Dubai', country: 'United Arab Emirates', region: 'Dubai', temperature: 35, condition: 'Sunny', isPopular: true }
  ];

  const recentSearches = [
    'San Francisco',
    'Berlin',
    'Singapore',
    'Vancouver'
  ];

  const mockSearch = (query: string) => {
    setIsSearching(true);
    
    setTimeout(() => {
      if (query.length > 0) {
        const filtered = popularLocations.filter(location =>
          location.name.toLowerCase().includes(query.toLowerCase()) ||
          location.country.toLowerCase().includes(query.toLowerCase()) ||
          location.region.toLowerCase().includes(query.toLowerCase())
        );
        
        // Add some mock results
        const mockResults: SearchResult[] = [
          ...filtered,
          ...(query.length > 2 ? [
            { id: '100', name: query.charAt(0).toUpperCase() + query.slice(1), country: 'Sample Country', region: 'Sample Region', temperature: 20, condition: 'Clear' },
            { id: '101', name: `${query} City`, country: 'Example Country', region: 'Example State', temperature: 23, condition: 'Partly Cloudy' }
          ] : [])
        ];
        
        setSearchResults(mockResults);
      } else {
        setSearchResults([]);
      }
      setIsSearching(false);
    }, 500);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    mockSearch(query);
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain')) return '🌧️';
    if (conditionLower.includes('snow')) return '❄️';
    if (conditionLower.includes('cloud')) return '☁️';
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) return '☀️';
    return '⛅';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="apple-hero-title text-4xl">Search Locations</h1>
          <p className="apple-subtitle">Find weather information for any city worldwide</p>
        </div>

        {/* Search Bar */}
        <Card className="apple-card p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for a city, country, or region..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-white/80 border-0 focus:ring-2 focus:ring-primary/20"
            />
            {isSearching && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            )}
          </div>
        </Card>

        {/* Search Results */}
        {searchQuery.length > 0 && (
          <Card className="apple-card p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Search Results
              </h2>
              
              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map((result) => (
                    <Card 
                      key={result.id} 
                      className="apple-card p-4 hover:shadow-lg transition-all duration-200 cursor-pointer bg-white/60 hover:bg-white/80"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{result.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {result.region}, {result.country}
                            </div>
                          </div>
                          {result.isPopular && (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getWeatherIcon(result.condition)}</span>
                          <div className="text-right">
                            <div className="text-xl font-semibold text-foreground">
                              {result.temperature}°
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {result.condition}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try searching for a different city or location
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Recent Searches */}
        {searchQuery.length === 0 && (
          <Card className="apple-card p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Searches
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start bg-white/60 hover:bg-white/80"
                    onClick={() => handleSearch(search)}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Popular Locations */}
        {searchQuery.length === 0 && (
          <Card className="apple-card p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Popular Locations
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularLocations.map((location) => (
                  <Card 
                    key={location.id} 
                    className="apple-card p-4 hover:shadow-lg transition-all duration-200 cursor-pointer bg-white/60 hover:bg-white/80"
                    onClick={() => handleSearch(location.name)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{location.name}</h3>
                          <p className="text-sm text-muted-foreground">{location.country}</p>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{getWeatherIcon(location.condition)}</span>
                          <div>
                            <div className="text-lg font-semibold text-foreground">
                              {location.temperature}°
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {location.condition}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchPage;