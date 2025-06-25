
export type UserRole = 'seeker' | 'helper' | 'admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  photoURL?: string;
  roles: UserRole[];
  currentRole: UserRole;
  locationLat: number;
  locationLng: number;
  anonymityLevel: 'none' | 'partial' | 'full';
  verificationStatus: 'pending' | 'verified';
  disabilities?: string;
  financialStatus?: string;
  healthStatus?: string;
  populationGroup?: string;
  gender?: string;
  availability?: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  pushWindowStart: string;
  pushWindowEnd: string;
  createdAt: Date;
}

// Demo users for testing
const demoUsers: User[] = [
  {
    id: '1',
    fullName: 'Sarah Cohen',
    email: 'seeker@demo.com',
    phone: '+972-50-123-4567',
    roles: ['seeker', 'helper'],
    currentRole: 'seeker',
    locationLat: 32.0853,
    locationLng: 34.7818,
    anonymityLevel: 'partial',
    verificationStatus: 'verified',
    populationGroup: 'elderly',
    pushWindowStart: '08:00',
    pushWindowEnd: '20:00',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    fullName: 'David Levi',
    email: 'helper@demo.com',
    phone: '+972-50-234-5678',
    roles: ['helper'],
    currentRole: 'helper',
    locationLat: 32.0853,
    locationLng: 34.7818,
    anonymityLevel: 'none',
    verificationStatus: 'verified',
    availability: {
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      startTime: '09:00',
      endTime: '17:00'
    },
    pushWindowStart: '07:00',
    pushWindowEnd: '22:00',
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    fullName: 'Admin User',
    email: 'admin@demo.com',
    phone: '+972-50-345-6789',
    roles: ['admin', 'helper'],
    currentRole: 'admin',
    locationLat: 32.0853,
    locationLng: 34.7818,
    anonymityLevel: 'none',
    verificationStatus: 'verified',
    pushWindowStart: '08:00',
    pushWindowEnd: '22:00',
    createdAt: new Date('2024-01-01')
  }
];

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = demoUsers.find(u => u.email === email);
  if (user && password === 'demo123') {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  return null;
};

export const createUser = async (userData: any): Promise<User | null> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const newUser: User = {
    id: Date.now().toString(),
    fullName: userData.fullName,
    email: userData.email,
    phone: userData.phone,
    roles: userData.roles,
    currentRole: userData.roles[0],
    locationLat: userData.locationLat,
    locationLng: userData.locationLng,
    anonymityLevel: userData.anonymityLevel,
    verificationStatus: 'pending',
    disabilities: userData.disabilities,
    populationGroup: userData.populationGroup,
    availability: userData.availability,
    pushWindowStart: userData.pushWindowStart,
    pushWindowEnd: userData.pushWindowEnd,
    createdAt: new Date()
  };
  
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return newUser;
};

export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('currentUser');
};

export const logout = (): void => {
  localStorage.removeItem('currentUser');
};
