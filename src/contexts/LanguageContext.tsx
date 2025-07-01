
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
  language: 'he',
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
      title: 'Community Care Network',
      logout: 'Logout',
    },
    common: {
      save: 'Save',
      saving: 'Saving...',
      cancel: 'Cancel',
      edit: 'Edit',
      view: 'View',
      delete: 'Delete',
      add: 'Add',
      remove: 'Remove',
      update: 'Update',
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
    privacy: {
      none: 'Show full name and photo',
      partial: 'Show only first name',
      full: 'Keep me completely anonymous',
    },
    day: {
      Sunday: 'Sunday',
      Monday: 'Monday',
      Tuesday: 'Tuesday',
      Wednesday: 'Wednesday',
      Thursday: 'Thursday',
      Friday: 'Friday',
      Saturday: 'Saturday',
    },
    profile: {
      title: 'Profile',
      full_name: 'Full Name',
      phone: 'Phone',
      privacy_level: 'Privacy Level', 
      basic_info: 'Basic Information',
      history: 'Help History',
      reviews: 'Reviews',
      verified: 'Verified',
      pending: 'Pending Verification',
      unverified: 'Unverified',
      member_since: 'Member since',
      availability: 'Availability',
      available_days: 'Available Days',
      hours: 'Hours',
      activity_stats: 'Activity Statistics',
      helps_given: 'Helps Given',
      helps_received: 'Helps Received',
      average_rating: 'Average Rating',
      community_points: 'Community Points',
      no_reviews: 'No reviews yet',
      cancel: 'Cancel',
      save_changes: 'Save Changes',
    },
    category: {
      Transportation: 'Transportation',
      Shopping: 'Shopping',
      Medical: 'Medical Support',
      Technology: 'Technology',
      Moving: 'Moving',
      Companionship: 'Companionship',
    },
    status: {
      active: 'Active',
      pending: 'Pending',
      completed: 'Completed',
    },
    request: {
      i_can_help: 'I can help',
      take_request: 'Take Request',
      away: 'away',
      ago: 'ago',
      interested: 'interested',
    },
    home: {
      hero: {
        title: 'Community Care Network',
        subtitle: 'Connecting neighbors to help each other with daily tasks and needs'
      },
      get_started: 'Get Started',
      sign_in: 'Sign In',
      stats: {
        today: 'Helped Today',
        week: 'This Week',
        month: 'This Month',
        all_time: 'All Time'
      }
    },
    features: {
      need_help: {
        title: 'Need Help?',
        description: 'Get assistance from verified community members',
        grocery: '• Grocery shopping assistance',
        transport: '• Transportation to appointments',
        companion: '• Companionship and social support',
        tech: '• Technology and digital help'
      },
      want_help: {
        title: 'Want to Help?',
        description: 'Volunteer your time to help others in your community',
        availability: '• Set your availability',
        skills: '• Choose your skills',
        local: '• Help people nearby',
        community: '• Build stronger communities'
      }
    },
    seeker: {
      my_requests: 'My Help Requests',
      new_request: 'New Request'
    },
    helper: {
      help_feed: 'Available Help Requests'
    },
    toast: {
      profile_updated: 'Profile Updated',
      profile_updated_description: 'Your profile has been updated successfully',
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
      title: 'רשת דאגה קהילתית',
      logout: 'התנתק',
    },
    common: {
      save: 'שמור',
      saving: 'שומר...',
      cancel: 'בטל',
      edit: 'ערוך',
      view: 'הצג',
      delete: 'מחק',
      add: 'הוסף',
      remove: 'הסר',
      update: 'עדכן',
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
    privacy: {
      none: 'הצג שם מלא ותמונה',
      partial: 'הצג רק שם פרטי',
      full: 'שמור עליי באנונימיות מלאה',
    },
    day: {
      Sunday: 'ראשון',
      Monday: 'שני',
      Tuesday: 'שלישי',
      Wednesday: 'רביעי',
      Thursday: 'חמישי',
      Friday: 'שישי',
      Saturday: 'שבת',
    },
    profile: {
      title: 'פרופיל',
      full_name: 'שם מלא',
      phone: 'טלפון',
      privacy_level: 'רמת פרטיות',
      basic_info: 'מידע בסיסי',
      history: 'היסטוריית עזרה',
      reviews: 'ביקורות',
      verified: 'מאומת',
      pending: 'ממתין לאימות',
      unverified: 'לא מאומת',
      member_since: 'חבר מאז',
      availability: 'זמינות',
      available_days: 'ימים זמינים',
      hours: 'שעות',
      activity_stats: 'סטטיסטיקות פעילות',
      helps_given: 'עזרות שניתנו',
      helps_received: 'עזרות שהתקבלו',
      average_rating: 'דירוג ממוצע',
      community_points: 'נקודות קהילה',
      no_reviews: 'אין ביקורות עדיין',
      cancel: 'בטל',
      save_changes: 'שמור שינויים',
    },
    category: {
      Transportation: 'הסעות',
      Shopping: 'קניות',
      Medical: 'תמיכה רפואית',
      Technology: 'טכנולוגיה',
      Moving: 'מעבר דירה',
      Companionship: 'חברותא',
    },
    status: {
      active: 'פעיל',
      pending: 'ממתין',
      completed: 'הושלם',
    },
    request: {
      i_can_help: 'אני יכול לעזור',
      take_request: 'קח בקשה',
      away: 'רחוק',
      ago: 'לפני',
      interested: 'מתעניין',
    },
    home: {
      hero: {
        title: 'רשת דאגה קהילתית',
        subtitle: 'מחברים שכנים לעזור זה לזה במשימות ובצרכים יומיומיים'
      },
      get_started: 'התחל עכשיו',
      sign_in: 'התחבר',
      stats: {
        today: 'עזרו היום',
        week: 'השבוע',
        month: 'החודש',
        all_time: 'מאז ההתחלה'
      }
    },
    features: {
      need_help: {
        title: 'צריך עזרה?',
        description: 'קבל סיוע מחברי קהילה מאומתים',
        grocery: '• עזרה בקניות מכולת',
        transport: '• הסעות לתורים רפואיים',
        companion: '• חברותא ותמיכה חברתית',
        tech: '• עזרה טכנולוגית ודיגיטלית'
      },
      want_help: {
        title: 'רוצה לעזור?',
        description: 'התנדב עם הזמן שלך לעזור לאחרים בקהילה שלך',
        availability: '• קבע את הזמינות שלך',
        skills: '• בחר את הכישורים שלך',
        local: '• עזור לאנשים בקרבת מקום',
        community: '• בנה קהילות חזקות יותר'
      }
    },
    seeker: {
      my_requests: 'בקשות העזרה שלי',
      new_request: 'בקשה חדשה'
    },
    helper: {
      help_feed: 'בקשות עזרה זמינות'
    },
    toast: {
      profile_updated: 'הפרופיל עודכן',
      profile_updated_description: 'הפרופיל שלך עודכן בהצלחה',
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
  const [language, setLanguage] = useState<'en' | 'he'>(() => {
    try {
      const savedLanguage = localStorage.getItem('language') as 'en' | 'he';
      return savedLanguage || 'he';
    } catch {
      return 'he';
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
  }, [language]);

  const t = useCallback(
    (key: string, params: { [key: string]: string | number } = {}) => {
      console.log('Translation requested for key:', key, 'language:', language);
      
      if (!key) {
        console.warn('Empty key provided to translation function');
        return '';
      }

      try {
        const keys = key.split('.');
        let translation: any = translations[language];
        
        for (const k of keys) {
          if (translation && typeof translation === 'object' && k in translation) {
            translation = translation[k];
          } else {
            console.warn(`Translation not found for key: ${key} at segment: ${k}`);
            return key;
          }
        }

        if (typeof translation !== 'string') {
          console.warn(`Translation not found for key: ${key} - result is not a string`);
          return key;
        }

        // Replace parameters in the translation
        let result = translation;
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          result = result.replace(`{{${paramKey}}}`, String(paramValue));
        });

        console.log('Translation found:', result);
        return result;
      } catch (error) {
        console.error('Error in translation function:', error);
        return key;
      }
    },
    [language]
  );

  const contextValue: LanguageContextProps = {
    language,
    setLanguage: (lang: 'en' | 'he') => {
      console.log('Setting language to:', lang);
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
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { LanguageProvider, useLanguage };
