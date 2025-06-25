
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, MapPin, Clock, Star, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserRole, getCurrentUser, isAuthenticated } from '@/lib/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HelpRequestCard } from '@/components/HelpRequestCard';
import { CreateHelpRequest } from '@/components/CreateHelpRequest';
import { UserProfile } from '@/components/UserProfile';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data for interested helpers
const mockInterestedHelpers = [
  { id: '1', name: 'יוסי כהן', rating: 4.8, distance: '0.3 km' },
  { id: '2', name: 'רחל לוי', rating: 4.9, distance: '0.7 km' },
  { id: '3', name: 'דוד ישראלי', rating: 4.6, distance: '1.2 km' }
];

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>('helper');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      if (authenticated) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
        setUserRole(currentUser?.currentRole || 'helper');
      }
    };
    checkAuth();
  }, []);

  const handleRoleSwitch = (role: UserRole) => {
    setUserRole(role);
    if (user) {
      user.currentRole = role;
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
  };

  const handleViewProfile = (profileId: string) => {
    setViewingProfileId(profileId);
    setShowProfile(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-red-500 mr-3" />
              <h1 className="text-4xl font-bold text-gray-800">
                {t('home.hero.title')}
                <span className="text-2xl text-gray-600 mr-2">דואג לך</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleSignup} className="bg-blue-600 hover:bg-blue-700">
                {t('home.get_started')}
              </Button>
              <Button size="lg" variant="outline" onClick={handleLogin}>
                {t('home.sign_in')}
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600">{t('home.stats.today')}</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">8,932</div>
                <div className="text-sm text-gray-600">{t('home.stats.week')}</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-amber-600">45,678</div>
                <div className="text-sm text-gray-600">{t('home.stats.month')}</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">156,789</div>
                <div className="text-sm text-gray-600">{t('home.stats.all_time')}</div>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-6 h-6 mr-2 text-blue-600" />
                  {t('features.need_help.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {t('features.need_help.description')}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>{t('features.need_help.grocery')}</li>
                  <li>{t('features.need_help.transport')}</li>
                  <li>{t('features.need_help.companion')}</li>
                  <li>{t('features.need_help.tech')}</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-red-600" />
                  {t('features.want_help.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {t('features.want_help.description')}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>{t('features.want_help.availability')}</li>
                  <li>{t('features.want_help.skills')}</li>
                  <li>{t('features.want_help.local')}</li>
                  <li>{t('features.want_help.community')}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (showProfile) {
    // If viewing another user's profile
    if (viewingProfileId && viewingProfileId !== user.id) {
      // Mock profile data for other users
      const mockProfile = {
        ...user,
        id: viewingProfileId,
        fullName: mockInterestedHelpers.find(h => h.id === viewingProfileId)?.name || 'Unknown User',
        email: 'helper@example.com',
        verificationStatus: 'verified' as const
      };
      return (
        <UserProfile 
          user={mockProfile} 
          onBack={() => {
            setShowProfile(false);
            setViewingProfileId(null);
          }}
          isViewOnly={true}
        />
      );
    }
    
    // Viewing own profile
    return (
      <UserProfile 
        user={user} 
        onBack={() => setShowProfile(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Navigation
              userRole={userRole}
              onRoleSwitch={handleRoleSwitch}
              onShowProfile={() => setShowProfile(true)}
              onLogout={handleLogout}
              userRoles={user?.roles || []}
            />
            <Heart className="w-8 h-8 text-red-500 mx-2" />
            <h1 className="text-2xl font-bold text-gray-800">{t('app.title')}</h1>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            <Button
              variant={userRole === 'seeker' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleRoleSwitch('seeker')}
              className="rounded-md"
            >
              <Users className="w-4 h-4 mr-2" />
              {t('role.need_help')}
            </Button>
            <Button
              variant={userRole === 'helper' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleRoleSwitch('helper')}
              className="rounded-md"
            >
              <Heart className="w-4 h-4 mr-2" />
              {t('role.want_to_help')}
            </Button>
            {user?.roles?.includes('admin') && (
              <Button
                variant={userRole === 'admin' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleRoleSwitch('admin')}
                className="rounded-md"
              >
                {t('role.admin')}
              </Button>
            )}
          </div>
        </div>

        {/* Content based on role */}
        {userRole === 'seeker' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">{t('seeker.my_requests')}</h2>
              <Button
                onClick={() => setShowCreateRequest(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('seeker.new_request')}
              </Button>
            </div>
            
            {showCreateRequest ? (
              <CreateHelpRequest
                onClose={() => setShowCreateRequest(false)}
                onSubmit={() => setShowCreateRequest(false)}
              />
            ) : (
              <div className="grid gap-4">
                <HelpRequestCard
                  id="1"
                  title="Need help with grocery shopping"
                  description="Looking for someone to help me with weekly grocery shopping. I have mobility issues and would appreciate assistance."
                  category="Shopping"
                  distance="0.5 km"
                  timeAgo="2 hours"
                  status="active"
                  matches={3}
                  isOwner={true}
                  interestedHelpers={mockInterestedHelpers}
                  onViewProfile={handleViewProfile}
                />
                <HelpRequestCard
                  id="2"
                  title="Ride to medical appointment"
                  description="Need transportation to doctor's appointment on Tuesday at 2 PM."
                  category="Transportation"
                  distance="1.2 km"
                  timeAgo="1 day"
                  status="matched"
                  matches={1}
                  isOwner={true}
                  interestedHelpers={[mockInterestedHelpers[0]]}
                  onViewProfile={handleViewProfile}
                />
              </div>
            )}
          </div>
        )}

        {userRole === 'helper' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">{t('helper.help_feed')}</h2>
            <div className="grid gap-4">
              <HelpRequestCard
                id="3"
                title="Help with moving boxes"
                description="Moving to a new apartment and need help carrying boxes up to the 3rd floor. Should take about 2 hours."
                category="Moving"
                distance="0.8 km"
                timeAgo="30 minutes"
                status="active"
                matches={0}
                isOwner={false}
              />
              <HelpRequestCard
                id="4"
                title="Tech support for elderly person"
                description="My grandmother needs help setting up her new smartphone and learning basic functions."
                category="Technology"
                distance="1.5 km"
                timeAgo="1 hour"
                status="active"
                matches={2}
                isOwner={false}
              />
              <HelpRequestCard
                id="5"
                title="Companion for doctor visit"
                description="Looking for someone to accompany me to a medical appointment for moral support."
                category="Companionship"
                distance="2.1 km"
                timeAgo="3 hours"
                status="active"
                matches={1}
                isOwner={false}
              />
            </div>
          </div>
        )}

        {userRole === 'admin' && (
          <AdminDashboard />
        )}
      </div>
    </div>
  );
};

export default Index;
