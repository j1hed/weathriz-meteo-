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

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-blue-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl" style={{ color: '#3b82f6' }}>🌤️</span>
          <span className="text-lg font-bold text-blue-500">Weather</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-1 px-3 py-1 rounded transition-colors
                    ${active
                      ? 'text-blue-500 border-b-2 border-pink-400 bg-white'
                      : 'text-blue-400 hover:text-pink-400'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-1">
          <Link to="/search">
            <Button variant="ghost" size="sm" className="p-2 text-blue-400 hover:text-pink-400">
              <Search className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/locations">
            <Button variant="ghost" size="sm" className="p-2 text-blue-400 hover:text-pink-400">
              <Plus className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden px-2 pb-2">
        <Card className="apple-card p-1 bg-white/80 backdrop-blur-lg rounded-lg border border-blue-100">
          <div className="flex justify-between">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link key={item.path} to={item.path} className="flex-1">
                  <Button
                    variant="ghost"
                    className={`w-full flex flex-col items-center py-2 px-0 transition-colors
                      ${active
                        ? 'text-blue-500 font-semibold'
                        : 'text-blue-400 hover:text-pink-400'}
                    `}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-pink-400' : 'text-blue-400'}`} />
                    <span className={`text-xs ${active ? 'text-blue-500' : 'text-blue-400'}`}>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </Card>
      </div>
    </header>
  );
};

export default AppHeader;