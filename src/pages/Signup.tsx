
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MapPin, User, Mail, Phone, Lock } from 'lucide-react';
import { createUser } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    locationLat: 32.0853, // Tel Aviv default
    locationLng: 34.7818,
    anonymityLevel: 'partial',
    roles: ['helper'],
    disabilities: '',
    financialStatus: '',
    healthStatus: '',
    populationGroup: '',
    gender: '',
    skills: [],
    availability: {
      days: [],
      startTime: '09:00',
      endTime: '17:00'
    },
    pushWindowStart: '08:00',
    pushWindowEnd: '22:00'
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const user = await createUser(formData);
      if (user) {
        toast({
          title: "Welcome!",
          description: "Your account has been created successfully.",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
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
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-red-500 mr-2" />
            <CardTitle className="text-2xl">Care4U</CardTitle>
          </div>
          <p className="text-gray-600">
            Step {step} of 3 - {step === 1 ? 'Basic Info' : step === 2 ? 'Preferences' : 'Availability'}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    placeholder="Create a password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    placeholder="Confirm your password"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label>I want to:</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.roles.includes('helper')}
                        onCheckedChange={(checked) => {
                          const roles = checked 
                            ? [...formData.roles, 'helper']
                            : formData.roles.filter(r => r !== 'helper');
                          handleInputChange('roles', roles);
                        }}
                      />
                      <span>Help others</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.roles.includes('seeker')}
                        onCheckedChange={(checked) => {
                          const roles = checked 
                            ? [...formData.roles, 'seeker']
                            : formData.roles.filter(r => r !== 'seeker');
                          handleInputChange('roles', roles);
                        }}
                      />
                      <span>Receive help</span>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Privacy Level</Label>
                  <Select value={formData.anonymityLevel} onValueChange={(value) => handleInputChange('anonymityLevel', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Full Profile Visible</SelectItem>
                      <SelectItem value="partial">Partial Anonymity</SelectItem>
                      <SelectItem value="full">Full Anonymity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Population Group (Optional)</Label>
                  <Select value={formData.populationGroup} onValueChange={(value) => handleInputChange('populationGroup', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select if applicable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Not specified</SelectItem>
                      <SelectItem value="elderly">Elderly (65+)</SelectItem>
                      <SelectItem value="disability">Person with disability</SelectItem>
                      <SelectItem value="single-parent">Single parent</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="immigrant">New immigrant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Additional Information (Optional)</Label>
                  <Textarea
                    placeholder="Any specific needs, disabilities, or preferences you'd like to share..."
                    value={formData.disabilities}
                    onChange={(e) => handleInputChange('disabilities', e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label>Preferred Days</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                      <label key={day} className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.availability.days.includes(day)}
                          onCheckedChange={(checked) => {
                            const days = checked 
                              ? [...formData.availability.days, day]
                              : formData.availability.days.filter(d => d !== day);
                            handleInputChange('availability', { ...formData.availability, days });
                          }}
                        />
                        <span className="text-sm">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Available From</Label>
                    <Input
                      type="time"
                      value={formData.availability.startTime}
                      onChange={(e) => handleInputChange('availability', { ...formData.availability, startTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Available Until</Label>
                    <Input
                      type="time"
                      value={formData.availability.endTime}
                      onChange={(e) => handleInputChange('availability', { ...formData.availability, endTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Notifications From</Label>
                    <Input
                      type="time"
                      value={formData.pushWindowStart}
                      onChange={(e) => handleInputChange('pushWindowStart', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Notifications Until</Label>
                    <Input
                      type="time"
                      value={formData.pushWindowEnd}
                      onChange={(e) => handleInputChange('pushWindowEnd', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-4">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : step === 3 ? 'Create Account' : 'Next'}
              </Button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Button variant="link" onClick={() => navigate('/login')} className="p-0">
                Sign in
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
