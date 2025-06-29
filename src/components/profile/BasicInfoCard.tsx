
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { User as UserType } from '@/lib/auth';
import { useLanguage } from '@/contexts/LanguageContext';

interface BasicInfoCardProps {
  helper: UserType;
}

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({ helper }) => {
  const { t, language } = useLanguage();

  const getVerificationBadge = () => {
    switch (helper.verificationStatus) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">{t('profile.verified')}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">{t('profile.pending')}</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{t('profile.unverified')}</Badge>;
    }
  };

  return (
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
              {t('profile.member_since')} {helper.createdAt.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoCard;
