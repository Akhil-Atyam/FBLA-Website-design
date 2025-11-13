export type UserRole = 'student' | 'teacher' | 'parent';

export type Grade = 1 | 2 | 3 | 4 | 5;

export type Subject =
  | 'numbers-counting'
  | 'addition-subtraction'
  | 'multiplication-division'
  | 'fractions-decimals'
  | 'geometry-shapes'
  | 'measurement-time';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  grade: Grade;
  subject: Subject;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  content: LessonContent[];
  quizId?: string;
  prerequisites?: string[];
}

export interface LessonContent {
  type: 'text' | 'image' | 'video' | 'exercise' | 'example';
  content: string;
  order: number;
}

export interface Quiz {
  id: string;
  title: string;
  lessonId?: string;
  grade: Grade;
  subject: Subject;
  questions: Question[];
  timeLimit?: number; // minutes
  passingScore: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  roles?: UserRole[];
}