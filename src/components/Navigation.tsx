
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Menu, Home, List, Heart, User, Settings, Globe, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/lib/auth';

interface NavigationProps {
  userRole: UserRole;
  onRoleSwitch: (role: UserRole) => void;
  onShowProfile: () => void;
  onLogout: () => void;
  userRoles?: UserRole[];
}

export const Navigation = ({ userRole, onRoleSwitch, onShowProfile, onLogout, userRoles = [] }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  const handleMenuItemClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="relative"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Menu */}
      <div className={`fixed top-0 ${language === 'he' ? 'right-0' : 'left-0'} h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : language === 'he' ? 'translate-x-full' : '-translate-x-full'
      }`}>
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">{t('nav.home')}</h2>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleMenuItemClick(() => {})}
            >
              <Home className="w-5 h-5 mr-3" />
              {t('nav.home')}
            </Button>

            {userRole === 'seeker' && (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuItemClick(() => {})}
              >
                <List className="w-5 h-5 mr-3" />
                {t('nav.requests')}
              </Button>
            )}

            {userRole === 'helper' && (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuItemClick(() => {})}
              >
                <Heart className="w-5 h-5 mr-3" />
                {t('nav.help_feed')}
              </Button>
            )}

            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleMenuItemClick(onShowProfile)}
            >
              <User className="w-5 h-5 mr-3" />
              {t('nav.profile')}
            </Button>

            {userRoles.includes('admin') && (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMenuItemClick(() => onRoleSwitch('admin'))}
              >
                <Settings className="w-5 h-5 mr-3" />
                {t('nav.admin')}
              </Button>
            )}
          </div>

          {/* Role Switcher */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-medium text-gray-500 mb-3">{t('role.need_help')}</h3>
            <div className="space-y-2">
              <Button
                variant={userRole === 'seeker' ? 'default' : 'outline'}
                size="sm"
                className="w-full"
                onClick={() => handleMenuItemClick(() => onRoleSwitch('seeker'))}
              >
                {t('role.need_help')}
              </Button>
              <Button
                variant={userRole === 'helper' ? 'default' : 'outline'}
                size="sm"
                className="w-full"
                onClick={() => handleMenuItemClick(() => onRoleSwitch('helper'))}
              >
                {t('role.want_to_help')}
              </Button>
              {userRoles.includes('admin') && (
                <Button
                  variant={userRole === 'admin' ? 'default' : 'outline'}
                  size="sm"
                  className="w-full"
                  onClick={() => handleMenuItemClick(() => onRoleSwitch('admin'))}
                >
                  {t('role.admin')}
                </Button>
              )}
            </div>
          </div>

          {/* Language Switcher */}
          <div className="mt-6 pt-6 border-t">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={toggleLanguage}
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'עברית' : 'English'}
            </Button>
          </div>

          {/* Logout */}
          <div className="mt-6 pt-6 border-t">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-red-600 border-red-600 hover:bg-red-50"
              onClick={() => handleMenuItemClick(onLogout)}
            >
              {t('app.logout')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
