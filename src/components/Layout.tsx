import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { 
  Satellite, 
  Home, 
  FlaskConical, 
  Box, 
  Database, 
  Bot, 
  Shield, 
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Moon,
  Sun,
  Mic,
  User
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Mission Control', icon: Home, badge: null },
  { id: 'pharma', label: 'Pharma Studio', icon: FlaskConical, badge: '3' },
  { id: 'digital-twin', label: 'Digital Twin', icon: Box, badge: null },
  { id: 'data-hub', label: 'Data Hub', icon: Database, badge: null },
  { id: 'ai-copilot', label: 'AI Copilot', icon: Bot, badge: 'AI' },
  { id: 'sustainability', label: 'Sustainability', icon: Shield, badge: null },
  { id: 'admin', label: 'Admin', icon: Settings, badge: null },
];

export function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      {/* Background starfield */}
      <div className="fixed inset-0 hud-grid opacity-40 pointer-events-none" />
      
      {/* Topbar */}
      <header className="nss-topbar fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center gap-3">
            <Satellite className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-lg font-bold tracking-tight">NSS</h1>
              <p className="text-xs text-muted-foreground">NASA Space Services</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 glass-chip">
            <Search className="h-4 w-4" />
            <span className="text-sm">Search missions...</span>
          </div>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
              2
            </Badge>
          </Button>

          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-4 w-4" />
          </div>

          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Sidebar */}
      <aside 
        className={`nss-sidebar fixed top-16 left-0 bottom-0 z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  isActive 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-primary' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant={item.badge === 'AI' ? 'default' : 'secondary'} 
                    className="ml-auto text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>

        {/* Voice Copilot Quick Access */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button 
            onClick={() => onPageChange('ai-copilot')}
            className="w-full glass-strong justify-start gap-3 p-4"
            variant="ghost"
          >
            <div className="flex items-center justify-center w-10 h-10 glass-chip">
              <Mic className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium">Ask NSS Vibe</p>
              <p className="text-xs text-muted-foreground">Voice & Chat AI</p>
            </div>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={`transition-all duration-300 pt-16 ${
          sidebarOpen ? 'lg:ml-72' : 'ml-0'
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}