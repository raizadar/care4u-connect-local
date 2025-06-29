
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SkillsCardProps {
  skills: string[];
}

const skillsData = [
  { id: 'transport_car', labelEN: 'Car rides', labelHE: 'הסעות ברכב' },
  { id: 'transport_medical', labelEN: 'Medical appointments', labelHE: 'ליווי לרופא' },
  { id: 'transport_shopping', labelEN: 'Shopping trips', labelHE: 'הסעות לקניות' },
  { id: 'tech_computer', labelEN: 'Computer help', labelHE: 'עזרה במחשב' },
  { id: 'tech_phone', labelEN: 'Smartphone setup', labelHE: 'הגדרת סמארטפון' },
  { id: 'social_companionship', labelEN: 'Companionship', labelHE: 'חברותא' },
  { id: 'household_cleaning', labelEN: 'Cleaning', labelHE: 'ניקיון' }
];

const SkillsCard: React.FC<SkillsCardProps> = ({ skills }) => {
  const { t, language } = useLanguage();

  const getSkillLabel = (skillId: string) => {
    const skill = skillsData.find(s => s.id === skillId);
    return skill ? (language === 'he' ? skill.labelHE : skill.labelEN) : skillId;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="w-5 h-5 mr-2" />
          {t('helper_settings.skills')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skillId) => (
            <Badge key={skillId} variant="secondary">
              {getSkillLabel(skillId)}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsCard;
