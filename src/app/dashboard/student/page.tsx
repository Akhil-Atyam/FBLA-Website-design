'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Student, Achievement } from '@/types/student';

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication and load student data
    const userData = localStorage.getItem('mathquest_user');
    if (!userData || JSON.parse(userData).role !== 'student') {
      window.location.href = '/login/student';
      return;
    }

    // Mock student data
    const mockStudent: Student = {
      id: '1',
      name: 'Alex Student',
      grade: 3,
      email: 'student@mathquest.com',
      username: 'alexstudent',
      progress: {
        overallPercentage: 75,
        gradeProgress: [
          { grade: 1, completed: true, percentage: 100 },
          { grade: 2, completed: true, percentage: 100 },
          { grade: 3, completed: false, percentage: 75 },
          { grade: 4, completed: false, percentage: 0 },
          { grade: 5, completed: false, percentage: 0 }
        ],
        subjectCompletion: [
          { subject: 'Addition & Subtraction', completed: true, percentage: 100, lessonsCompleted: 12, totalLessons: 12 },
          { subject: 'Multiplication Basics', completed: true, percentage: 90, lessonsCompleted: 9, totalLessons: 10 },
          { subject: 'Division', completed: false, percentage: 60, lessonsCompleted: 6, totalLessons: 10 },
          { subject: 'Fractions', completed: false, percentage: 30, lessonsCompleted: 2, totalLessons: 8 }
        ],
        quizScores: [
          { quizId: '1', subject: 'Addition', score: 95, totalQuestions: 20, completedAt: new Date(), attempts: 1 },
          { quizId: '2', subject: 'Subtraction', score: 88, totalQuestions: 15, completedAt: new Date(), attempts: 1 }
        ],
        streakDays: 7,
        lastActiveDate: new Date()
      },
      achievements: [
        { id: '1', title: 'First Steps', description: 'Complete your first lesson', icon: '🎯', earnedAt: new Date(), category: 'lesson' },
        { id: '2', title: 'Quiz Master', description: 'Score 100% on a quiz', icon: '🏆', earnedAt: new Date(), category: 'quiz' },
        { id: '3', title: 'Week Warrior', description: '7-day learning streak', icon: '🔥', earnedAt: new Date(), category: 'streak' }
      ],
      bookedSessions: []
    };

    setTimeout(() => {
      setStudent(mockStudent);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Error loading student data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="student" userName={student.name} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Great job, {student.name}! 🌟
          </h1>
          <p className="text-lg text-gray-600">
            You're on fire! {student.progress.streakDays} days learning streak!
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Overall Progress */}
          <Card className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
            <ProgressBar
              progress={student.progress.overallPercentage}
              size="lg"
              label="Grade {student.grade} Progress"
              showPercentage={true}
            />
            <div className="mt-4 text-sm text-gray-600">
              Keep going! Just {100 - student.progress.overallPercentage}% to complete Grade {student.grade}!
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/resources">
                <Button variant="primary" className="w-full">
                  📚 Continue Learning
                </Button>
              </Link>
              <Link href="/booking">
                <Button variant="success" className="w-full">
                  📝 Book Tutoring
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="secondary" className="w-full">
                  🎮 Practice Quizzes
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {student.achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Subject Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Subject Progress</h2>
            <div className="space-y-4">
              {student.progress.subjectCompletion.map((subject, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-700">{subject.subject}</span>
                    <Badge
                      variant={subject.completed ? 'success' : 'default'}
                      size="sm"
                    >
                      {subject.completed ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                  <ProgressBar
                    progress={subject.percentage}
                    size="sm"
                    showPercentage={true}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {subject.lessonsCompleted}/{subject.totalLessons} lessons completed
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Quiz Scores */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">Recent Quiz Scores</h2>
            <div className="space-y-3">
              {student.progress.quizScores.map((quiz, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{quiz.subject}</h3>
                    <p className="text-sm text-gray-600">{quiz.score}/{quiz.totalQuestions} points</p>
                  </div>
                  <Badge
                    variant={quiz.score >= 90 ? 'success' : quiz.score >= 70 ? 'warning' : 'default'}
                  >
                    {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/resources">
                <Button variant="secondary" size="sm" className="w-full">
                  Take More Quizzes
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Upcoming Tutoring Sessions</h2>
          {student.bookedSessions.length > 0 ? (
            <div className="space-y-3">
              {student.bookedSessions.map((session) => (
                <div key={session.id} className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{session.topic}</h3>
                      <p className="text-sm text-gray-600">{new Date(session.dateTime).toLocaleDateString()}</p>
                    </div>
                    <Badge variant="success">Confirmed</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No tutoring sessions scheduled</p>
              <Link href="/booking">
                <Button variant="success">Book a Session</Button>
              </Link>
            </div>
          )}
        </Card>
      </main>

      <Footer />
    </div>
  );
}