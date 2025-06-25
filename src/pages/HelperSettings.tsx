
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ArrowLeft, Upload, Plus, Trash2, Clock, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, UserRole } from '@/lib/auth';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/components/ui/use-toast';

interface AvailabilitySlot {
  id: string;
  dayOfWeek: string;
  timeFrom: string;
  timeTo: string;
}

interface HelperSettingsData {
  fullName: string;
  photoURL?: string;
  anonymityLevel: number;
  pushWindowStart: string;
  pushWindowEnd: string;
  helperSkills: string[];
  targetGroups: string[];
  availability: AvailabilitySlot[];
}

const SKILLS = [
  { id: 'transport', labelEN: 'Transportation', labelHE: 'הסעות' },
  { id: 'shopping', labelEN: 'Shopping', labelHE: 'קניות' },
  { id: 'tech', labelEN: 'Technology Support', labelHE: 'תמיכה טכנית' },
  { id: 'companion', labelEN: 'Companionship', labelHE: 'ליווי' },
  { id: 'moving', labelEN: 'Moving & Lifting', labelHE: 'העברות והרמה' },
  { id: 'admin', labelEN: 'Administrative Tasks', labelHE: 'משימות משרדיות' },
  { id: 'medical', labelEN: 'Medical Assistance', labelHE: 'עזרה רפואית' },
  { id: 'cleaning', labelEN: 'Cleaning', labelHE: 'ניקיון' }
];

const TARGET_POPULATIONS = [
  { id: 'elderly', labelEN: 'Elderly', labelHE: 'קשישים' },
  { id: 'disabled', labelEN: 'People with Disabilities', labelHE: 'אנשים עם מוגבלויות' },
  { id: 'families', labelEN: 'Families in Need', labelHE: 'משפחות במצוקה' },
  { id: 'students', labelEN: 'Students', labelHE: 'סטודנטים' },
  { id: 'immigrants', labelEN: 'New Immigrants', labelHE: 'עולים חדשים' },
  { id: 'anyone', labelEN: 'Anyone', labelHE: 'כל אחד' }
];

const DAYS_OF_WEEK = [
  { value: 'sunday', labelEN: 'Sunday', labelHE: 'ראשון' },
  { value: 'monday', labelEN: 'Monday', labelHE: 'שני' },
  { value: 'tuesday', labelEN: 'Tuesday', labelHE: 'שלישי' },
  { value: 'wednesday', labelEN: 'Wednesday', labelHE: 'רביעי' },
  { value: 'thursday', labelEN: 'Thursday', labelHE: 'חמישי' },
  { value: 'friday', labelEN: 'Friday', labelHE: 'שישי' },
  { value: 'saturday', labelEN: 'Saturday', labelHE: 'שבת' }
];

const HelperSettings = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [user, setUser] = useState(getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<HelperSettingsData>({
    fullName: user?.fullName || '',
    photoURL: user?.photoURL,
    anonymityLevel: 1,
    pushWindowStart: '22:00',
    pushWindowEnd: '07:00',
    helperSkills: [],
    targetGroups: [],
    availability: [
      { id: '1', dayOfWeek: 'monday', timeFrom: '18:00', timeTo: '20:00' }
    ]
  });

  useEffect(() => {
    // Redirect if user is not a helper
    if (!user?.roles?.includes('helper')) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const handleSaveSettings = async () => {
    if (settings.helperSkills.length === 0) {
      toast({
        title: t('helper_settings.error'),
        description: t('helper_settings.skills_required'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data
      if (user) {
        const updatedUser = {
          ...user,
          fullName: settings.fullName,
          photoURL: settings.photoURL,
          anonymityLevel: settings.anonymityLevel,
          pushWindowStart: settings.pushWindowStart,
          pushWindowEnd: settings.pushWindowEnd,
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }

      toast({
        title: t('helper_settings.success'),
        description: t('helper_settings.settings_updated'),
      });

      // Navigate back after short delay
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      toast({
        title: t('helper_settings.error'),
        description: t('helper_settings.save_failed'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addAvailabilitySlot = () => {
    const newSlot: AvailabilitySlot = {
      id: Date.now().toString(),
      dayOfWeek: 'monday',
      timeFrom: '18:00',
      timeTo: '20:00'
    };
    setSettings(prev => ({
      ...prev,
      availability: [...prev.availability, newSlot]
    }));
  };

  const removeAvailabilitySlot = (id: string) => {
    setSettings(prev => ({
      ...prev,
      availability: prev.availability.filter(slot => slot.id !== id)
    }));
  };

  const updateAvailabilitySlot = (id: string, field: keyof AvailabilitySlot, value: string) => {
    setSettings(prev => ({
      ...prev,
      availability: prev.availability.map(slot =>
        slot.id === id ? { ...slot, [field]: value } : slot
      )
    }));
  };

  const toggleSkill = (skillId: string) => {
    setSettings(prev => ({
      ...prev,
      helperSkills: prev.helperSkills.includes(skillId)
        ? prev.helperSkills.filter(id => id !== skillId)
        : [...prev.helperSkills, skillId]
    }));
  };

  const toggleTargetGroup = (groupId: string) => {
    setSettings(prev => ({
      ...prev,
      targetGroups: prev.targetGroups.includes(groupId)
        ? prev.targetGroups.filter(id => id !== groupId)
        : [...prev.targetGroups, groupId]
    }));
  };

  if (!user?.roles?.includes('helper')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-3"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">
            {t('helper_settings.title')}
          </h1>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                {t('helper_settings.profile')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar Upload */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={settings.photoURL} />
                  <AvatarFallback>
                    {settings.fullName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  {t('helper_settings.upload_photo')}
                </Button>
              </div>

              {/* Display Name */}
              <div>
                <Label>{t('helper_settings.display_name')}</Label>
                <Input
                  value={settings.fullName}
                  onChange={(e) => setSettings(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder={t('helper_settings.enter_name')}
                />
              </div>

              {/* Anonymity Level */}
              <div>
                <Label>{t('helper_settings.privacy_level')}</Label>
                <RadioGroup
                  value={settings.anonymityLevel.toString()}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, anonymityLevel: parseInt(value) }))}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="public" />
                    <Label htmlFor="public">{t('helper_settings.public')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="nickname" />
                    <Label htmlFor="nickname">{t('helper_settings.nickname_only')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="anonymous" />
                    <Label htmlFor="anonymous">{t('helper_settings.anonymous')}</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Availability Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {t('helper_settings.availability')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('helper_settings.day')}</TableHead>
                      <TableHead>{t('helper_settings.from')}</TableHead>
                      <TableHead>{t('helper_settings.to')}</TableHead>
                      <TableHead>{t('helper_settings.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settings.availability.map((slot) => (
                      <TableRow key={slot.id}>
                        <TableCell>
                          <Select 
                            value={slot.dayOfWeek}
                            onValueChange={(value) => updateAvailabilitySlot(slot.id, 'dayOfWeek', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {DAYS_OF_WEEK.map(day => (
                                <SelectItem key={day.value} value={day.value}>
                                  {language === 'he' ? day.labelHE : day.labelEN}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="time"
                            value={slot.timeFrom}
                            onChange={(e) => updateAvailabilitySlot(slot.id, 'timeFrom', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="time"
                            value={slot.timeTo}
                            onChange={(e) => updateAvailabilitySlot(slot.id, 'timeTo', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAvailabilitySlot(slot.id)}
                            disabled={settings.availability.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Button 
                variant="outline" 
                onClick={addAvailabilitySlot}
                className="mt-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('helper_settings.add_slot')}
              </Button>
            </CardContent>
          </Card>

          {/* Quiet Hours */}
          <Card>
            <CardHeader>
              <CardTitle>{t('helper_settings.quiet_hours')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('helper_settings.quiet_start')}</Label>
                  <Input
                    type="time"
                    value={settings.pushWindowStart}
                    onChange={(e) => setSettings(prev => ({ ...prev, pushWindowStart: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>{t('helper_settings.quiet_end')}</Label>
                  <Input
                    type="time"
                    value={settings.pushWindowEnd}
                    onChange={(e) => setSettings(prev => ({ ...prev, pushWindowEnd: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Interests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                {t('helper_settings.skills')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map(skill => (
                  <Badge
                    key={skill.id}
                    variant={settings.helperSkills.includes(skill.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleSkill(skill.id)}
                  >
                    {language === 'he' ? skill.labelHE : skill.labelEN}
                  </Badge>
                ))}
              </div>
              {settings.helperSkills.length === 0 && (
                <p className="text-sm text-red-600 mt-2">
                  {t('helper_settings.skills_required')}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Target Populations */}
          <Card>
            <CardHeader>
              <CardTitle>{t('helper_settings.target_populations')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {TARGET_POPULATIONS.map(group => (
                  <Badge
                    key={group.id}
                    variant={settings.targetGroups.includes(group.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTargetGroup(group.id)}
                  >
                    {language === 'he' ? group.labelHE : group.labelEN}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save/Cancel Buttons */}
        <div className="flex justify-end space-x-4 mt-8 pb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            {t('helper_settings.cancel')}
          </Button>
          <Button 
            onClick={handleSaveSettings}
            disabled={isLoading}
          >
            {isLoading ? t('helper_settings.saving') : t('helper_settings.save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelperSettings;
