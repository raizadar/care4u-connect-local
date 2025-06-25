
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Globe } from 'lucide-react';
import { authenticateUser } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await authenticateUser(email, password);
      if (user) {
        toast({
          title: t('toast.welcome_back'),
          description: t('toast.login_success'),
        });
        navigate('/');
      } else {
        toast({
          title: t('toast.login_failed'),
          description: t('toast.invalid_credentials'),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t('toast.error'),
        description: t('toast.something_wrong'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center flex-1">
              <Heart className="w-8 h-8 text-red-500 mr-2" />
              <CardTitle className="text-2xl">{t('app.title')}</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={toggleLanguage}>
              <Globe className="w-4 h-4 mr-1" />
              {language === 'en' ? 'עב' : 'EN'}
            </Button>
          </div>
          <p className="text-gray-600">{t('login.title')}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t('login.email_placeholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={t('login.password_placeholder')}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('login.signing_in') : t('login.sign_in')}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {t('login.no_account')}{' '}
              <Button variant="link" onClick={() => navigate('/signup')} className="p-0">
                {t('login.sign_up')}
              </Button>
            </p>
          </div>

          <div className="mt-6 border-t pt-4">
            <p className="text-xs text-gray-500 text-center">
              {t('login.demo_accounts')}
            </p>
            <div className="space-y-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => {
                  setEmail('seeker@demo.com');
                  setPassword('demo123');
                }}
              >
                {t('login.demo_seeker')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => {
                  setEmail('helper@demo.com');
                  setPassword('demo123');
                }}
              >
                {t('login.demo_helper')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => {
                  setEmail('admin@demo.com');
                  setPassword('demo123');
                }}
              >
                {t('login.demo_admin')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
