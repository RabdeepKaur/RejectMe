
import { Button } from '@/app/components/ui/button';
import { MailX } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'ai', label: 'AI Generator' },
    { id: 'templates', label: 'Templates' },
    { id: 'about', label: 'Rate Rejections' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <MailX className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              RejectMe
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                onClick={() => onNavigate(item.id)}
                className={
                  activeSection === item.id 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <select 
              value={activeSection} 
              onChange={(e) => onNavigate(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm text-white"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};
