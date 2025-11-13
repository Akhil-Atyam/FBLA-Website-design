export interface Teacher {
  id: string;
  name: string;
  email: string;
  specializations: string[];
  availableSlots: TimeSlot[];
  bookedSessions: Booking[];
  uploadedResources: Resource[];
  bio?: string;
  avatar?: string;
}

export interface TimeSlot {
  id: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
  startTime: string; // "14:00"
  endTime: string;   // "15:00"
  isAvailable: boolean;
  recurring: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'worksheet' | 'game' | 'lesson' | 'quiz';
  gradeLevels: (1 | 2 | 3 | 4 | 5)[];
  subjects: string[];
  fileUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  isPublic: boolean;
  uploadedAt: Date;
  uploadedBy: string;
  learningObjectives: string[];
}