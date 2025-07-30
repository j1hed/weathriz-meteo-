import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  Thermometer, 
  Wind, 
  Bell, 
  Palette, 
  Globe, 
  Shield,
  Moon,
  Sun,
  Smartphone
} from 'lucide-react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    temperatureUnit: 'celsius',
    windUnit: 'kmh',
    timeFormat: '24hour',
    notifications: true,
    locationServices: true,
    darkMode: false,
    autoRefresh: true,
    refreshInterval: 5,
    precipitationUnit: 'mm',
    pressureUnit: 'hpa'
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const temperatureOptions = [
    { value: 'celsius', label: 'Celsius (°C)', example: '22°C' },
    { value: 'fahrenheit', label: 'Fahrenheit (°F)', example: '72°F' },
    { value: 'kelvin', label: 'Kelvin (K)', example: '295K' }
  ];

  const windOptions = [
    { value: 'kmh', label: 'Kilometers per hour', example: '15 km/h' },
    { value: 'mph', label: 'Miles per hour', example: '9 mph' },
    { value: 'ms', label: 'Meters per second', example: '4 m/s' },
    { value: 'knots', label: 'Knots', example: '8 kn' }
  ];

  const refreshIntervals = [
    { value: 1, label: '1 minute' },
    { value: 5, label: '5 minutes' },
    { value: 10, label: '10 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="apple-hero-title text-4xl">Settings</h1>
          <p className="apple-subtitle">Customize your weather experience</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Units & Display */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="apple-card p-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Units & Display</h2>
                </div>

                {/* Temperature Unit */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">Temperature Unit</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {temperatureOptions.map((option) => (
                      <Card 
                        key={option.value}
                        className={`apple-card p-3 cursor-pointer transition-all duration-200 ${
                          settings.temperatureUnit === option.value 
                            ? 'bg-primary/10 border-primary/30' 
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                        onClick={() => updateSetting('temperatureUnit', option.value)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-foreground">{option.label}</div>
                            <div className="text-xs text-muted-foreground">{option.example}</div>
                          </div>
                          {settings.temperatureUnit === option.value && (
                            <Badge variant="secondary" className="bg-primary/20 text-primary">
                              Selected
                            </Badge>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Wind Speed Unit */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground">Wind Speed Unit</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {windOptions.map((option) => (
                      <Card 
                        key={option.value}
                        className={`apple-card p-3 cursor-pointer transition-all duration-200 ${
                          settings.windUnit === option.value 
                            ? 'bg-primary/10 border-primary/30' 
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                        onClick={() => updateSetting('windUnit', option.value)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-foreground">{option.label}</div>
                            <div className="text-xs text-muted-foreground">{option.example}</div>
                          </div>
                          {settings.windUnit === option.value && (
                            <Badge variant="secondary" className="bg-primary/20 text-primary">
                              Selected
                            </Badge>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Notifications & Privacy */}
            <Card className="apple-card p-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Notifications & Privacy</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-foreground">Weather Alerts</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive notifications for severe weather conditions
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={(checked) => updateSetting('notifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-foreground">Location Services</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow app to access your location for accurate weather
                      </p>
                    </div>
                    <Switch
                      checked={settings.locationServices}
                      onCheckedChange={(checked) => updateSetting('locationServices', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-foreground">Auto Refresh</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically update weather data
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoRefresh}
                      onCheckedChange={(checked) => updateSetting('autoRefresh', checked)}
                    />
                  </div>

                  {settings.autoRefresh && (
                    <div className="space-y-2 pl-4 border-l-2 border-primary/20">
                      <Label className="text-sm font-medium text-foreground">Refresh Interval</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {refreshIntervals.map((interval) => (
                          <Button
                            key={interval.value}
                            variant={settings.refreshInterval === interval.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateSetting('refreshInterval', interval.value)}
                            className="text-xs"
                          >
                            {interval.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Settings Sidebar */}
          <div className="space-y-6">
            <Card className="apple-card p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {settings.darkMode ? (
                      <Moon className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Sun className="w-4 h-4 text-muted-foreground" />
                    )}
                    <Label className="text-sm font-medium text-foreground">
                      Dark Mode
                    </Label>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Time Format</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={settings.timeFormat === '12hour' ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateSetting('timeFormat', '12hour')}
                      className="text-xs"
                    >
                      12 Hour
                    </Button>
                    <Button
                      variant={settings.timeFormat === '24hour' ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateSetting('timeFormat', '24hour')}
                      className="text-xs"
                    >
                      24 Hour
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="apple-card p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">App Info</h2>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span className="font-medium text-foreground">3.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Build</span>
                    <span className="font-medium text-foreground">2024.1.30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Source</span>
                    <span className="font-medium text-foreground">OpenWeather</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" size="sm">
                  Check for Updates
                </Button>
              </div>
            </Card>

            <Card className="apple-card p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Data & Privacy</h2>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    Privacy Policy
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    Terms of Service
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    Clear Cache
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;