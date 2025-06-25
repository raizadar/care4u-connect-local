
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X, MapPin, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateHelpRequestProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const CreateHelpRequest = ({ onClose, onSubmit }: CreateHelpRequestProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subCategory: '',
    isRecurring: false,
    startDateTime: '',
    endDateTime: '',
    locationA: '',
    locationB: '',
    distanceKm: 5,
    weightKg: 0
  });
  const { toast } = useToast();

  const categories = {
    'Shopping': ['Groceries', 'Pharmacy', 'General Shopping', 'Market'],
    'Transportation': ['Medical Appointment', 'Shopping Trip', 'General Transport', 'Airport'],
    'Moving': ['Furniture', 'Boxes', 'Appliances', 'General Moving'],
    'Technology': ['Smartphone', 'Computer', 'Internet', 'General Tech'],
    'Companionship': ['Medical Visit', 'Social Visit', 'Phone Call', 'Walk'],
    'Household': ['Cleaning', 'Repairs', 'Maintenance', 'Organization'],
    'Errands': ['Post Office', 'Bank', 'Government Office', 'General Errands']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Please fill required fields",
        description: "Title, description, and category are required.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Help request created!",
      description: "Your request has been posted and helpers nearby will be notified.",
    });
    
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Create Help Request</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Brief description of what you need help with"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide more details about what you need help with..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value, subCategory: '' })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(categories).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.category && (
              <div className="space-y-2">
                <Label>Subcategory</Label>
                <Select value={formData.subCategory} onValueChange={(value) => setFormData({ ...formData, subCategory: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories[formData.category as keyof typeof categories]?.map((subcat) => (
                      <SelectItem key={subcat} value={subcat}>
                        {subcat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center space-x-2">
              <Checkbox
                checked={formData.isRecurring}
                onCheckedChange={(checked) => setFormData({ ...formData, isRecurring: checked as boolean })}
              />
              <span>This is a recurring request</span>
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDateTime">Start Date & Time</Label>
              <Input
                id="startDateTime"
                type="datetime-local"
                value={formData.startDateTime}
                onChange={(e) => setFormData({ ...formData, startDateTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDateTime">End Date & Time</Label>
              <Input
                id="endDateTime"
                type="datetime-local"
                value={formData.endDateTime}
                onChange={(e) => setFormData({ ...formData, endDateTime: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="locationA">Location</Label>
            <Input
              id="locationA"
              value={formData.locationA}
              onChange={(e) => setFormData({ ...formData, locationA: e.target.value })}
              placeholder="Where do you need help? (e.g., your address, specific location)"
            />
          </div>

          {(formData.category === 'Transportation' || formData.category === 'Moving') && (
            <div className="space-y-2">
              <Label htmlFor="locationB">Destination</Label>
              <Input
                id="locationB"
                value={formData.locationB}
                onChange={(e) => setFormData({ ...formData, locationB: e.target.value })}
                placeholder="Where to? (destination address)"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="distanceKm">Maximum distance (km)</Label>
              <Input
                id="distanceKm"
                type="number"
                min="1"
                max="50"
                value={formData.distanceKm}
                onChange={(e) => setFormData({ ...formData, distanceKm: parseInt(e.target.value) || 5 })}
              />
            </div>
            {formData.category === 'Moving' && (
              <div className="space-y-2">
                <Label htmlFor="weightKg">Approximate weight (kg)</Label>
                <Input
                  id="weightKg"
                  type="number"
                  min="0"
                  value={formData.weightKg}
                  onChange={(e) => setFormData({ ...formData, weightKg: parseInt(e.target.value) || 0 })}
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Create Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
