import { UserRole, Grade, Subject } from '@/types/common';

// App Configuration
export const APP_CONFIG = {
  name: 'MathQuest',
  tagline: 'where math becomes an adventure!',
  version: '1.0.0',
  description: 'An online learning hub for grades 1-5 students'
} as const;

// Grade Levels
export const GRADE_LEVELS: Grade[] = [1, 2, 3, 4, 5];

export const GRADE_NAMES = {
  1: 'Grade 1',
  2: 'Grade 2',
  3: 'Grade 3',
  4: 'Grade 4',
  5: 'Grade 5'
} as const;

// Subjects
export const SUBJECTS: Subject[] = [
  'numbers-counting',
  'addition-subtraction',
  'multiplication-division',
  'fractions-decimals',
  'geometry-shapes',
  'measurement-time'
];

export const SUBJECT_NAMES = {
  'numbers-counting': 'Numbers & Counting',
  'addition-subtraction': 'Addition & Subtraction',
  'multiplication-division': 'Multiplication & Division',
  'fractions-decimals': 'Fractions & Decimals',
  'geometry-shapes': 'Geometry & Shapes',
  'measurement-time': 'Measurement & Time'
} as const;

// User Roles
export const USER_ROLES: UserRole[] = ['student', 'teacher', 'parent'];

export const ROLE_NAMES = {
  student: 'Student',
  teacher: 'Teacher',
  parent: 'Parent'
} as const;

// Resource Types
export const RESOURCE_TYPES = {
  video: 'Video',
  worksheet: 'Worksheet',
  game: 'Game',
  lesson: 'Lesson',
  quiz: 'Quiz'
} as const;

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard'
} as const;

// Achievement Categories
export const ACHIEVEMENT_CATEGORIES = {
  lesson: 'Lesson Completion',
  quiz: 'Quiz Success',
  streak: 'Learning Streak',
  mastery: 'Topic Mastery'
} as const;

// API Endpoints (mock)
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
    profile: '/api/auth/profile'
  },
  users: {
    students: '/api/students',
    teachers: '/api/teachers',
    progress: '/api/progress'
  },
  bookings: {
    create: '/api/bookings',
    list: '/api/bookings',
    update: '/api/bookings/:id',
    delete: '/api/bookings/:id'
  },
  resources: {
    list: '/api/resources',
    upload: '/api/resources/upload',
    download: '/api/resources/:id/download'
  },
  quizzes: {
    list: '/api/quizzes',
    submit: '/api/quizzes/:id/submit',
    results: '/api/quizzes/:id/results'
  }
} as const;

// Time Formats
export const TIME_FORMATS = {
  date: 'MM/DD/YYYY',
  time: 'h:mm A',
  dateTime: 'MM/DD/YYYY h:mm A',
  timeOnly: 'h:mm A'
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters'
    }
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters'
    },
    maxLength: {
      value: 50,
      message: 'Name must be less than 50 characters'
    }
  }
} as const;

// Color Schemes
export const COLOR_SCHEMES = {
  primary: '#4a90e2',
  success: '#50c878',
  warning: '#ffa500',
  error: '#ff6b6b',
  info: '#2196f3',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
} as const;

// Animations
export const ANIMATIONS = {
  durations: {
    fast: 150,
    normal: 300,
    slow: 500
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out'
  }
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

// Default Values
export const DEFAULTS = {
  avatar: '/images/default-avatar.png',
  pageSize: 20,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  supportedFileTypes: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.mp4']
} as const;