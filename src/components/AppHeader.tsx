import { Home, MapPin, Calendar, Settings, Search, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AppHeader = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Today', path: '/' },
    { icon: Calendar, label: 'Forecast', path: '/forecast' },
    { icon: MapPin, label: 'Locations', path: '/locations' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 apple-blur bg-white/80 border-b border-border/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-2xl">🌤️</div>
            <h1 className="text-xl font-semibold text-foreground">Weather</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Link to="/search">
              <Button variant="ghost" size="sm" className="p-2">
                <Search className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/locations">
              <Button variant="ghost" size="sm" className="p-2">
                <Plus className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4">
          <Card className="apple-card p-2">
            <div className="flex justify-around">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path} className="flex-1">
                    <Button
                      variant="ghost"
                      className={`w-full flex flex-col items-center space-y-1 py-3 ${
                        isActive(item.path)
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;