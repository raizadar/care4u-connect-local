
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Heart, MessageCircle, CheckCircle, Eye } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface HelpRequestCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  distance: string;
  timeAgo: string;
  status: 'active' | 'matched' | 'completed';
  matches: number;
  isOwner: boolean;
  interestedHelpers?: Array<{
    id: string;
    name: string;
    rating: number;
    distance: string;
  }>;
  onViewProfile?: (helperId: string) => void;
}

export const HelpRequestCard = ({ 
  id, 
  title, 
  description, 
  category, 
  distance, 
  timeAgo, 
  status, 
  matches, 
  isOwner,
  interestedHelpers = [],
  onViewProfile
}: HelpRequestCardProps) => {
  const [isInterested, setIsInterested] = useState(false);
  const [showInterestedHelpers, setShowInterestedHelpers] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleInterest = () => {
    setIsInterested(true);
    toast({
      title: t('toast.interest_expressed'),
      description: t('toast.interest_description'),
    });
  };

  const handleTakeRequest = () => {
    toast({
      title: t('toast.request_taken'),
      description: t('toast.request_taken_description'),
    });
  };

  const handleChat = () => {
    toast({
      title: t('toast.chat_opened'),
      description: t('toast.chat_description'),
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'matched': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Shopping': 'bg-purple-100 text-purple-800',
      'Transportation': 'bg-blue-100 text-blue-800',
      'Moving': 'bg-orange-100 text-orange-800',
      'Technology': 'bg-green-100 text-green-800',
      'Companionship': 'bg-pink-100 text-pink-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.default;
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-3">{description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className={getCategoryColor(category)}>
                {t(`category.${category}`)}
              </Badge>
              <Badge className={getStatusColor(status)}>
                {t(`status.${status}`)}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {distance} {t('request.away')}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {t('request.ago')} {timeAgo}
          </div>
          {matches > 0 && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {matches} {t('request.interested')}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Show interested helpers if owner and there are matches */}
        {isOwner && matches > 0 && (
          <div className="mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInterestedHelpers(!showInterestedHelpers)}
              className="w-full mb-2"
            >
              <Eye className="w-4 h-4 mr-2" />
              {t('seeker.interested_helpers')} ({matches})
            </Button>
            
            {showInterestedHelpers && (
              <div className="space-y-2 p-3 bg-gray-50 rounded-md">
                {interestedHelpers.length > 0 ? (
                  interestedHelpers.map((helper) => (
                    <div key={helper.id} className="flex items-center justify-between p-2 bg-white rounded border">
                      <div>
                        <p className="font-medium">{helper.name}</p>
                        <p className="text-sm text-gray-600">
                          ⭐ {helper.rating}/5 • {helper.distance} {t('request.away')}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewProfile?.(helper.id)}
                      >
                        {t('seeker.view_profile')}
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-2">
                    {t('seeker.no_interested')}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          {!isOwner && status === 'active' && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleInterest}
                disabled={isInterested}
                className="flex-1"
              >
                <Heart className="w-4 h-4 mr-2" />
                {isInterested ? t('request.interested') : t('request.i_can_help')}
              </Button>
              <Button
                size="sm"
                onClick={handleTakeRequest}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {t('request.take_request')}
              </Button>
            </>
          )}
          {(isOwner || status === 'matched') && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleChat}
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {t('request.chat')}
            </Button>
          )}
          {isOwner && status === 'matched' && (
            <Button
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {t('request.mark_complete')}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
