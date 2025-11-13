'use client';

import { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Grade, Subject } from '@/types/common';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'worksheet' | 'game' | 'lesson' | 'quiz';
  gradeLevels: Grade[];
  subjects: Subject[];
  duration?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Addition Adventures',
    description: 'Learn basic addition with fun exercises and games',
    type: 'lesson',
    gradeLevels: [1, 2],
    subjects: ['addition-subtraction'],
    duration: '15 min',
    difficulty: 'easy'
  },
  {
    id: '2',
    title: 'Multiplication Practice Quiz',
    description: 'Test your multiplication skills with this interactive quiz',
    type: 'quiz',
    gradeLevels: [3, 4],
    subjects: ['multiplication-division'],
    duration: '10 min',
    difficulty: 'medium'
  },
  {
    id: '3',
    title: 'Fraction Fundamentals Video',
    description: 'Introduction to fractions with visual examples',
    type: 'video',
    gradeLevels: [4, 5],
    subjects: ['fractions-decimals'],
    duration: '20 min',
    difficulty: 'medium'
  },
  {
    id: '4',
    title: 'Geometry Explorer Game',
    description: 'Interactive game to learn shapes and spatial reasoning',
    type: 'game',
    gradeLevels: [1, 2, 3],
    subjects: ['geometry-shapes'],
    duration: '15 min',
    difficulty: 'easy'
  },
  {
    id: '5',
    title: 'Subtraction Worksheet Pack',
    description: 'Printable worksheets for practicing subtraction',
    type: 'worksheet',
    gradeLevels: [2, 3],
    subjects: ['addition-subtraction'],
    duration: '30 min',
    difficulty: 'easy'
  },
  {
    id: '6',
    title: 'Division Challenge',
    description: 'Advanced division problems and real-world applications',
    type: 'lesson',
    gradeLevels: [4, 5],
    subjects: ['multiplication-division'],
    duration: '25 min',
    difficulty: 'hard'
  }
];

const gradeNames = {
  1: 'Grade 1',
  2: 'Grade 2',
  3: 'Grade 3',
  4: 'Grade 4',
  5: 'Grade 5'
};

const subjectNames = {
  'numbers-counting': 'Numbers & Counting',
  'addition-subtraction': 'Addition & Subtraction',
  'multiplication-division': 'Multiplication & Division',
  'fractions-decimals': 'Fractions & Decimals',
  'geometry-shapes': 'Geometry & Shapes',
  'measurement-time': 'Measurement & Time'
};

const typeIcons = {
  video: '🎥',
  worksheet: '📄',
  game: '🎮',
  lesson: '📚',
  quiz: '✍️'
};

const typeColors = {
  video: 'bg-purple-100 text-purple-800',
  worksheet: 'bg-blue-100 text-blue-800',
  game: 'bg-green-100 text-green-800',
  lesson: 'bg-orange-100 text-orange-800',
  quiz: 'bg-red-100 text-red-800'
};

export default function ResourcesPage() {
  const [selectedGrade, setSelectedGrade] = useState<Grade | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredResources = mockResources.filter(resource => {
    const gradeMatch = selectedGrade === 'all' || resource.gradeLevels.includes(selectedGrade);
    const subjectMatch = selectedSubject === 'all' || resource.subjects.includes(selectedSubject);
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    return gradeMatch && subjectMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Math Resources</h1>
          <p className="text-lg text-gray-600">
            Explore interactive lessons, videos, quizzes, and games organized by grade and topic
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Filter Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Grade Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value as Grade | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Grades</option>
                {[1, 2, 3, 4, 5].map(grade => (
                  <option key={grade} value={grade}>{gradeNames[grade as Grade]}</option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as Subject | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Subjects</option>
                {Object.entries(subjectNames).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="video">Videos</option>
                <option value="lesson">Lessons</option>
                <option value="quiz">Quizzes</option>
                <option value="game">Games</option>
                <option value="worksheet">Worksheets</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredResources.length} resources found
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSelectedGrade('all');
                setSelectedSubject('all');
                setSelectedType('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </Card>

        {/* Grade Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Grade</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map(grade => (
              <Button
                key={grade}
                variant={selectedGrade === grade ? 'primary' : 'secondary'}
                onClick={() => setSelectedGrade(grade as Grade)}
                className="h-16 flex flex-col items-center justify-center"
              >
                <span className="text-lg font-bold">G{grade}</span>
                <span className="text-xs">{gradeNames[grade as Grade]}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredResources.map((resource) => (
            <Card key={resource.id} hover={true}>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{typeIcons[resource.type]}</span>
                  <Badge
                    variant={resource.difficulty === 'easy' ? 'success' : resource.difficulty === 'medium' ? 'warning' : 'error'}
                    size="sm"
                  >
                    {resource.difficulty}
                  </Badge>
                </div>
                <Badge className={typeColors[resource.type]} size="sm">
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>

              <div className="mb-4 space-y-2">
                <div className="flex flex-wrap gap-1">
                  {resource.gradeLevels.map(grade => (
                    <Badge key={grade} variant="default" size="sm">
                      {gradeNames[grade]}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {resource.subjects.map(subject => (
                    <Badge key={subject} variant="secondary" size="sm">
                      {subjectNames[subject]}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {resource.duration && `⏱️ ${resource.duration}`}
                </span>
                <Button variant="primary" size="sm">
                  {resource.type === 'quiz' ? 'Start Quiz' :
                   resource.type === 'game' ? 'Play Game' :
                   resource.type === 'video' ? 'Watch Video' :
                   resource.type === 'worksheet' ? 'Download' : 'Start Lesson'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more resources</p>
            <Button
              variant="secondary"
              onClick={() => {
                setSelectedGrade('all');
                setSelectedSubject('all');
                setSelectedType('all');
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Extra Help?</h2>
            <p className="text-gray-600 mb-6">
              Book a one-on-one tutoring session with our expert teachers
            </p>
            <Button variant="success" size="lg">
              Book a Tutoring Session
            </Button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}