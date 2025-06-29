
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TargetPopulationsCardProps {
  targetGroups: string[];
}

const populationsData = [
  { id: 'elderly', labelEN: 'Elderly', labelHE: 'קשישים' },
  { id: 'disabled', labelEN: 'People with Disabilities', labelHE: 'אנשים עם מוגבלות' },
  { id: 'families', labelEN: 'Families in Need', labelHE: 'משפחות במצוקה' },
  { id: 'immigrants', labelEN: 'New Immigrants', labelHE: 'עולים חדשים' },
  { id: 'youth', labelEN: 'Youth at Risk', labelHE: 'נוער במצב סיכון' }
];

const TargetPopulationsCard: React.FC<TargetPopulationsCardProps> = ({ targetGroups }) => {
  const { t, language } = useLanguage();

  const getPopulationLabel = (popId: string) => {
    const pop = populationsData.find(p => p.id === popId);
    return pop ? (language === 'he' ? pop.labelHE : pop.labelEN) : popId;
  };

  return (
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
  );
};

export default TargetPopulationsCard;
