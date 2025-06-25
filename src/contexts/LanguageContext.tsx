
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
    
    // Helper Mode
    'helper.help_feed': 'Help Feed',
    
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
    
    // Helper Mode
    'helper.help_feed': 'עזרות זמינות',
    
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
