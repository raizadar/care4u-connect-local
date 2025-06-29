import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCurrentUser, User } from '@/lib/auth';
import { ArrowLeft, Upload, Plus, X, Clock, User as UserIcon, Settings, Heart } from 'lucide-react';

interface AvailabilitySlot {
  id: string;
  dayOfWeek: string;
  timeFrom: string;
  timeTo: string;
}

const HelperSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    photoURL: '',
    anonymityLevel: 'partial' as 'none' | 'partial' | 'full',
    pushWindowStart: '22:00',
    pushWindowEnd: '07:00',
    helperSkills: [] as string[],
    targetGroups: [] as string[]
  });
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);

  // Skills and populations data
  const skills = [
    { id: 'transport', labelEN: 'Transportation', labelHE: 'הסעות' },
    { id: 'shopping', labelEN: 'Shopping', labelHE: 'קניות' },
    { id: 'medical', labelEN: 'Medical Support', labelHE: 'ליווי רפואי' },
    { id: 'tech', labelEN: 'Technology Help', labelHE: 'עזרה טכנולוגית' },
    { id: 'companionship', labelEN: 'Companionship', labelHE: 'חברותא' },
    { id: 'household', labelEN: 'Household Tasks', labelHE: 'עבודות בית' }
  ];

  const populations = [
    { id: 'elderly', labelEN: 'Elderly', labelHE: 'קשישים' },
    { id: 'disabled', labelEN: 'People with Disabilities', labelHE: 'אנשים עם מוגבלות' },
    { id: 'families', labelEN: 'Families in Need', labelHE: 'משפחות במצוקה' },
    { id: 'immigrants', labelEN: 'New Immigrants', labelHE: 'עולים חדשים' },
    { id: 'youth', labelEN: 'Youth at Risk', labelHE: 'נוער במצב סיכון' }
  ];

  const daysOfWeek = [
    { value: 'sunday', labelEN: 'Sunday', labelHE: 'ראשון' },
    { value: 'monday', labelEN: 'Monday', labelHE: 'שני' },
    { value: 'tuesday', labelEN: 'Tuesday', labelHE: 'שלישי' },
    { value: 'wednesday', labelEN: 'Wednesday', labelHE: 'רביעי' },
    { value: 'thursday', labelEN: 'Thursday', labelHE: 'חמישי' },
    { value: 'friday', labelEN: 'Friday', labelHE: 'שישי' },
    { value: 'saturday', labelEN: 'Saturday', labelHE: 'שבת' }
  ];

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (!currentUser.roles.includes('helper')) {
      navigate('/');
      return;
    }

    setUser(currentUser);
    setFormData({
      fullName: currentUser.fullName,
      photoURL: currentUser.photoURL || '',
      anonymityLevel: currentUser.anonymityLevel,
      pushWindowStart: currentUser.pushWindowStart,
      pushWindowEnd: currentUser.pushWindowEnd,
      helperSkills: [],
      targetGroups: []
    });

    // Initialize with default availability slot if none exists
    if (currentUser.availability) {
      const slots = currentUser.availability.days.map((day, index) => ({
        id: `slot-${index}`,
        dayOfWeek: day.toLowerCase(),
        timeFrom: currentUser.availability?.startTime || '18:00',
        timeTo: currentUser.availability?.endTime || '20:00'
      }));
      setAvailabilitySlots(slots);
    } else {
      setAvailabilitySlots([{
        id: 'slot-1',
        dayOfWeek: 'monday',
        timeFrom: '18:00',
        timeTo: '20:00'
      }]);
    }
  }, [navigate]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillToggle = (skillId: string) => {
    setFormData(prev => ({
      ...prev,
      helperSkills: prev.helperSkills.includes(skillId)
        ? prev.helperSkills.filter(id => id !== skillId)
        : [...prev.helperSkills, skillId]
    }));
  };

  const handlePopulationToggle = (popId: string) => {
    setFormData(prev => ({
      ...prev,
      targetGroups: prev.targetGroups.includes(popId)
        ? prev.targetGroups.filter(id => id !== popId)
        : [...prev.targetGroups, popId]
    }));
  };

  const addAvailabilitySlot = () => {
    const newSlot: AvailabilitySlot = {
      id: `slot-${Date.now()}`,
      dayOfWeek: 'monday',
      timeFrom: '18:00',
      timeTo: '20:00'
    };
    setAvailabilitySlots([...availabilitySlots, newSlot]);
  };

  const removeAvailabilitySlot = (id: string) => {
    setAvailabilitySlots(availabilitySlots.filter(slot => slot.id !== id));
  };

  const updateAvailabilitySlot = (id: string, field: string, value: string) => {
    setAvailabilitySlots(availabilitySlots.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const validateForm = () => {
    if (formData.fullName.length < 2) {
      toast({
        title: t('validation.error'),
        description: t('validation.name_min_length'),
        variant: "destructive"
      });
      return false;
    }

    if (formData.helperSkills.length === 0) {
      toast({
        title: t('validation.error'),
        description: t('helper_settings.skills_required'),
        variant: "destructive"
      });
      return false;
    }

    // Validate time slots
    for (const slot of availabilitySlots) {
      if (slot.timeFrom >= slot.timeTo) {
        toast({
          title: t('validation.error'),
          description: t('helper_settings.invalid_time_range'),
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call - in real app this would be updateHelperSettings mutation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data
      if (user) {
        const updatedUser = {
          ...user,
          fullName: formData.fullName,
          photoURL: formData.photoURL,
          anonymityLevel: formData.anonymityLevel,
          pushWindowStart: formData.pushWindowStart,
          pushWindowEnd: formData.pushWindowEnd,
          availability: {
            days: availabilitySlots.map(slot => slot.dayOfWeek),
            startTime: availabilitySlots[0]?.timeFrom || '18:00',
            endTime: availabilitySlots[0]?.timeTo || '20:00'
          }
        };
        
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }

      toast({
        title: "✅ " + t('helper_settings.settings_updated'),
        description: t('helper_settings.changes_saved')
      });

      navigate(-1);
    } catch (error) {
      toast({
        title: t('validation.error'),
        description: t('helper_settings.save_error'),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">{t('helper_settings.title')}</h1>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                {t('helper_settings.profile')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={formData.photoURL} />
                  <AvatarFallback>{formData.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  {t('helper_settings.upload_photo')}
                </Button>
              </div>

              {/* Name */}
              <div>
                <Label htmlFor="fullName">{t('helper_settings.display_name')}</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder={t('helper_settings.name_placeholder')}
                />
              </div>

              {/* Anonymity Level */}
              <div>
                <Label>{t('helper_settings.privacy_level')}</Label>
                <RadioGroup
                  value={formData.anonymityLevel}
                  onValueChange={(value) => handleInputChange('anonymityLevel', value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="public" />
                    <Label htmlFor="public">{t('helper_settings.public')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partial" id="nickname" />
                    <Label htmlFor="nickname">{t('helper_settings.nickname_only')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full" id="anonymous" />
                    <Label htmlFor="anonymous">{t('helper_settings.anonymous')}</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Availability Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {t('helper_settings.availability')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {availabilitySlots.map((slot) => (
                <div key={slot.id} className="flex gap-2 items-center p-3 bg-gray-50 rounded-lg">
                  <Select
                    value={slot.dayOfWeek}
                    onValueChange={(value) => updateAvailabilitySlot(slot.id, 'dayOfWeek', value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {language === 'he' ? day.labelHE : day.labelEN}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Input
                    type="time"
                    value={slot.timeFrom}
                    onChange={(e) => updateAvailabilitySlot(slot.id, 'timeFrom', e.target.value)}
                    className="w-24"
                  />
                  
                  <span className="text-gray-500">-</span>
                  
                  <Input
                    type="time"
                    value={slot.timeTo}
                    onChange={(e) => updateAvailabilitySlot(slot.id, 'timeTo', e.target.value)}
                    className="w-24"
                  />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAvailabilitySlot(slot.id)}
                    disabled={availabilitySlots.length === 1}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              <Button variant="outline" onClick={addAvailabilitySlot} className="w-full">
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
                  <Label htmlFor="quietStart">{t('helper_settings.quiet_start')}</Label>
                  <Input
                    id="quietStart"
                    type="time"
                    value={formData.pushWindowStart}
                    onChange={(e) => handleInputChange('pushWindowStart', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="quietEnd">{t('helper_settings.quiet_end')}</Label>
                  <Input
                    id="quietEnd"
                    type="time"
                    value={formData.pushWindowEnd}
                    onChange={(e) => handleInputChange('pushWindowEnd', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {t('helper_settings.skills')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant={formData.helperSkills.includes(skill.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleSkillToggle(skill.id)}
                  >
                    {language === 'he' ? skill.labelHE : skill.labelEN}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Target Populations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                {t('helper_settings.target_populations')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {populations.map((pop) => (
                  <Badge
                    key={pop.id}
                    variant={formData.targetGroups.includes(pop.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handlePopulationToggle(pop.id)}
                  >
                    {language === 'he' ? pop.labelHE : pop.labelEN}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save/Cancel Buttons */}
          <div className="flex gap-3 sticky bottom-4 bg-white p-4 rounded-lg border shadow-lg">
            <Button 
              onClick={handleSave} 
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? t('common.saving') : t('common.save')}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="flex-1"
            >
              {t('common.cancel')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelperSettings;
