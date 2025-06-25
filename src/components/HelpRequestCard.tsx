
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Heart, MessageCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

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
  isOwner 
}: HelpRequestCardProps) => {
  const [isInterested, setIsInterested] = useState(false);
  const { toast } = useToast();

  const handleInterest = () => {
    setIsInterested(true);
    toast({
      title: "Interest expressed!",
      description: "The person who needs help has been notified.",
    });
  };

  const handleTakeRequest = () => {
    toast({
      title: "Request taken!",
      description: "You've committed to helping. Please contact the person who needs help.",
    });
  };

  const handleChat = () => {
    toast({
      title: "Chat opened",
      description: "You can now chat with the other person.",
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
                {category}
              </Badge>
              <Badge className={getStatusColor(status)}>
                {status}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {distance}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {timeAgo}
          </div>
          {matches > 0 && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {matches} interested
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
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
                {isInterested ? 'Interested' : 'I can help'}
              </Button>
              <Button
                size="sm"
                onClick={handleTakeRequest}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Take Request
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
              Chat
            </Button>
          )}
          {isOwner && status === 'matched' && (
            <Button
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
