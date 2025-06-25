
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User, MapPin, Clock, Shield, Star, Edit, Heart, MessageSquare } from 'lucide-react';
import { User as UserType } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface UserProfileProps {
  user: UserType;
  onBack: () => void;
  isViewOnly?: boolean;
}

// Mock data for help history and reviews
const mockHelpHistory = [
  {
    id: '1',
    title: 'Help with grocery shopping',
    date: new Date('2024-01-15'),
    type: 'given',
    rating: 5,
    review: 'Very helpful and kind person!'
  },
  {
    id: '2',
    title: 'Moving assistance',
    date: new Date('2024-01-10'),
    type: 'received',
    rating: 4,
    review: 'Great help, very reliable.'
  },
  {
    id: '3',
    title: 'Tech support for elderly',
    date: new Date('2024-01-05'),
    type: 'given',
    rating: 5,
    review: 'Patient and knowledgeable!'
  }
];

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
    reviewer: 'David L.',
    rating: 4,
    date: new Date('2024-01-10'),
    comment: 'Good help with moving. Showed up on time and worked hard.',
    helpType: 'Moving'
  },
  {
    id: '3',
    reviewer: 'Maria K.',
    rating: 5,
    date: new Date('2024-01-05'),
    comment: 'Very patient helping my grandmother with her phone. Highly recommended!',
    helpType: 'Technology'
  }
];

export const UserProfile = ({ user, onBack, isViewOnly = false }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'reviews'>('info');
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    phone: user.phone,
    anonymityLevel: user.anonymityLevel,
    disabilities: user.disabilities || '',
    populationGroup: user.populationGroup || '',
    pushWindowStart: user.pushWindowStart,
    pushWindowEnd: user.pushWindowEnd,
    availability: user.availability || { days: [], startTime: '09:00', endTime: '17:00' }
  });
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSave = () => {
    toast({
      title: t('toast.profile_updated'),
      description: t('toast.profile_updated_description'),
    });
    setIsEditing(false);
  };

  const getVerificationBadge = () => {
    switch (user.verificationStatus) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">{t('profile.verified')}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">{t('profile.pending')}</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{t('profile.unverified')}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">{t('profile.title')}</h1>
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
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      {t('profile.basic_info')}
                    </CardTitle>
                    {!isViewOnly && (
                      <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Label>{t('profile.full_name')}</Label>
                        <Input
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t('profile.phone')}</Label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t('profile.privacy_level')}</Label>
                        <Select value={formData.anonymityLevel} onValueChange={(value) => setFormData({ ...formData, anonymityLevel: value as any })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">{t('privacy.none')}</SelectItem>
                            <SelectItem value="partial">{t('privacy.partial')}</SelectItem>
                            <SelectItem value="full">{t('privacy.full')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.fullName}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-sm text-gray-600">{user.phone}</p>
                        </div>
                        <div className="text-right">
                          {getVerificationBadge()}
                          <div className="text-sm text-gray-500 mt-1">
                            {t('profile.member_since')} {user.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {user.roles.map((role) => (
                          <Badge key={role} variant="outline">
                            {t(`role.${role === 'seeker' ? 'need_help' : role === 'helper' ? 'want_to_help' : role}`)}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Activity Stats Card */}
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
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-sm text-gray-600">{t('profile.helps_received')}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-600">4.8</div>
                      <div className="text-sm text-gray-600">{t('profile.average_rating')}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">156</div>
                      <div className="text-sm text-gray-600">{t('profile.community_points')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {isEditing && (
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    {t('profile.cancel')}
                  </Button>
                  <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    {t('profile.save_changes')}
                  </Button>
                </div>
              )}
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
                          {help.date.toLocaleDateString()} • 
                          {help.type === 'given' ? (
                            <span className="text-blue-600 ml-1">
                              <Heart className="w-4 h-4 inline mr-1" />
                              {t('profile.helps_given')}
                            </span>
                          ) : (
                            <span className="text-green-600 ml-1">
                              <User className="w-4 h-4 inline mr-1" />
                              {t('profile.helps_received')}
                            </span>
                          )}
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
