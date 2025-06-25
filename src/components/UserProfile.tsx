
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, MapPin, Clock, Shield, Star, Edit } from 'lucide-react';
import { User as UserType } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

interface UserProfileProps {
  user: UserType;
  onBack: () => void;
}

export const UserProfile = ({ user, onBack }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    phone: user.phone,
    anonymityLevel: user.anonymityLevel,
    disabilities: user.disabilities || '',
    populationGroup: user.populationGroup || '',
    pushWindowStart: user.pushWindowStart,
    pushWindowEnd: user.pushWindowEnd,
    availability: user.availability || { days: [], startTime: '09:00', endTime: '17:00' }
  });
  const { toast } = useToast();

  const handleSave = () => {
    // In a real app, this would update the user in the database
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully.",
    });
    setIsEditing(false);
  };

  const getVerificationBadge = () => {
    switch (user.verificationStatus) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unverified</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-amber-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        </div>

        <div className="space-y-6">
          {/* Basic Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Basic Information
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Privacy Level</Label>
                    <Select value={formData.anonymityLevel} onValueChange={(value) => setFormData({ ...formData, anonymityLevel: value as any })}>
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
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{user.fullName}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-600">{user.phone}</p>
                    </div>
                    <div className="text-right">
                      {getVerificationBadge()}
                      <div className="text-sm text-gray-500 mt-1">
                        Member since {user.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {user.roles.map((role) => (
                      <Badge key={role} variant="outline">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Availability Card */}
          {user.roles.includes('helper') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label>Available Days</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                          <label key={day} className="flex items-center space-x-2">
                            <Checkbox
                              checked={formData.availability.days.includes(day)}
                              onCheckedChange={(checked) => {
                                const days = checked 
                                  ? [...formData.availability.days, day]
                                  : formData.availability.days.filter(d => d !== day);
                                setFormData({ ...formData, availability: { ...formData.availability, days } });
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
                          onChange={(e) => setFormData({ ...formData, availability: { ...formData.availability, startTime: e.target.value } })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Available Until</Label>
                        <Input
                          type="time"
                          value={formData.availability.endTime}
                          onChange={(e) => setFormData({ ...formData, availability: { ...formData.availability, endTime: e.target.value } })}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="font-medium mb-2">Available Days:</p>
                      <div className="flex flex-wrap gap-2">
                        {user.availability?.days.map((day) => (
                          <Badge key={day} variant="outline">{day}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">Hours:</p>
                        <p className="text-sm text-gray-600">
                          {user.availability?.startTime} - {user.availability?.endTime}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Notifications:</p>
                        <p className="text-sm text-gray-600">
                          {user.pushWindowStart} - {user.pushWindowEnd}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Additional Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label>Population Group</Label>
                    <Select value={formData.populationGroup} onValueChange={(value) => setFormData({ ...formData, populationGroup: value })}>
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
                    <Label>Special Needs or Preferences</Label>
                    <Textarea
                      value={formData.disabilities}
                      onChange={(e) => setFormData({ ...formData, disabilities: e.target.value })}
                      placeholder="Any specific needs, disabilities, or preferences..."
                    />
                  </div>
                </>
              ) : (
                <>
                  {user.populationGroup && (
                    <div>
                      <p className="font-medium">Population Group:</p>
                      <Badge className="mt-1">{user.populationGroup}</Badge>
                    </div>
                  )}
                  {user.disabilities && (
                    <div>
                      <p className="font-medium">Special Needs:</p>
                      <p className="text-sm text-gray-600 mt-1">{user.disabilities}</p>
                    </div>
                  )}
                  <div>
                    <p className="font-medium">Privacy Level:</p>
                    <Badge className="mt-1">{user.anonymityLevel}</Badge>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Activity Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Helps Given</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-gray-600">Helps Received</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">4.8</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">156</div>
                  <div className="text-sm text-gray-600">Community Points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
