export interface Student {
  id: string;
  name: string;
  grade: 1 | 2 | 3 | 4 | 5;
  email?: string;
  username: string;
  progress: Progress;
  achievements: Achievement[];
  bookedSessions: Booking[];
}

export interface Progress {
  overallPercentage: number;
  gradeProgress: GradeProgress[];
  subjectCompletion: SubjectProgress[];
  quizScores: QuizScore[];
  streakDays: number;
  lastActiveDate: Date;
}

export interface GradeProgress {
  grade: 1 | 2 | 3 | 4 | 5;
  completed: boolean;
  percentage: number;
}

export interface SubjectProgress {
  subject: string;
  completed: boolean;
  percentage: number;
  lessonsCompleted: number;
  totalLessons: number;
}

export interface QuizScore {
  quizId: string;
  subject: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  attempts: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: 'lesson' | 'quiz' | 'streak' | 'mastery';
}