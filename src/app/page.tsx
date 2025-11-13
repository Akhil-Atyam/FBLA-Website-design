import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center py-16">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-6">
              <span className="text-white text-4xl font-bold">M</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome to MathQuest
            </h1>
            <p className="text-2xl text-gray-600 mb-2">
              — where math becomes an adventure!
            </p>
          </div>

          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
            MathQuest is an online learning hub created by students, for students to make math fun and interactive.
            Kids in grades 1–5 can explore math concepts through colorful lessons, videos, and quizzes,
            plus book one-on-one tutoring sessions with teachers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button variant="primary" size="lg" className="text-lg px-8 py-4">
                🚀 Start Learning
              </Button>
            </Link>
            <Link href="/booking">
              <Button variant="success" size="lg" className="text-lg px-8 py-4">
                📚 Book Tutoring
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
                🔐 Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose MathQuest?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
              <p className="text-gray-600">
                Engaging lessons, videos, and quizzes that make math concepts come alive for young learners.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">One-on-One Tutoring</h3>
              <p className="text-gray-600">
                Book personalized tutoring sessions with experienced teachers for extra help and guidance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
              <p className="text-gray-600">
                Track learning progress, earn badges, and celebrate achievements along the math adventure.
              </p>
            </div>
          </div>
        </div>

        {/* Grade Levels Section */}
        <div className="py-16 bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Perfect for Grades 1-5
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((grade) => (
              <div key={grade} className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-2xl font-bold">G{grade}</span>
                </div>
                <p className="text-gray-700 font-medium">Grade {grade}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Math Adventure?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students who are already learning math the fun way!
          </p>
          <Link href="/login">
            <Button variant="primary" size="lg" className="text-lg px-12 py-4">
              Get Started Now
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
