import React, { createContext, useContext, useState, useCallback } from 'react';

interface Translation {
  [key: string]: string | Translation;
}

interface LanguageContextProps {
  language: 'en' | 'he';
  setLanguage: (lang: 'en' | 'he') => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

const translations: { [key: string]: Translation } = {
  en: {
    app: {
      name: 'Volunteer App',
      logout: 'Logout',
    },
    common: {
      save: 'Save',
      saving: 'Saving...',
      cancel: 'Cancel',
    },
    nav: {
      home: 'Home',
      requests: 'My Requests',
      help_feed: 'Help Feed',
      profile: 'My Profile',
      admin: 'Admin Panel',
      need_help: 'I need help',
      want_to_help: 'I want to help',
    },
    role: {
      need_help: 'I need help',
      want_to_help: 'I want to help',
      admin: 'Admin',
    },
    validation: {
      error: 'Error',
      name_min_length: 'Name must be at least 2 characters',
      email_required: 'Email is required',
      email_invalid: 'Invalid email address',
      phone_required: 'Phone is required',
      phone_invalid: 'Invalid phone number',
      password_required: 'Password is required',
      password_min_length: 'Password must be at least 6 characters',
      roles_required: 'Please select at least one role',
    },
    signup: {
      title: 'Create an Account',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      password: 'Password',
      roles: 'I am a...',
      seeker: 'I need help',
      helper: 'I want to help',
      location: 'Location',
      anonymity: 'Anonymity Level',
      anonymous_info: 'Choose how much info to share',
      disabilities: 'Disabilities (optional)',
      population_group: 'Population Group',
      availability: 'Availability',
      push_window: 'Push Notification Window',
      create_account: 'Create Account',
      already_have_account: 'Already have an account?',
      login: 'Log In',
    },
    login: {
      title: 'Log In',
      email: 'Email Address',
      password: 'Password',
      remember_me: 'Remember Me',
      forgot_password: 'Forgot Password?',
      no_account: 'Don\'t have an account?',
      signup: 'Sign Up',
    },
    helper_settings: {
      title: 'Helper Settings',
      profile: 'Profile Information',
      upload_photo: 'Upload Photo',
      photo_updated: 'Photo Updated',
      photo_saved: 'Profile photo has been saved',
      photo_requirements: 'JPG or PNG, max 1MB',
      invalid_file_type: 'Please select a valid image file (JPG or PNG)',
      file_too_large: 'File is too large. Please select an image under 1MB',
      upload_error: 'Failed to upload photo. Please try again',
      display_name: 'Display Name',
      name_placeholder: 'Enter your full name',
      privacy_level: 'Privacy Level',
      public: 'Show full name and photo',
      nickname_only: 'Show only first name',
      anonymous: 'Keep me completely anonymous',
      availability: 'When I\'m Available',
      add_slot: 'Add Time Slot',
      invalid_time_range: 'End time must be after start time',
      quiet_hours: 'Do Not Disturb Hours',
      quiet_start: 'From',
      quiet_end: 'Until',
      skills: 'What I Can Help With',
      skills_required: 'Please select at least one skill',
      target_populations: 'Who I Want to Help',
      settings_updated: 'Settings Updated',
      changes_saved: 'Your changes have been saved successfully',
      save_error: 'Failed to save settings. Please try again'
    },
  },
  he: {
    app: {
      name: 'אפליקציית התנדבות',
      logout: 'התנתק',
    },
    common: {
      save: 'שמור',
      saving: 'שומר...',
      cancel: 'בטל',
    },
    nav: {
      home: 'בית',
      requests: 'הבקשות שלי',
      help_feed: 'פיד עזרה',
      profile: 'הפרופיל שלי',
      admin: 'פאנל ניהול',
      need_help: 'אני צריך עזרה',
      want_to_help: 'אני רוצה לעזור',
    },
    role: {
      need_help: 'אני צריך עזרה',
      want_to_help: 'אני רוצה לעזור',
      admin: 'מנהל',
    },
    validation: {
      error: 'שגיאה',
      name_min_length: 'השם חייב להיות לפחות 2 תווים',
      email_required: 'דוא"ל נדרש',
      email_invalid: 'כתובת דוא"ל לא חוקית',
      phone_required: 'טלפון נדרש',
      phone_invalid: 'מספר טלפון לא חוקי',
      password_required: 'סיסמה נדרשת',
      password_min_length: 'הסיסמה חייבת להיות לפחות 6 תווים',
      roles_required: 'אנא בחר לפחות תפקיד אחד',
    },
    signup: {
      title: 'צור חשבון',
      name: 'שם מלא',
      email: 'כתובת דוא"ל',
      phone: 'מספר טלפון',
      password: 'סיסמה',
      roles: 'אני...',
      seeker: 'אני צריך עזרה',
      helper: 'אני רוצה לעזור',
      location: 'מיקום',
      anonymity: 'רמת אנונימיות',
      anonymous_info: 'בחר כמה מידע לשתף',
      disabilities: 'מוגבלויות (אופציונלי)',
      population_group: 'קבוצת אוכלוסייה',
      availability: 'זמינות',
      push_window: 'חלון הודעות Push',
      create_account: 'צור חשבון',
      already_have_account: 'כבר יש לך חשבון?',
      login: 'התחבר',
    },
    login: {
      title: 'התחבר',
      email: 'כתובת דוא"ל',
      password: 'סיסמה',
      remember_me: 'זכור אותי',
      forgot_password: 'שכחת סיסמה?',
      no_account: 'אין לך חשבון?',
      signup: 'הרשם',
    },
    helper_settings: {
      title: 'הגדרות נותן עזרה',
      profile: 'פרטים אישיים',
      upload_photo: 'העלה תמונה',
      photo_updated: 'התמונה עודכנה',
      photo_saved: 'תמונת הפרופיל נשמרה בהצלחה',
      photo_requirements: 'JPG או PNG, עד 1MB',
      invalid_file_type: 'אנא בחר קובץ תמונה תקין (JPG או PNG)',
      file_too_large: 'הקובץ גדול מדי. אנא בחר תמונה עד 1MB',
      upload_error: 'העלאת התמונה נכשלה. אנא נסה שוב',
      display_name: 'שם תצוגה',
      name_placeholder: 'הכנס את שמך המלא',
      privacy_level: 'רמת פרטיות',
      public: 'הצג שם מלא ותמונה',
      nickname_only: 'הצג רק שם פרטי',
      anonymous: 'שמור עליי באנונימיות מלאה',
      availability: 'מתי אני זמין',
      add_slot: 'הוסף משבצת זמן',
      invalid_time_range: 'שעת הסיום חייבת להיות אחרי שעת ההתחלה',
      quiet_hours: 'שעות השקט',
      quiet_start: 'מהשעה',
      quiet_end: 'עד השעה',
      skills: 'במה אני יכול לעזור',
      skills_required: 'אנא בחר לפחות כישור אחד',
      target_populations: 'למי אני רוצה לעזור',
      settings_updated: 'ההגדרות עודכנו',
      changes_saved: 'השינויים נשמרו בהצלחה',
      save_error: 'שמירת ההגדרות נכשלה. אנא נסה שוב'
    },
  }
};

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'he'>((localStorage.getItem('language') as 'en' | 'he') || 'en');

  React.useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = useCallback(
    (key: string, params: { [key: string]: string | number } = {}) => {
      let translation = key
        .split('.')
        .reduce((obj: any, i: string) => {
          return obj ? obj[i] : undefined;
        }, translations[language]);

      if (typeof translation !== 'string') {
        console.warn(`Translation not found for key: ${key}`);
        return key;
      }

      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{{${paramKey}}}`, String(paramValue));
      });

      return translation;
    },
    [language]
  );

  const contextValue: LanguageContextProps = {
    language,
    setLanguage: (lang: 'en' | 'he') => {
      setLanguage(lang);
    },
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  return useContext(LanguageContext);
};

export { LanguageProvider, useLanguage };
