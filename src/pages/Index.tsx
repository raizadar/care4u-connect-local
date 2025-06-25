
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

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>('helper');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-red-500 mr-3" />
              <h1 className="text-4xl font-bold text-gray-800">
                Care4U
                <span className="text-2xl text-gray-600 mr-2">דואג לך</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connecting people who need help with those who care to help - instantly, locally, and completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleSignup} className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={handleLogin}>
                Sign In
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">1,247</div>
                <div className="text-sm text-gray-600">Helps Today</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">8,932</div>
                <div className="text-sm text-gray-600">This Week</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-amber-600">45,678</div>
                <div className="text-sm text-gray-600">This Month</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">156,789</div>
                <div className="text-sm text-gray-600">All Time</div>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-6 h-6 mr-2 text-blue-600" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Post your request and get matched with nearby volunteers who can assist you.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Grocery shopping & errands</li>
                  <li>• Transportation assistance</li>
                  <li>• Companionship & support</li>
                  <li>• Technical help</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-6 h-6 mr-2 text-red-600" />
                  Want to Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Browse help requests in your area and make a difference in someone's day.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Set your availability</li>
                  <li>• Choose your skills</li>
                  <li>• Get matched locally</li>
                  <li>• Build community</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (showProfile) {
    return <UserProfile user={user} onBack={() => setShowProfile(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-red-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Care4U</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowProfile(true)}
              className="text-gray-600"
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                localStorage.removeItem('currentUser');
                setIsLoggedIn(false);
              }}
              className="text-gray-600"
            >
              Logout
            </Button>
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
              Need Help
            </Button>
            <Button
              variant={userRole === 'helper' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleRoleSwitch('helper')}
              className="rounded-md"
            >
              <Heart className="w-4 h-4 mr-2" />
              Want to Help
            </Button>
            {user?.roles?.includes('admin') && (
              <Button
                variant={userRole === 'admin' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleRoleSwitch('admin')}
                className="rounded-md"
              >
                Admin
              </Button>
            )}
          </div>
        </div>

        {/* Content based on role */}
        {userRole === 'seeker' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">My Requests</h2>
              <Button
                onClick={() => setShowCreateRequest(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Request
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
                  distance="0.5 km away"
                  timeAgo="2 hours ago"
                  status="active"
                  matches={3}
                  isOwner={true}
                />
                <HelpRequestCard
                  id="2"
                  title="Ride to medical appointment"
                  description="Need transportation to doctor's appointment on Tuesday at 2 PM."
                  category="Transportation"
                  distance="1.2 km away"
                  timeAgo="1 day ago"
                  status="matched"
                  matches={1}
                  isOwner={true}
                />
              </div>
            )}
          </div>
        )}

        {userRole === 'helper' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Help Feed</h2>
            <div className="grid gap-4">
              <HelpRequestCard
                id="3"
                title="Help with moving boxes"
                description="Moving to a new apartment and need help carrying boxes up to the 3rd floor. Should take about 2 hours."
                category="Moving"
                distance="0.8 km away"
                timeAgo="30 minutes ago"
                status="active"
                matches={0}
                isOwner={false}
              />
              <HelpRequestCard
                id="4"
                title="Tech support for elderly person"
                description="My grandmother needs help setting up her new smartphone and learning basic functions."
                category="Technology"
                distance="1.5 km away"
                timeAgo="1 hour ago"
                status="active"
                matches={2}
                isOwner={false}
              />
              <HelpRequestCard
                id="5"
                title="Companion for doctor visit"
                description="Looking for someone to accompany me to a medical appointment for moral support."
                category="Companionship"
                distance="2.1 km away"
                timeAgo="3 hours ago"
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
