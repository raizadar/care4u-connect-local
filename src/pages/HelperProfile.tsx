
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, MapPin, Clock, Shield, Star, Heart, MessageSquare, Edit } from 'lucide-react';
import { User as UserType, getCurrentUser } from '@/lib/auth';
import { useLanguage } from '@/contexts/LanguageContext';

interface HelperProfileProps {
  isOwnProfile?: boolean;
}

// Mock helper data for display
const mockHelper: UserType = {
  id: '2',
  fullName: 'David Levi',
  email: 'helper@demo.com',
  phone: '+972-50-234-5678',
  photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  roles: ['helper'],
  currentRole: 'helper',
  locationLat: 32.0853,
  locationLng: 34.7818,
  anonymityLevel: 'none',
  verificationStatus: 'verified',
  availability: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    startTime: '18:00',
    endTime: '21:00'
  },
  pushWindowStart: '07:00',
  pushWindowEnd: '22:00',
  createdAt: new Date('2024-01-10')
};

// Mock skills and target populations
const helperSkills = ['transport', 'shopping', 'tech', 'companionship'];
const targetGroups = ['elderly', 'disabled', 'families'];

const skillsData = [
  { id: 'transport', labelEN: 'Transportation', labelHE: 'הסעות' },
  { id: 'shopping', labelEN: 'Shopping', labelHE: 'קניות' },
  { id: 'medical', labelEN: 'Medical Support', labelHE: 'ליווי רפואי' },
  { id: 'tech', labelEN: 'Technology Help', labelHE: 'עזרה טכנולוגית' },
  { id: 'companionship', labelEN: 'Companionship', labelHE: 'חברותא' },
  { id: 'household', labelEN: 'Household Tasks', labelHE: 'עבודות בית' }
];

const populationsData = [
  { id: 'elderly', labelEN: 'Elderly', labelHE: 'קשישים' },
  { id: 'disabled', labelEN: 'People with Disabilities', labelHE: 'אנשים עם מוגבלות' },
  { id: 'families', labelEN: 'Families in Need', labelHE: 'משפחות במצוקה' },
  { id: 'immigrants', labelEN: 'New Immigrants', labelHE: 'עולים חדשים' },
  { id: 'youth', labelEN: 'Youth at Risk', labelHE: 'נוער במצב סיכון' }
];

// Mock help history
const mockHelpHistory = [
  {
    id: '1',
    title: 'Help with grocery shopping',
    date: new Date('2024-01-15'),
    rating: 5,
    review: 'Very helpful and kind person!'
  },
  {
    id: '2',
    title: 'Tech support for elderly',
    date: new Date('2024-01-12'),
    rating: 5,
    review: 'Patient and knowledgeable!'
  },
  {
    id: '3',
    title: 'Transportation to medical appointment',
    date: new Date('2024-01-08'),
    rating: 4,
    review: 'Reliable and on time.'
  }
];

// Mock reviews
const mockReviews = [
  {
    id: '1',
    reviewer: 'Sarah M.',
    rating: 5,
    date: new Date('2024-01-15'),
    comment: 'Amazing person! Helped me with grocery shopping when I was sick. Very caring and reliable.',
    helpType: 'Shopping'
  },
  {
    id: '2',
    reviewer: 'Maria K.',
    rating: 5,
    date: new Date('2024-01-12'),
    comment: 'Very patient helping my grandmother with her phone. Highly recommended!',
    helpType: 'Technology'
  },
  {
    id: '3',
    reviewer: 'Abraham L.',
    rating: 4,
    date: new Date('2024-01-08'),
    comment: 'Good help with transportation. Showed up on time and was very respectful.',
    helpType: 'Transportation'
  }
];

const HelperProfile: React.FC<HelperProfileProps> = ({ isOwnProfile = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'reviews'>('info');
  const [helper, setHelper] = useState<UserType | null>(null);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    if (isOwnProfile || id === user?.id) {
      setHelper(user);
    } else {
      // In a real app, fetch helper data by ID
      setHelper(mockHelper);
    }
  }, [id, isOwnProfile]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getSkillLabel = (skillId: string) => {
    const skill = skillsData.find(s => s.id === skillId);
    return skill ? (language === 'he' ? skill.labelHE : skill.labelEN) : skillId;
  };

  const getPopulationLabel = (popId: string) => {
    const pop = populationsData.find(p => p.id === popId);
    return pop ? (language === 'he' ? pop.labelHE : pop.labelEN) : popId;
  };

  const getVerificationBadge = () => {
    if (!helper) return null;
    switch (helper.verificationStatus) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">{t('profile.verified')}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">{t('profile.pending')}</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{t('profile.unverified')}</Badge>;
    }
  };

  const isOwner = currentUser?.id === helper?.id;

  if (!helper) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">
              {isOwner ? t('profile.title') : `${t('profile.title')} - ${helper.fullName}`}
            </h1>
          </div>
          {isOwner && (
            <Button variant="outline" onClick={() => navigate('/helper-settings')}>
              <Edit className="w-4 h-4 mr-2" />
              {t('helper_settings.title')}
            </Button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white rounded-lg p-1 shadow-sm mb-6">
          <Button
            variant={activeTab === 'info' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('info')}
            className="flex-1"
          >
            <User className="w-4 h-4 mr-2" />
            {t('profile.basic_info')}
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('history')}
            className="flex-1"
          >
            <Clock className="w-4 h-4 mr-2" />
            {t('profile.history')}
          </Button>
          <Button
            variant={activeTab === 'reviews' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('reviews')}
            className="flex-1"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {t('profile.reviews')}
          </Button>
        </div>

        <div className="space-y-6">
          {activeTab === 'info' && (
            <>
              {/* Basic Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    {t('profile.basic_info')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={helper.photoURL} />
                      <AvatarFallback>{helper.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{helper.fullName}</h3>
                      <p className="text-gray-600">{helper.email}</p>
                      <p className="text-gray-600">{helper.phone}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {getVerificationBadge()}
                        <Badge variant="outline">
                          {t('role.want_to_help')}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {t('profile.member_since')} {helper.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Interests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    {t('helper_settings.skills')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {helperSkills.map((skillId) => (
                      <Badge key={skillId} variant="secondary">
                        {getSkillLabel(skillId)}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Target Populations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    {t('helper_settings.target_populations')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {targetGroups.map((popId) => (
                      <Badge key={popId} variant="outline">
                        {getPopulationLabel(popId)}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              {helper.availability && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      {t('profile.availability')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>{t('profile.available_days')}</strong></p>
                      <div className="flex flex-wrap gap-2">
                        {helper.availability.days.map((day) => (
                          <Badge key={day} variant="outline">
                            {t(`day.${day}`)}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>{t('profile.hours')}</strong> {helper.availability.startTime} - {helper.availability.endTime}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Activity Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    {t('profile.activity_stats')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-gray-600">{t('profile.helps_given')}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-600">4.8</div>
                      <div className="text-sm text-gray-600">{t('profile.average_rating')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'history' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {t('profile.history')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockHelpHistory.map((help) => (
                  <div key={help.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium">{help.title}</h4>
                        <p className="text-sm text-gray-600">
                          {help.date.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {renderStars(help.rating)}
                      </div>
                    </div>
                    {help.review && (
                      <p className="text-sm text-gray-700 italic">"{help.review}"</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 'reviews' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  {t('profile.reviews')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockReviews.length > 0 ? (
                  mockReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{review.reviewer}</p>
                          <p className="text-sm text-gray-600">
                            {review.date.toLocaleDateString()} • {t(`category.${review.helpType}`)}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">"{review.comment}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    {t('profile.no_reviews')}
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelperProfile;
