
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ActivityStatsCard: React.FC = () => {
  const { t } = useLanguage();

  return (
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
  );
};

export default ActivityStatsCard;
