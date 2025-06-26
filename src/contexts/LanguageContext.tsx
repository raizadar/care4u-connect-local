
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'app.title': 'Care4U',
    'app.logout': 'Logout',
    'app.profile': 'Profile',
    
    // Navigation
    'nav.home': 'Home',
    'nav.requests': 'My Requests',
    'nav.help_feed': 'Help Feed',
    'nav.profile': 'Profile',
    'nav.admin': 'Admin',
    'nav.language': 'Language',
    
    // Role Switcher
    'role.need_help': 'Need Help',
    'role.want_to_help': 'Want to Help',
    'role.admin': 'Admin',
    
    // Home Page - Not Logged In
    'home.hero.title': 'Care4U',
    'home.hero.subtitle': 'Connecting people who need help with those who care to help - instantly, locally, and completely free.',
    'home.get_started': 'Get Started',
    'home.sign_in': 'Sign In',
    'home.stats.today': 'Helps Today',
    'home.stats.week': 'This Week',
    'home.stats.month': 'This Month',
    'home.stats.all_time': 'All Time',
    
    // Features
    'features.need_help.title': 'Need Help?',
    'features.need_help.description': 'Post your request and get matched with nearby volunteers who can assist you.',
    'features.need_help.grocery': '• Grocery shopping & errands',
    'features.need_help.transport': '• Transportation assistance',
    'features.need_help.companion': '• Companionship & support',
    'features.need_help.tech': '• Technical help',
    
    'features.want_help.title': 'Want to Help?',
    'features.want_help.description': 'Browse help requests in your area and make a difference in someone\'s day.',
    'features.want_help.availability': '• Set your availability',
    'features.want_help.skills': '• Choose your skills',
    'features.want_help.local': '• Get matched locally',
    'features.want_help.community': '• Build community',
    
    // Seeker Mode
    'seeker.my_requests': 'My Requests',
    'seeker.new_request': 'New Request',
    'seeker.interested_helpers': 'Interested Helpers',
    'seeker.view_profile': 'View Profile',
    'seeker.no_interested': 'No one has shown interest yet',
    
    // Helper Mode
    'helper.help_feed': 'Help Feed',
    
    // Help Request Card
    'request.interested': 'interested',
    'request.i_can_help': 'I can help',
    'request.take_request': 'Take Request',
    'request.chat': 'Chat',
    'request.mark_complete': 'Mark Complete',
    'request.away': 'away',
    'request.ago': 'ago',
    'request.hours_ago': 'hours ago',
    'request.minutes_ago': 'minutes ago',
    'request.days_ago': 'days ago',
    
    // Status
    'status.active': 'Active',
    'status.matched': 'Matched',
    'status.completed': 'Completed',
    
    // Categories
    'category.Shopping': 'Shopping',
    'category.Transportation': 'Transportation',
    'category.Moving': 'Moving',
    'category.Technology': 'Technology',
    'category.Companionship': 'Companionship',
    
    // Profile
    'profile.title': 'Profile',
    'profile.basic_info': 'Basic Information',
    'profile.full_name': 'Full Name',
    'profile.phone': 'Phone',
    'profile.privacy_level': 'Privacy Level',
    'profile.member_since': 'Member since',
    'profile.availability': 'Availability',
    'profile.available_days': 'Available Days:',
    'profile.hours': 'Hours:',
    'profile.notifications': 'Notifications:',
    'profile.additional_info': 'Additional Information',
    'profile.population_group': 'Population Group:',
    'profile.special_needs': 'Special Needs:',
    'profile.activity_stats': 'Activity Stats',
    'profile.helps_given': 'Helps Given',
    'profile.helps_received': 'Helps Received',
    'profile.average_rating': 'Average Rating',
    'profile.community_points': 'Community Points',
    'profile.save_changes': 'Save Changes',
    'profile.cancel': 'Cancel',
    'profile.history': 'Help History',
    'profile.reviews': 'Reviews & Ratings',
    'profile.no_reviews': 'No reviews yet',
    'profile.verified': 'Verified',
    'profile.pending': 'Pending',
    'profile.unverified': 'Unverified',
    
    // Days
    'day.Sunday': 'Sunday',
    'day.Monday': 'Monday',
    'day.Tuesday': 'Tuesday',
    'day.Wednesday': 'Wednesday',
    'day.Thursday': 'Thursday',
    'day.Friday': 'Friday',
    'day.Saturday': 'Saturday',
    
    // Privacy Levels
    'privacy.none': 'Full Profile Visible',
    'privacy.partial': 'Partial Anonymity',
    'privacy.full': 'Full Anonymity',
    
    // Login
    'login.title': 'Sign in to your account',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.email_placeholder': 'Enter your email',
    'login.password_placeholder': 'Enter your password',
    'login.sign_in': 'Sign In',
    'login.signing_in': 'Signing in...',
    'login.no_account': 'Don\'t have an account?',
    'login.sign_up': 'Sign up',
    'login.demo_accounts': 'Demo accounts:',
    'login.demo_seeker': 'Demo Seeker',
    'login.demo_helper': 'Demo Helper',
    'login.demo_admin': 'Demo Admin',
    
    // Toast Messages
    'toast.welcome_back': 'Welcome back!',
    'toast.login_success': 'You\'ve been successfully logged in.',
    'toast.login_failed': 'Login failed',
    'toast.invalid_credentials': 'Invalid email or password.',
    'toast.error': 'Error',
    'toast.something_wrong': 'Something went wrong. Please try again.',
    'toast.interest_expressed': 'Interest expressed!',
    'toast.interest_description': 'The person who needs help has been notified.',
    'toast.request_taken': 'Request taken!',
    'toast.request_taken_description': 'You\'ve committed to helping. Please contact the person who needs help.',
    'toast.chat_opened': 'Chat opened',
    'toast.chat_description': 'You can now chat with the other person.',
    'toast.profile_updated': 'Profile updated!',
    'toast.profile_updated_description': 'Your changes have been saved successfully.',
  },
  he: {
    // Header
    'app.title': 'דואג לך',
    'app.logout': 'התנתק',
    'app.profile': 'פרופיל',
    
    // Navigation
    'nav.home': 'בית',
    'nav.requests': 'הבקשות שלי',
    'nav.help_feed': 'עזרות זמינות',
    'nav.profile': 'פרופיל',
    'nav.admin': 'ניהול',
    'nav.language': 'שפה',
    
    // Role Switcher
    'role.need_help': 'צריך עזרה',
    'role.want_to_help': 'רוצה לעזור',
    'role.admin': 'ניהול',
    
    // Home Page - Not Logged In
    'home.hero.title': 'דואג לך',
    'home.hero.subtitle': 'מחבר בין אנשים שצריכים עזרה לאלה שאכפת להם לעזור - מיידי, מקומי וחינם לחלוטין.',
    'home.get_started': 'התחל עכשיו',
    'home.sign_in': 'התחבר',
    'home.stats.today': 'עזרות היום',
    'home.stats.week': 'השבוע',
    'home.stats.month': 'החודש',
    'home.stats.all_time': 'מתמיד',
    
    // Features
    'features.need_help.title': 'צריך עזרה?',
    'features.need_help.description': 'פרסם את הבקשה שלך והתאמה עם מתנדבים בקרבתך שיכולים לסייע לך.',
    'features.need_help.grocery': '• קניות ומשימות',
    'features.need_help.transport': '• סיוע בהסעות',
    'features.need_help.companion': '• ליווי ותמיכה',
    'features.need_help.tech': '• עזרה טכנית',
    
    'features.want_help.title': 'רוצה לעזור?',
    'features.want_help.description': 'עיין בבקשות עזרה באזורך ועשה הבדל ביומו של מישהו.',
    'features.want_help.availability': '• קבע את הזמינות שלך',
    'features.want_help.skills': '• בחר את הכישורים שלך',
    'features.want_help.local': '• התאמה מקומית',
    'features.want_help.community': '• בניית קהילה',
    
    // Seeker Mode
    'seeker.my_requests': 'הבקשות שלי',
    'seeker.new_request': 'בקשה חדשה',
    'seeker.interested_helpers': 'מתנדבים מעוניינים',
    'seeker.view_profile': 'צפה בפרופיל',
    'seeker.no_interested': 'עדיין אף אחד לא הביע עניין',
    
    // Helper Mode
    'helper.help_feed': 'עזרות זמינות',
    
    // Help Request Card
    'request.interested': 'מעוניינים',
    'request.i_can_help': 'אני יכול לעזור',
    'request.take_request': 'קח בקשה',
    'request.chat': 'צ\'אט',
    'request.mark_complete': 'סמן כהושלם',
    'request.away': 'מרחק',
    'request.ago': 'לפני',
    'request.hours_ago': 'שעות',
    'request.minutes_ago': 'דקות',
    'request.days_ago': 'ימים',
    
    // Status
    'status.active': 'פעיל',
    'status.matched': 'הותאם',
    'status.completed': 'הושלם',
    
    // Categories
    'category.Shopping': 'קניות',
    'category.Transportation': 'הסעות',
    'category.Moving': 'העברת דירה',
    'category.Technology': 'טכנולוגיה',
    'category.Companionship': 'ליווי',
    
    // Profile
    'profile.title': 'פרופיל',
    'profile.basic_info': 'מידע בסיסי',
    'profile.full_name': 'שם מלא',
    'profile.phone': 'טלפון',
    'profile.privacy_level': 'רמת פרטיות',
    'profile.member_since': 'חבר מאז',
    'profile.availability': 'זמינות',
    'profile.available_days': 'ימים זמינים:',
    'profile.hours': 'שעות:',
    'profile.notifications': 'התראות:',
    'profile.additional_info': 'מידע נוסף',
    'profile.population_group': 'קבוצת אוכלוסין:',
    'profile.special_needs': 'צרכים מיוחדים:',
    'profile.activity_stats': 'סטטיסטיקות פעילות',
    'profile.helps_given': 'עזרות שנתן',
    'profile.helps_received': 'עזרות שקיבל',
    'profile.average_rating': 'דירוג ממוצע',
    'profile.community_points': 'נקודות קהילה',
    'profile.save_changes': 'שמור שינויים',
    'profile.cancel': 'ביטול',
    'profile.history': 'היסטוריית עזרה',
    'profile.reviews': 'ביקורות ודירוגים',
    'profile.no_reviews': 'עדיין אין ביקורות',
    'profile.verified': 'מאומת',
    'profile.pending': 'בהמתנה',
    'profile.unverified': 'לא מאומת',
    
    // Days
    'day.Sunday': 'ראשון',
    'day.Monday': 'שני',
    'day.Tuesday': 'שלישי',
    'day.Wednesday': 'רביעי',
    'day.Thursday': 'חמישי',
    'day.Friday': 'שישי',
    'day.Saturday': 'שבת',
    
    // Privacy Levels
    'privacy.none': 'פרופיל מלא גלוי',
    'privacy.partial': 'אנונימיות חלקית',
    'privacy.full': 'אנונימיות מלאה',
    
    // Login
    'login.title': 'התחבר לחשבון שלך',
    'login.email': 'אימייל',
    'login.password': 'סיסמה',
    'login.email_placeholder': 'הכנס את האימייל שלך',
    'login.password_placeholder': 'הכנס את הסיסמה שלך',
    'login.sign_in': 'התחבר',
    'login.signing_in': 'מתחבר...',
    'login.no_account': 'אין לך חשבון?',
    'login.sign_up': 'הירשם',
    'login.demo_accounts': 'חשבונות דמו:',
    'login.demo_seeker': 'מבקש עזרה דמו',
    'login.demo_helper': 'מתנדב דמו',
    'login.demo_admin': 'מנהל דמו',
    
    // Toast Messages
    'toast.welcome_back': 'ברוך שובך!',
    'toast.login_success': 'התחברת בהצלחה.',
    'toast.login_failed': 'ההתחברות נכשלה',
    'toast.invalid_credentials': 'אימייל או סיסמה שגויים.',
    'toast.error': 'שגיאה',
    'toast.something_wrong': 'משהו השתבש. אנא נסה שוב.',
    'toast.interest_expressed': 'עניין הובע!',
    'toast.interest_description': 'האדם שצריך עזרה קיבל התראה.',
    'toast.request_taken': 'הבקשה נלקחה!',
    'toast.request_taken_description': 'התחייבת לעזור. אנא צור קשר עם האדם שצריך עזרה.',
    'toast.chat_opened': 'צ\'אט נפתח',
    'toast.chat_description': 'עכשיו אתה יכול לצ\'אט עם האדם השני.',
    'toast.profile_updated': 'הפרופיל עודכן!',
    'toast.profile_updated_description': 'השינויים שלך נשמרו בהצלחה.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'he')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    // Update document direction for Hebrew
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
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
