
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Review {
  id: string;
  reviewer: string;
  reviewerEN: string;
  rating: number;
  date: Date;
  comment: string;
  commentEN: string;
  helpType: string;
  helpTypeEN: string;
}

interface ReviewsCardProps {
  reviews: Review[];
}

const ReviewsCard: React.FC<ReviewsCardProps> = ({ reviews }) => {
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
          <MessageSquare className="w-5 h-5 mr-2" />
          {t('profile.reviews')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium">
                    {language === 'he' ? review.reviewer : review.reviewerEN}
                  </p>
                  <p className="text-sm text-gray-600">
                    {review.date.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')} • {language === 'he' ? review.helpType : review.helpTypeEN}
                  </p>
                </div>
                <div className="flex items-center">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="text-sm text-gray-700">
                "{language === 'he' ? review.comment : review.commentEN}"
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            {t('profile.no_reviews')}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewsCard;
