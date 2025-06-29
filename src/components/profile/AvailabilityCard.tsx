
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { User as UserType } from '@/lib/auth';
import { useLanguage } from '@/contexts/LanguageContext';

interface AvailabilityCardProps {
  helper: UserType;
}

const AvailabilityCard: React.FC<AvailabilityCardProps> = ({ helper }) => {
  const { t } = useLanguage();

  if (!helper.availability) {
    return null;
  }

  return (
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
  );
};

export default AvailabilityCard;
