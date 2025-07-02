
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Clock, MessageSquare, Edit } from 'lucide-react';
import { User as UserType, getCurrentUser } from '@/lib/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import BasicInfoCard from '@/components/profile/BasicInfoCard';
import SkillsCard from '@/components/profile/SkillsCard';
import TargetPopulationsCard from '@/components/profile/TargetPopulationsCard';
import AvailabilityCard from '@/components/profile/AvailabilityCard';
import ActivityStatsCard from '@/components/profile/ActivityStatsCard';
import HelpHistoryCard from '@/components/profile/HelpHistoryCard';
import ReviewsCard from '@/components/profile/ReviewsCard';

interface HelperProfileProps {
  isOwnProfile?: boolean;
}

// Mock helper data for display
const mockHelper: UserType = {
  id: '2',
  fullName: 'דוד לוי',
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
const helperSkills = ['transport_car', 'transport_medical', 'tech_computer', 'social_companionship'];
const targetGroups = ['elderly', 'disabled', 'families'];

// Mock help history
const mockHelpHistory = [
  {
    id: '1',
    title: 'עזרה בקניות מכולת',
    titleEN: 'Help with grocery shopping',
    date: new Date('2024-01-15'),
    rating: 5,
    review: 'אדם מאוד מועיל ואדיב!',
    reviewEN: 'Very helpful and kind person!'
  },
  {
    id: '2',
    title: 'תמיכה טכנית לקשישים',
    titleEN: 'Tech support for elderly',
    date: new Date('2024-01-12'),
    rating: 5,
    review: 'סבלני ובעל ידע!',
    reviewEN: 'Patient and knowledgeable!'
  },
  {
    id: '3',
    title: 'הסעה לתור רפואי',
    titleEN: 'Transportation to medical appointment',
    date: new Date('2024-01-08'),
    rating: 4,
    review: 'אמין והגיע בזמן.',
    reviewEN: 'Reliable and on time.'
  }
];

// Mock reviews
const mockReviews = [
  {
    id: '1',
    reviewer: 'שרה מ.',
    reviewerEN: 'Sarah M.',
    rating: 5,
    date: new Date('2024-01-15'),
    comment: 'אדם מדהים! עזר לי עם קניות כשהייתי חולה. מאוד אכפתי ואמין.',
    commentEN: 'Amazing person! Helped me with grocery shopping when I was sick. Very caring and reliable.',
    helpType: 'קניות',
    helpTypeEN: 'Shopping'
  },
  {
    id: '2',
    reviewer: 'מריה ק.',
    reviewerEN: 'Maria K.',
    rating: 5,
    date: new Date('2024-01-12'),
    comment: 'מאוד סבלנית בעזרה לסבתא שלי עם הטלפון. מומלץ מאוד!',
    commentEN: 'Very patient helping my grandmother with her phone. Highly recommended!',
    helpType: 'טכנולוגיה',
    helpTypeEN: 'Technology'
  },
  {
    id: '3',
    reviewer: 'אברהם ל.',
    reviewerEN: 'Abraham L.',
    rating: 4,
    date: new Date('2024-01-08'),
    comment: 'עזרה טובה בהסעות. הגיע בזמן והיה מאוד מכבד.',
    commentEN: 'Good help with transportation. Showed up on time and was very respectful.',
    helpType: 'הסעות',
    helpTypeEN: 'Transportation'
  }
];

const HelperProfile: React.FC<HelperProfileProps> = ({ isOwnProfile = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'reviews'>('info');
  const [helper, setHelper] = useState<UserType | null>(null);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('HelperProfile: Loading profile...', { isOwnProfile, id });
    
    const initializeProfile = async () => {
      try {
        const user = getCurrentUser();
        console.log('Current user:', user);
        setCurrentUser(user);
        
        if (isOwnProfile || !id) {
          console.log('Loading own profile');
          setHelper(user || mockHelper);
        } else {
          console.log('Loading profile for ID:', id);
          // In a real app, fetch helper data by ID
          setHelper(mockHelper);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setHelper(mockHelper);
      } finally {
        setIsLoading(false);
      }
    };

    initializeProfile();
  }, [id, isOwnProfile]);

  const isOwner = currentUser?.id === helper?.id || isOwnProfile;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50 flex justify-center items-center" dir={language === 'he' ? 'rtl' : 'ltr'}>
        <div className="text-xl text-gray-600">{t('common.loading') || 'טוען...'}</div>
      </div>
    );
  }

  if (!helper) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50 flex justify-center items-center" dir={language === 'he' ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-4">לא נמצא פרופיל</div>
          <Button onClick={() => navigate('/')} variant="outline">
            חזור לדף הבית
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50 p-4" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">
              {isOwner ? t('profile.title') || 'הפרופיל שלי' : `פרופיל - ${helper.fullName}`}
            </h1>
          </div>
          {isOwner && (
            <Button variant="outline" onClick={() => navigate('/helper-settings')}>
              <Edit className="w-4 h-4 mr-2" />
              {t('helper_settings.title') || 'הגדרות'}
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
            {t('profile.basic_info') || 'מידע בסיסי'}
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('history')}
            className="flex-1"
          >
            <Clock className="w-4 h-4 mr-2" />
            {t('profile.history') || 'היסטוריה'}
          </Button>
          <Button
            variant={activeTab === 'reviews' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('reviews')}
            className="flex-1"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {t('profile.reviews') || 'ביקורות'}
          </Button>
        </div>

        <div className="space-y-6">
          {activeTab === 'info' && (
            <>
              <BasicInfoCard helper={helper} />
              <SkillsCard skills={helperSkills} />
              <TargetPopulationsCard targetGroups={targetGroups} />
              <AvailabilityCard helper={helper} />
              <ActivityStatsCard />
            </>
          )}

          {activeTab === 'history' && (
            <HelpHistoryCard history={mockHelpHistory} />
          )}

          {activeTab === 'reviews' && (
            <ReviewsCard reviews={mockReviews} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HelperProfile;
