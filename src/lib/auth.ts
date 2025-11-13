import { User, UserRole } from '@/types/common';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

class AuthService {
  private static instance: AuthService;
  private listeners: Set<(state: AuthState) => void> = new Set();
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false
  };

  private constructor() {
    // Check for existing session on initialization
    this.checkExistingSession();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private checkExistingSession(): void {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('mathquest_user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          this.setState({
            user,
            isAuthenticated: true,
            loading: false
          });
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('mathquest_user');
        }
      }
    }
  }

  private setState(newState: Partial<AuthState>): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Subscribe to auth state changes
  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener);
    listener(this.state);

    return () => {
      this.listeners.delete(listener);
    };
  }

  // Get current auth state
  getState(): AuthState {
    return { ...this.state };
  }

  // Check if user has specific role
  hasRole(role: UserRole): boolean {
    return this.state.user?.role === role;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.state.isAuthenticated && !!this.state.user;
  }

  // Login method
  async login(credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> {
    this.setState({ loading: true });

    try {
      // Mock authentication - in real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock user database
      const mockUsers = [
        {
          id: '1',
          email: 'student@mathquest.com',
          password: 'student123',
          name: 'Alex Student',
          role: 'student' as UserRole
        },
        {
          id: '2',
          email: 'teacher@mathquest.com',
          password: 'teacher123',
          name: 'Mrs. Johnson',
          role: 'teacher' as UserRole
        }
      ];

      const user = mockUsers.find(
        u => u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;

        // Store in localStorage
        localStorage.setItem('mathquest_user', JSON.stringify(userWithoutPassword));

        // Update state
        this.setState({
          user: userWithoutPassword,
          isAuthenticated: true,
          loading: false
        });

        return { success: true };
      } else {
        this.setState({ loading: false });
        return {
          success: false,
          error: 'Invalid email or password. Please try again.'
        };
      }
    } catch (error) {
      this.setState({ loading: false });
      return {
        success: false,
        error: 'Login failed. Please try again later.'
      };
    }
  }

  // Logout method
  logout(): void {
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mathquest_user');
    }

    // Update state
    this.setState({
      user: null,
      isAuthenticated: false,
      loading: false
    });
  }

  // Update user profile
  async updateProfile(updates: Partial<User>): Promise<{ success: boolean; error?: string }> {
    if (!this.state.user) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      const updatedUser = { ...this.state.user, ...updates };

      // Update localStorage
      localStorage.setItem('mathquest_user', JSON.stringify(updatedUser));

      // Update state
      this.setState({
        user: updatedUser
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update profile'
      };
    }
  }

  // Mock method for creating new student accounts
  async createStudentAccount(studentData: {
    name: string;
    email: string;
    password: string;
    grade: number;
  }): Promise<{ success: boolean; error?: string }> {
    // In a real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser = {
      id: Date.now().toString(),
      name: studentData.name,
      email: studentData.email,
      role: 'student' as UserRole,
      grade: studentData.grade,
      createdAt: new Date(),
      lastLogin: new Date(),
      isActive: true
    };

    // Store in localStorage
    localStorage.setItem('mathquest_user', JSON.stringify(newUser));

    // Update state
    this.setState({
      user: newUser,
      isAuthenticated: true,
      loading: false
    });

    return { success: true };
  }

  // Get role-based redirect path
  getRedirectPath(): string {
    if (!this.state.user) return '/login';

    switch (this.state.user.role) {
      case 'student':
        return '/dashboard/student';
      case 'teacher':
        return '/dashboard/teacher';
      case 'parent':
        return '/dashboard/parent';
      default:
        return '/login';
    }
  }

  // Check if current user can access a route
  canAccessRoute(requiredRoles?: UserRole[]): boolean {
    if (!this.isAuthenticated()) return false;
    if (!requiredRoles || requiredRoles.length === 0) return true;
    return requiredRoles.includes(this.state.user!.role);
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();

// Export hook for React components
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(authService.getState());

  useEffect(() => {
    const unsubscribe = authService.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  return {
    ...authState,
    login: authService.login.bind(authService),
    logout: authService.logout.bind(authService),
    hasRole: authService.hasRole.bind(authService),
    updateProfile: authService.updateProfile.bind(authService),
    createStudentAccount: authService.createStudentAccount.bind(authService),
    getRedirectPath: authService.getRedirectPath.bind(authService),
    canAccessRoute: authService.canAccessRoute.bind(authService)
  };
}