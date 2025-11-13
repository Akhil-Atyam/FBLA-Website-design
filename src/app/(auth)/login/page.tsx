import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function LoginRoleSelection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-6">
            <span className="text-white text-4xl font-bold">M</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to MathQuest
          </h1>
          <p className="text-xl text-gray-600">
            — where math becomes an adventure!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-8">
            Choose Your Login Type
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Login */}
            <Link href="/login/student">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white text-3xl">👦</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Login</h3>
                  <p className="text-gray-600 mb-4">
                    Access lessons, quizzes, and track your progress
                  </p>
                  <div className="text-green-600 font-medium group-hover:text-green-700">
                    Continue as Student →
                  </div>
                </div>
              </div>
            </Link>

            {/* Teacher Login */}
            <Link href="/login/teacher">
              <div className="bg-gradient-to-br from-orange-50 to-blue-50 border-2 border-orange-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-orange-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-white text-3xl">👨‍🏫</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Teacher Login</h3>
                  <p className="text-gray-600 mb-4">
                    Manage sessions, upload resources, and help students
                  </p>
                  <div className="text-orange-600 font-medium group-hover:text-orange-700">
                    Continue as Teacher →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/">
            <Button variant="secondary" size="md">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}