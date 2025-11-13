import { Student } from './student';
import { Teacher } from './teacher';

export interface Booking {
  id: string;
  studentId: string;
  teacherId: string;
  student?: Student;
  teacher?: Teacher;
  dateTime: Date;
  topic: string;
  grade: 1 | 2 | 3 | 4 | 5;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
  parentEmail: string;
  studentName: string;
  createdAt: Date;
  updatedAt: Date;
  remindersSent: number;
}

export interface BookingFormData {
  studentName: string;
  grade: 1 | 2 | 3 | 4 | 5;
  topic: string;
  dateTime: Date;
  parentEmail: string;
  notes?: string;
}