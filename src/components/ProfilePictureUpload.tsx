
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, Camera, User } from 'lucide-react';

interface ProfilePictureUploadProps {
  currentPhotoURL?: string;
  fullName: string;
  onPhotoChange: (photoURL: string) => void;
}

const ProfilePictureUpload = ({ currentPhotoURL, fullName, onPhotoChange }: ProfilePictureUploadProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: t('validation.error'),
        description: t('helper_settings.invalid_file_type'),
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      toast({
        title: t('validation.error'),
        description: t('helper_settings.file_too_large'),
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    try {
      // Create a data URL for immediate preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target?.result as string;
        onPhotoChange(dataURL);
        toast({
          title: "✅ " + t('helper_settings.photo_updated'),
          description: t('helper_settings.photo_saved')
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: t('validation.error'),
        description: t('helper_settings.upload_error'),
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar className="w-32 h-32 border-4 border-gray-200">
        <AvatarImage src={currentPhotoURL} alt={fullName} />
        <AvatarFallback className="text-2xl">
          {fullName ? fullName.slice(0, 2).toUpperCase() : <User className="w-12 h-12" />}
        </AvatarFallback>
      </Avatar>
      
      <div className="space-y-2">
        <Button 
          variant="outline" 
          onClick={triggerFileSelect}
          disabled={isUploading}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          {isUploading ? t('common.uploading') : t('helper_settings.upload_photo')}
        </Button>
        
        <p className="text-sm text-gray-500">
          {t('helper_settings.photo_requirements')}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePictureUpload;
