'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import { Teacher } from '@/types/teacher';
import { Booking } from '@/types/booking';

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication and load teacher data
    const userData = localStorage.getItem('mathquest_user');
    if (!userData || JSON.parse(userData).role !== 'teacher') {
      window.location.href = '/login/teacher';
      return;
    }

    // Mock teacher data
    const mockTeacher: Teacher = {
      id: '2',
      name: 'Mrs. Johnson',
      email: 'teacher@mathquest.com',
      specializations: ['Mathematics', 'Elementary Education', 'Grade 1-5'],
      availableSlots: [
        { id: '1', dayOfWeek: 1, startTime: '14:00', endTime: '17:00', isAvailable: true, recurring: true },
        { id: '2', dayOfWeek: 3, startTime: '14:00', endTime: '17:00', isAvailable: true, recurring: true },
        { id: '3', dayOfWeek: 5, startTime: '14:00', endTime: '17:00', isAvailable: true, recurring: true }
      ],
      bookedSessions: [
        {
          id: '1',
          studentId: '1',
          teacherId: '2',
          studentName: 'Alex Student',
          dateTime: new Date(Date.now() + 86400000), // Tomorrow
          topic: 'Multiplication Basics',
          grade: 3,
          status: 'confirmed',
          meetingLink: 'https://zoom.us/j/123456789',
          parentEmail: 'parent@email.com',
          studentName: 'Alex Student',
          createdAt: new Date(),
          updatedAt: new Date(),
          remindersSent: 1
        },
        {
          id: '2',
          studentId: '3',
          teacherId: '2',
          studentName: 'Sarah Chen',
          dateTime: new Date(Date.now() + 172800000), // Day after tomorrow
          topic: 'Fraction Introduction',
          grade: 4,
          status: 'pending',
          parentEmail: 'parent2@email.com',
          studentName: 'Sarah Chen',
          createdAt: new Date(),
          updatedAt: new Date(),
          remindersSent: 0
        }
      ],
      uploadedResources: [
        {
          id: '1',
          title: 'Multiplication Practice Worksheets',
          description: 'Grade 3 multiplication practice with visual aids',
          type: 'worksheet',
          gradeLevels: [3],
          subjects: ['Multiplication & Division'],
          fileUrl: '/files/multiplication-practice.pdf',
          isPublic: true,
          uploadedAt: new Date(),
          uploadedBy: '2',
          learningObjectives: ['Understand multiplication concepts', 'Practice multiplication tables']
        },
        {
          id: '2',
          title: 'Introduction to Fractions Video',
          description: 'Basic fraction concepts for Grade 4 students',
          type: 'video',
          gradeLevels: [4],
          subjects: ['Fractions & Decimals'],
          videoUrl: 'https://youtube.com/watch?v=example',
          isPublic: true,
          uploadedAt: new Date(),
          uploadedBy: '2',
          learningObjectives: ['Introduction to fractions', 'Understanding numerator and denominator']
        }
      ]
    };

    setTimeout(() => {
      setTeacher(mockTeacher);
      setLoading(false);
    }, 1000);
  }, []);

  const handleConfirmSession = (sessionId: string) => {
    // Mock session confirmation
    console.log('Confirming session:', sessionId);
  };

  const handleRejectSession = (sessionId: string) => {
    // Mock session rejection
    console.log('Rejecting session:', sessionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Error loading teacher data</div>
      </div>
    );
  }

  const upcomingSessions = teacher.bookedSessions
    .filter(session => session.status === 'confirmed' || session.status === 'pending')
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

  const pendingSessions = teacher.bookedSessions.filter(session => session.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="teacher" userName={teacher.name} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {teacher.name}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Manage your sessions and help students succeed in their math journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{upcomingSessions.length}</div>
              <div className="text-sm text-gray-600">Upcoming Sessions</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">{pendingSessions.length}</div>
              <div className="text-sm text-gray-600">Pending Requests</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{teacher.uploadedResources.length}</div>
              <div className="text-sm text-gray-600">Uploaded Resources</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">{teacher.specializations.length}</div>
              <div className="text-sm text-gray-600">Specializations</div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
                <Link href="/booking">
                  <Button variant="secondary" size="sm">
                    View Calendar
                  </Button>
                </Link>
              </div>

              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{session.topic}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {session.studentName} - Grade {session.grade}
                          </p>
                          <p className="text-sm text-gray-500 mb-2">
                            {new Date(session.dateTime).toLocaleString()}
                          </p>
                          {session.meetingLink && (
                            <a
                              href={session.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Join Meeting →
                            </a>
                          )}
                        </div>
                        <div className="ml-4">
                          <Badge
                            variant={session.status === 'confirmed' ? 'success' : 'warning'}
                          >
                            {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No upcoming sessions scheduled</p>
                  <p className="text-sm text-gray-500">Students will book sessions through the platform</p>
                </div>
              )}
            </Card>

            {/* Pending Session Requests */}
            {pendingSessions.length > 0 && (
              <Card>
                <h2 className="text-xl font-semibold mb-4">Session Requests</h2>
                <div className="space-y-4">
                  {pendingSessions.map((session) => (
                    <div key={session.id} className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{session.topic}</h3>
                          <p className="text-sm text-gray-600">
                            {session.studentName} - Grade {session.grade}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(session.dateTime).toLocaleString()}
                          </p>
                        </div>
                        <Badge variant="warning">Pending</Badge>
                      </div>
                      <div className="flex space-x-3">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleConfirmSession(session.id)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="error"
                          size="sm"
                          onClick={() => handleRejectSession(session.id)}
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/booking">
                  <Button variant="primary" className="w-full">
                    📅 Manage Calendar
                  </Button>
                </Link>
                <Button variant="success" className="w-full">
                  📤 Upload Resource
                </Button>
                <Link href="/contact">
                  <Button variant="secondary" className="w-full">
                    💬 View Messages
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Your Specializations */}
            <Card>
              <h2 className="text-xl font-semibold mb-4">Specializations</h2>
              <div className="space-y-2">
                {teacher.specializations.map((spec, index) => (
                  <Badge key={index} variant="default" className="mr-2 mb-2">
                    {spec}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Available Hours */}
            <Card>
              <h2 className="text-xl font-semibold mb-4">Available Hours</h2>
              <div className="space-y-2 text-sm">
                {teacher.availableSlots.map((slot) => (
                  <div key={slot.id} className="flex justify-between text-gray-600">
                    <span>
                      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][slot.dayOfWeek]}
                    </span>
                    <span>{slot.startTime} - {slot.endTime}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Resources */}
        <Card className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Resources</h2>
            <Button variant="secondary" size="sm">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teacher.uploadedResources.slice(0, 4).map((resource) => (
              <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">
                      {resource.type === 'video' ? '🎥' : resource.type === 'worksheet' ? '📄' : '📚'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{resource.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>Grades: {resource.gradeLevels.join(', ')}</span>
                      <span>•</span>
                      <span>{resource.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}