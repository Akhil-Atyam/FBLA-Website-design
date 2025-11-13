// Local Storage Utilities
export const storage = {
  // Get item from localStorage
  get: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },

  // Set item in localStorage
  set: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },

  // Remove item from localStorage
  remove: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },

  // Clear all localStorage
  clear: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  },

  // Get and parse JSON
  getJSON: (key: string): any => {
    const item = storage.get(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing JSON from localStorage for key "${key}":`, error);
      return null;
    }
  },

  // Stringify and set JSON
  setJSON: (key: string, value: any): void => {
    try {
      storage.set(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error stringifying JSON for localStorage key "${key}":`, error);
    }
  }
};

// Session Storage Utilities (for temporary data)
export const sessionStorage = {
  get: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem(key);
    }
    return null;
  },

  set: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, value);
    }
  },

  remove: (key: string): void => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(key);
    }
  },

  clear: (): void => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear();
    }
  }
};

// Specific app storage keys
export const STORAGE_KEYS = {
  user: 'mathquest_user',
  auth_token: 'mathquest_token',
  preferences: 'mathquest_preferences',
  progress: 'mathquest_progress',
  bookmarks: 'mathquest_bookmarks',
  recent_activity: 'mathquest_recent_activity'
} as const;

// User preferences management
export const userPreferences = {
  get: () => storage.getJSON(STORAGE_KEYS.preferences) || {},
  set: (preferences: Record<string, any>) => {
    storage.setJSON(STORAGE_KEYS.preferences, preferences);
  },
  update: (updates: Record<string, any>) => {
    const current = userPreferences.get();
    userPreferences.set({ ...current, ...updates });
  }
};

// Progress tracking
export const progressStorage = {
  get: () => storage.getJSON(STORAGE_KEYS.progress) || {},
  set: (progress: Record<string, any>) => {
    storage.setJSON(STORAGE_KEYS.progress, progress);
  },
  updateLesson: (lessonId: string, progress: number) => {
    const current = progressStorage.get();
    progressStorage.set({
      ...current,
      lessons: {
        ...current.lessons,
        [lessonId]: {
          progress,
          lastUpdated: new Date().toISOString()
        }
      }
    });
  },
  updateQuiz: (quizId: string, score: number, total: number) => {
    const current = progressStorage.get();
    progressStorage.set({
      ...current,
      quizzes: {
        ...current.quizzes,
        [quizId]: {
          score,
          total,
          percentage: Math.round((score / total) * 100),
          completedAt: new Date().toISOString()
        }
      }
    });
  }
};

// Bookmark management
export const bookmarks = {
  get: () => storage.getJSON(STORAGE_KEYS.bookmarks) || [],
  add: (resourceId: string) => {
    const current = bookmarks.get();
    if (!current.includes(resourceId)) {
      storage.setJSON(STORAGE_KEYS.bookmarks, [...current, resourceId]);
    }
  },
  remove: (resourceId: string) => {
    const current = bookmarks.get();
    storage.setJSON(STORAGE_KEYS.bookmarks, current.filter((id: string) => id !== resourceId));
  },
  toggle: (resourceId: string) => {
    const current = bookmarks.get();
    const isBookmarked = current.includes(resourceId);
    if (isBookmarked) {
      bookmarks.remove(resourceId);
    } else {
      bookmarks.add(resourceId);
    }
    return !isBookmarked;
  },
  isBookmarked: (resourceId: string) => {
    return bookmarks.get().includes(resourceId);
  }
};

// Recent activity tracking
export const recentActivity = {
  get: () => storage.getJSON(STORAGE_KEYS.recent_activity) || [],
  add: (activity: {
    type: string;
    resourceId?: string;
    title: string;
    timestamp?: string;
  }) => {
    const current = recentActivity.get();
    const newActivity = {
      ...activity,
      timestamp: activity.timestamp || new Date().toISOString()
    };

    // Add to beginning and limit to 50 items
    const updated = [newActivity, ...current].slice(0, 50);
    storage.setJSON(STORAGE_KEYS.recent_activity, updated);
  },
  clear: () => {
    storage.remove(STORAGE_KEYS.recent_activity);
  }
};