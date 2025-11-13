'use client';

import { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ContactFormData {
  parentName: string;
  studentName: string;
  email: string;
  subject: string;
  message: string;
  contactMethod: 'email' | 'phone';
}

const faqItems = [
  {
    question: "How do I create a student account?",
    answer: "Click on the Login button from the home page, then select 'Student Login'. You can create a new account or log in with existing credentials."
  },
  {
    question: "How do I book a tutoring session?",
    answer: "Visit the Booking page, select an available time slot, and fill out the booking form with your student's information and topic."
  },
  {
    question: "What grades does MathQuest support?",
    answer: "MathQuest is designed for students in Grades 1-5, with content tailored to each grade level's curriculum."
  },
  {
    question: "How much do tutoring sessions cost?",
    answer: "Tutoring sessions are priced at $30 per hour. Packages of 5 sessions are available for $125."
  },
  {
    question: "Can I track my child's progress?",
    answer: "Yes! Parents can view their child's progress through the student dashboard, including completed lessons and quiz scores."
  }
];

const helpTopics = [
  {
    title: "Getting Started",
    description: "Learn how to create accounts and navigate the platform",
    icon: "🚀"
  },
  {
    title: "Booking Sessions",
    description: "Step-by-step guide to scheduling tutoring sessions",
    icon: "📅"
  },
  {
    title: "Using Resources",
    description: "How to access lessons, videos, and practice materials",
    icon: "📚"
  },
  {
    title: "Progress Tracking",
    description: "Understanding your child's learning dashboard and achievements",
    icon: "📊"
  },
  {
    title: "Technical Support",
    description: "Troubleshooting common issues and technical help",
    icon: "🔧"
  },
  {
    title: "Account Management",
    description: "Managing profiles, passwords, and account settings",
    icon: "⚙️"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    parentName: '',
    studentName: '',
    email: '',
    subject: '',
    message: '',
    contactMethod: 'email'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitted(true);
    setLoading(false);

    // Reset form
    setFormData({
      parentName: '',
      studentName: '',
      email: '',
      subject: '',
      message: '',
      contactMethod: 'email'
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center py-12">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-green-600 text-4xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <Button variant="primary" onClick={() => setSubmitted(false)}>
              Send Another Message
            </Button>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact & Support</h1>
          <p className="text-lg text-gray-600">
            Get in touch with our teachers and support team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div>
            <Card>
              <h2 className="text-xl font-semibold mb-6">Message a Teacher</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Parent Name *
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
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
                      placeholder="Student's full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject / Topic *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a topic</option>
                    <option value="general-question">General Question</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="billing-question">Billing Question</option>
                    <option value="tutoring-request">Tutoring Request</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="partnership">Partnership Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Contact Method *
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="email"
                        checked={formData.contactMethod === 'email'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Email
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="phone"
                        checked={formData.contactMethod === 'phone'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Phone
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your question or concern in detail..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Quick Contact Info */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">📧</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">help@mathquest.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">📱</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">1-800-MATH-HELP</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600">🕐</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Response Time</h3>
                    <p className="text-gray-600">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-4">Office Hours</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday:</span>
                  <span className="text-gray-600">9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday:</span>
                  <span className="text-gray-600">10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday:</span>
                  <span className="text-gray-600">Closed</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Parent Help Section */}
        <div id="help" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Parent Help Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpTopics.map((topic, index) => (
              <Card key={index} hover={true}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">{topic.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{topic.title}</h3>
                  <p className="text-gray-600 text-sm">{topic.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <Card>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Emergency Support */}
        <Card className="bg-red-50 border border-red-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">🆘</span>
            </div>
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Need Immediate Help?</h3>
              <p className="text-red-700">
                For urgent technical issues or account problems, call us directly at 1-800-MATH-HELP
              </p>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}