'use client';

import { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Grade } from '@/types/common';

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  teacher: string;
}

interface BookingFormData {
  studentName: string;
  grade: Grade;
  topic: string;
  dateTime: string;
  parentEmail: string;
  notes: string;
}

const mockTimeSlots: TimeSlot[] = [
  { id: '1', date: '2024-01-15', time: '2:00 PM', available: true, teacher: 'Mrs. Johnson' },
  { id: '2', date: '2024-01-15', time: '3:00 PM', available: true, teacher: 'Mrs. Johnson' },
  { id: '3', date: '2024-01-15', time: '4:00 PM', available: false, teacher: 'Mrs. Johnson' },
  { id: '4', date: '2024-01-16', time: '2:00 PM', available: true, teacher: 'Mr. Smith' },
  { id: '5', date: '2024-01-16', time: '3:00 PM', available: true, teacher: 'Mr. Smith' },
  { id: '6', date: '2024-01-16', time: '4:00 PM', available: true, teacher: 'Mr. Smith' },
  { id: '7', date: '2024-01-17', time: '2:00 PM', available: true, teacher: 'Mrs. Johnson' },
  { id: '8', date: '2024-01-17', time: '3:00 PM', available: false, teacher: 'Mrs. Johnson' },
  { id: '9', date: '2024-01-17', time: '4:00 PM', available: true, teacher: 'Mrs. Johnson' },
];

const topics = [
  'Addition & Subtraction',
  'Multiplication Basics',
  'Division Fundamentals',
  'Fractions Introduction',
  'Geometry & Shapes',
  'Measurement & Time',
  'Math Homework Help',
  'Test Preparation'
];

export default function BookingPage() {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    studentName: '',
    grade: 1,
    topic: '',
    dateTime: '',
    parentEmail: '',
    notes: ''
  });

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setFormData(prev => ({
        ...prev,
        dateTime: `${slot.date} at ${slot.time}`
      }));
      setShowBookingForm(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mock booking submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setBookingSubmitted(true);
    setShowBookingForm(false);
    setSelectedSlot(null);

    // Reset form
    setFormData({
      studentName: '',
      grade: 1,
      topic: '',
      dateTime: '',
      parentEmail: '',
      notes: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (bookingSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center py-12">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-green-600 text-4xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Session Booked!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your tutoring session has been successfully booked. A confirmation email has been sent to the parent's email address.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-2">Session Details:</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Student:</strong> {formData.studentName}</p>
                <p><strong>Grade:</strong> {formData.grade}</p>
                <p><strong>Topic:</strong> {formData.topic}</p>
                <p><strong>Date & Time:</strong> {formData.dateTime}</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button variant="primary" onClick={() => setBookingSubmitted(false)}>
                Book Another Session
              </Button>
              <div>
                <Button variant="secondary" className="ml-4">
                  Return to Home
                </Button>
              </div>
            </div>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book a Tutoring Session</h1>
          <p className="text-lg text-gray-600">
            Schedule one-on-one tutoring sessions with our expert math teachers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>

              {/* Date grouping */}
              <div className="space-y-6">
                {Object.entries(
                  mockTimeSlots.reduce((acc, slot) => {
                    if (!acc[slot.date]) acc[slot.date] = [];
                    acc[slot.date].push(slot);
                    return acc;
                  }, {} as Record<string, TimeSlot[]>)
                ).map(([date, slots]) => (
                  <div key={date}>
                    <h3 className="font-medium text-gray-900 mb-3">
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {slots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => handleSlotSelect(slot)}
                          disabled={!slot.available}
                          className={`
                            p-3 rounded-lg border text-sm font-medium transition-all
                            ${slot.available
                              ? 'border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer text-green-800'
                              : 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-400'
                            }
                            ${selectedSlot?.id === slot.id ? 'ring-2 ring-green-500 bg-green-100' : ''}
                          `}
                        >
                          <div className="text-center">
                            <div className="font-semibold">{slot.time}</div>
                            <div className="text-xs mt-1">{slot.teacher}</div>
                            {!slot.available && (
                              <div className="text-xs">Booked</div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Sessions are 1 hour long and include personalized instruction and practice.
                </p>
              </div>
            </Card>
          </div>

          {/* Booking Form Section */}
          <div>
            {showBookingForm && selectedSlot ? (
              <Card>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Complete Your Booking</h2>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      <strong>Selected Time:</strong> {selectedSlot.date} at {selectedSlot.time} with {selectedSlot.teacher}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter student's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade Level *
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5].map(grade => (
                        <option key={grade} value={grade}>Grade {grade}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Topic / Subject *
                    </label>
                    <select
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a topic</option>
                      {topics.map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Parent Email *
                    </label>
                    <input
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="parent@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any specific topics or areas where help is needed?"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="flex-1"
                    >
                      Confirm Booking
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setShowBookingForm(false);
                        setSelectedSlot(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            ) : (
              <Card>
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-600 text-2xl">📅</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Time Slot</h3>
                  <p className="text-gray-600 mb-4">
                    Choose an available time slot from the calendar to book your session
                  </p>
                  <div className="text-left bg-gray-50 rounded-lg p-4 max-w-sm mx-auto">
                    <h4 className="font-medium text-gray-900 mb-2">What to expect:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 1-hour personalized session</li>
                      <li>• Expert math teacher</li>
                      <li>• Customized lesson plan</li>
                      <li>• Practice exercises included</li>
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Teacher Information */}
        <div className="mt-8">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Our Expert Teachers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">MJ</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Mrs. Johnson</h3>
                  <p className="text-sm text-gray-600">15+ years teaching elementary math</p>
                  <p className="text-sm text-gray-500">Specializes in Grades 1-5</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">MS</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Mr. Smith</h3>
                  <p className="text-sm text-gray-600">Math specialist with 10+ years experience</p>
                  <p className="text-sm text-gray-500">Specializes in Grades 3-5</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}