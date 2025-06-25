import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'app.title': 'Care4U',
    'app.logout': 'Logout',
    
    // Home page
    'home.hero.title': 'Community Care Network',
    'home.hero.subtitle': 'Connecting those who need help with those who want to help',
    'home.get_started': 'Get Started',
    'home.sign_in': 'Sign In',
    'home.stats.today': 'helped today',
    'home.stats.week': 'helped this week', 
    'home.stats.month': 'helped this month',
    'home.stats.all_time': 'total help requests',
    
    // Features
    'features.need_help.title': 'Need Help?',
    'features.need_help.description': 'Get assistance from verified community volunteers',
    'features.need_help.grocery': '🛒 Grocery shopping',
    'features.need_help.transport': '🚗 Transportation',
    'features.need_help.companion': '👥 Companionship',
    'features.need_help.tech': '💻 Tech support',
    'features.want_help.title': 'Want to Help?',
    'features.want_help.description': 'Join our community of volunteers and make a difference',
    'features.want_help.availability': '⏰ Set your availability',
    'features.want_help.skills': '🎯 Share your skills',
    'features.want_help.local': '📍 Help locally',
    'features.want_help.community': '❤️ Build community',
    
    // Roles
    'role.need_help': 'Need Help',
    'role.want_to_help': 'Want to Help', 
    'role.admin': 'Admin',
    
    // Navigation
    'nav.home': 'Home',
    'nav.requests': 'My Requests',
    'nav.help_feed': 'Help Feed',
    'nav.profile': 'Profile',
    'nav.admin': 'Admin Panel',
    
    // Seeker
    'seeker.my_requests': 'My Help Requests',
    'seeker.new_request': 'New Request',
    
    // Helper  
    'helper.help_feed': 'Available Help Requests',
    
    // Help Request Card
    'help_request.express_interest': 'Express Interest',
    'help_request.chat': 'Chat',
    'help_request.take': 'Take Request',
    'help_request.interested_helpers': 'Interested Helpers',
    'help_request.view_profile': 'View Profile',
    'help_request.rating': 'Rating',
    'help_request.distance': 'Distance',
    'help_request.matches': 'matches',
    'help_request.active': 'Active',
    'help_request.matched': 'Matched',
    'help_request.completed': 'Completed',
    'help_request.cancelled': 'Cancelled',
    
    // Create Help Request
    'create_request.title': 'Create Help Request',
    'create_request.request_title': 'Title',
    'create_request.request_title_placeholder': 'What help do you need?',
    'create_request.description': 'Description',
    'create_request.description_placeholder': 'Please describe what help you need...',
    'create_request.category': 'Category',
    'create_request.select_category': 'Select a category',
    'create_request.urgency': 'Urgency',
    'create_request.low': 'Low',
    'create_request.medium': 'Medium',
    'create_request.high': 'High',
    'create_request.location': 'Location',
    'create_request.location_placeholder': 'Where do you need help?',
    'create_request.preferred_time': 'Preferred Time',
    'create_request.cancel': 'Cancel',
    'create_request.submit': 'Submit Request',
    
    // User Profile
    'profile.title': 'User Profile',
    'profile.edit_profile': 'Edit Profile',
    'profile.full_name': 'Full Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    'profile.location': 'Location',
    'profile.member_since': 'Member since',
    'profile.verification_status': 'Verification Status',
    'profile.verified': 'Verified',
    'profile.pending': 'Pending',
    'profile.roles': 'Roles',
    'profile.overview': 'Overview',
    'profile.history': 'History',
    'profile.reviews': 'Reviews',
    'profile.help_provided': 'Help Provided',
    'profile.help_received': 'Help Received',
    'profile.average_rating': 'Average Rating',
    'profile.total_reviews': 'Total Reviews',
    'profile.recent_activity': 'Recent Activity',
    'profile.no_activity': 'No recent activity',
    'profile.no_reviews': 'No reviews yet',
    'profile.back': 'Back',
    
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm Password',
    'auth.full_name': 'Full Name',
    'auth.phone': 'Phone',
    'auth.sign_in': 'Sign In',
    'auth.create_account': 'Create Account',
    'auth.have_account': 'Already have an account?',
    'auth.no_account': "Don't have an account?",
    'auth.login_error': 'Invalid email or password',
    'auth.signup_error': 'Failed to create account',
    'auth.signup_success': 'Account created successfully!',

    // Helper Settings
    'helper_settings.title': 'Helper Settings',
    'helper_settings.profile': 'Profile Information',
    'helper_settings.upload_photo': 'Upload Photo',
    'helper_settings.display_name': 'Display Name',
    'helper_settings.enter_name': 'Enter your name',
    'helper_settings.privacy_level': 'Privacy Level',
    'helper_settings.public': 'Public - Show my real name',
    'helper_settings.nickname_only': 'Nickname only - Show first name only',
    'helper_settings.anonymous': 'Anonymous - Don\'t show my name',
    'helper_settings.availability': 'Weekly Availability',
    'helper_settings.day': 'Day',
    'helper_settings.from': 'From',
    'helper_settings.to': 'To',
    'helper_settings.actions': 'Actions',
    'helper_settings.add_slot': 'Add Time Slot',
    'helper_settings.quiet_hours': 'Quiet Hours',
    'helper_settings.quiet_start': 'Start Time',
    'helper_settings.quiet_end': 'End Time',
    'helper_settings.skills': 'Skills & Interests',
    'helper_settings.target_populations': 'Target Populations',
    'helper_settings.cancel': 'Cancel',
    'helper_settings.save': 'Save Settings',
    'helper_settings.saving': 'Saving...',
    'helper_settings.success': 'Success',
    'helper_settings.settings_updated': 'Your helper settings have been updated successfully',
    'helper_settings.error': 'Error',
    'helper_settings.save_failed': 'Failed to save settings. Please check your connection.',
    'helper_settings.skills_required': 'Please select at least one skill',
  },
  he: {
    'app.title': 'דואג לך',
    'app.logout': 'התנתק',
    
    // Home page
    'home.hero.title': 'רשת הדאגה הקהילתית',
    'home.hero.subtitle': 'מחברים בין מי שצריך עזרה למי שרוצה לעזור',
    'home.get_started': 'בואו נתחיל', 
    'home.sign_in': 'התחבר',
    'home.stats.today': 'עזרו היום',
    'home.stats.week': 'עזרו השבוע',
    'home.stats.month': 'עזרו החודש', 
    'home.stats.all_time': 'סה"כ בקשות עזרה',
    
    // Features
    'features.need_help.title': 'צריך עזרה?',
    'features.need_help.description': 'קבל סיוע ממתנדבים מאומתים בקהילה',
    'features.need_help.grocery': '🛒 קניות מכולת',
    'features.need_help.transport': '🚗 הסעות',
    'features.need_help.companion': '👥 ליווי',
    'features.need_help.tech': '💻 תמיכה טכנית',
    'features.want_help.title': 'רוצה לעזור?',
    'features.want_help.description': 'הצטרף לקהילת המתנדבים שלנו ועשה שינוי',
    'features.want_help.availability': '⏰ קבע זמינות',
    'features.want_help.skills': '🎯 שתף כישורים',
    'features.want_help.local': '📍 עזור מקומית',
    'features.want_help.community': '❤️ בנה קהילה',
    
    // Roles
    'role.need_help': 'צריך עזרה',
    'role.want_to_help': 'רוצה לעזור',
    'role.admin': 'מנהל',
    
    // Navigation
    'nav.home': 'בית',
    'nav.requests': 'הבקשות שלי',
    'nav.help_feed': 'פיד עזרה',
    'nav.profile': 'פרופיל',
    'nav.admin': 'פאנל ניהול',
    
    // Seeker
    'seeker.my_requests': 'בקשות העזרה שלי',
    'seeker.new_request': 'בקשה חדשה',
    
    // Helper
    'helper.help_feed': 'בקשות עזרה זמינות',
    
    // Help Request Card
    'help_request.express_interest': 'הבע עניין',
    'help_request.chat': 'צ\'אט',
    'help_request.take': 'קח בקשה',
    'help_request.interested_helpers': 'מתנדבים מעוניינים',
    'help_request.view_profile': 'צפה בפרופיל',
    'help_request.rating': 'דירוג',
    'help_request.distance': 'מרחק',
    'help_request.matches': 'התאמות',
    'help_request.active': 'פעיל',
    'help_request.matched': 'הותאם',
    'help_request.completed': 'הושלם',
    'help_request.cancelled': 'בוטל',
    
    // Create Help Request
    'create_request.title': 'צור בקשת עזרה',
    'create_request.request_title': 'כותרת',
    'create_request.request_title_placeholder': 'איזה עזרה אתה צריך?',
    'create_request.description': 'תיאור',
    'create_request.description_placeholder': 'אנא תאר איזה עזרה אתה צריך...',
    'create_request.category': 'קטגוריה',
    'create_request.select_category': 'בחר קטגוריה',
    'create_request.urgency': 'דחיפות',
    'create_request.low': 'נמוך',
    'create_request.medium': 'בינוני',
    'create_request.high': 'גבוה',
    'create_request.location': 'מיקום',
    'create_request.location_placeholder': 'איפה אתה צריך עזרה?',
    'create_request.preferred_time': 'זמן מועדף',
    'create_request.cancel': 'בטל',
    'create_request.submit': 'שלח בקשה',
    
    // User Profile
    'profile.title': 'פרופיל משתמש',
    'profile.edit_profile': 'ערוך פרופיל',
    'profile.full_name': 'שם מלא',
    'profile.email': 'אימייל',
    'profile.phone': 'טלפון',
    'profile.location': 'מיקום',
    'profile.member_since': 'חבר מאז',
    'profile.verification_status': 'סטטוס אימות',
    'profile.verified': 'מאומת',
    'profile.pending': 'בהמתנה',
    'profile.roles': 'תפקידים',
    'profile.overview': 'סקירה',
    'profile.history': 'היסטוריה',
    'profile.reviews': 'ביקורות',
    'profile.help_provided': 'עזרה שניתנה',
    'profile.help_received': 'עזרה שהתקבלה',
    'profile.average_rating': 'דירוג ממוצע',
    'profile.total_reviews': 'סך הביקורות',
    'profile.recent_activity': 'פעילות אחרונה',
    'profile.no_activity': 'אין פעילות אחרונה',
    'profile.no_reviews': 'אין ביקורות עדיין',
    'profile.back': 'חזור',
    
    // Auth
    'auth.login': 'התחבר',
    'auth.signup': 'הרשם',
    'auth.email': 'אימייל',
    'auth.password': 'סיסמה',
    'auth.confirm_password': 'אשר סיסמה',
    'auth.full_name': 'שם מלא',
    'auth.phone': 'טלפון',
    'auth.sign_in': 'היכנס',
    'auth.create_account': 'צור חשבון',
    'auth.have_account': 'כבר יש לך חשבון?',
    'auth.no_account': 'אין לך חשבון?',
    'auth.login_error': 'אימייל או סיסמה שגויים',
    'auth.signup_error': 'נכשל ביצירת חשבון',
    'auth.signup_success': 'חשבון נוצר בהצלחה!',

    // Helper Settings
    'helper_settings.title': 'הגדרות מתנדב',
    'helper_settings.profile': 'פרטי פרופיל',
    'helper_settings.upload_photo': 'העלה תמונה',
    'helper_settings.display_name': 'שם תצוגה',
    'helper_settings.enter_name': 'הכנס את שמך',
    'helper_settings.privacy_level': 'רמת פרטיות',
    'helper_settings.public': 'ציבורי - הצג את שמי האמיתי',
    'helper_settings.nickname_only': 'כינוי בלבד - הצג רק שם פרטי',
    'helper_settings.anonymous': 'אנונימי - אל תציג את שמי',
    'helper_settings.availability': 'זמינות שבועית',
    'helper_settings.day': 'יום',
    'helper_settings.from': 'מ-',
    'helper_settings.to': 'עד',
    'helper_settings.actions': 'פעולות',
    'helper_settings.add_slot': 'הוסף חלון זמן',
    'helper_settings.quiet_hours': 'שעות שקט',
    'helper_settings.quiet_start': 'שעת התחלה',
    'helper_settings.quiet_end': 'שעת סיום',
    'helper_settings.skills': 'כישורים ותחומי עניין',
    'helper_settings.target_populations': 'אוכלוסיות יעד',
    'helper_settings.cancel': 'בטל',
    'helper_settings.save': 'שמור הגדרות',
    'helper_settings.saving': 'שומר...',
    'helper_settings.success': 'הצלחה',
    'helper_settings.settings_updated': 'הגדרות המתנדב עודכנו בהצלחה',
    'helper_settings.error': 'שגיאה',
    'helper_settings.save_failed': 'נכשל בשמירת ההגדרות. אנא בדוק את הקישור שלך.',
    'helper_settings.skills_required': 'אנא בחר לפחות כישור אחד',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'he' ? 'rtl' : 'ltr'} dir={language === 'he' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
