
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HelpHistoryItem {
  id: string;
  title: string;
  titleEN: string;
  date: Date;
  rating: number;
  review?: string;
  reviewEN?: string;
}

interface HelpHistoryCardProps {
  history: HelpHistoryItem[];
}

const HelpHistoryCard: React.FC<HelpHistoryCardProps> = ({ history }) => {
  const { t, language } = useLanguage();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          {t('profile.history')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {history.map((help) => (
          <div key={help.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-medium">
                  {language === 'he' ? help.title : help.titleEN}
                </h4>
                <p className="text-sm text-gray-600">
                  {help.date.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')}
                </p>
              </div>
              <div className="flex items-center">
                {renderStars(help.rating)}
              </div>
            </div>
            {help.review && (
              <p className="text-sm text-gray-700 italic">
                "{language === 'he' ? help.review : help.reviewEN}"
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default HelpHistoryCard;
