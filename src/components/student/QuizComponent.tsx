'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { Quiz, Question } from '@/types/common';

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: (score: number, totalQuestions: number) => void;
  onBack?: () => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  quiz,
  onComplete,
  onBack
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>('');
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSelect = (answer: string | number) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer !== '') {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: selectedAnswer
      }));

      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer('');
        setShowFeedback(false);
      } else {
        // Quiz completed
        calculateResults();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(answers[quiz.questions[currentQuestionIndex - 1].id] || '');
      setShowFeedback(false);
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    setShowResults(true);
    onComplete(correctAnswers, quiz.questions.length);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setSelectedAnswer('');
    setShowFeedback(false);
  };

  if (showResults) {
    const correctAnswers = quiz.questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    return (
      <Card className="max-w-2xl mx-auto">
        <div className="text-center py-8">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <span className={`text-4xl ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {passed ? '🏆' : '📚'}
            </span>
          </div>

          <h2 className={`text-3xl font-bold mb-4 ${
            passed ? 'text-green-600' : 'text-gray-900'
          }`}>
            {passed ? 'Congratulations!' : 'Keep Learning!'}
          </h2>

          <p className="text-lg text-gray-600 mb-6">
            You scored {correctAnswers} out of {quiz.questions.length} ({score}%)
          </p>

          <div className="mb-8">
            <ProgressBar
              progress={score}
              size="lg"
              color={passed ? 'green' : 'orange'}
              showPercentage={true}
            />
            <p className="text-sm text-gray-500 mt-2">
              Passing score: {quiz.passingScore}%
            </p>
          </div>

          {/* Review answers */}
          <div className="text-left mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Review Your Answers:</h3>
            <div className="space-y-3">
              {quiz.questions.map((question, index) => {
                const isCorrect = answers[question.id] === question.correctAnswer;
                return (
                  <div
                    key={question.id}
                    className={`p-3 rounded-lg border ${
                      isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <span className={`font-semibold ${
                        isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isCorrect ? '✓' : '✗'}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Question {index + 1}: {question.question}
                        </p>
                        {!isCorrect && question.explanation && (
                          <p className="text-xs text-gray-600">
                            Explanation: {question.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex space-x-4">
            <Button variant="primary" onClick={resetQuiz}>
              Try Again
            </Button>
            <Button variant="secondary" onClick={onBack}>
              Back to Lessons
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">{quiz.title}</h2>
          <Badge variant="default">
            {currentQuestionIndex + 1} / {quiz.questions.length}
          </Badge>
        </div>
        <ProgressBar progress={progress} size="sm" showPercentage={true} />
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-semibold text-sm">
              {currentQuestionIndex + 1}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {currentQuestion.question}
            </h3>

            {/* Multiple Choice */}
            {currentQuestion.type === 'multiple-choice' && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <label
                    key={index}
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={() => handleAnswerSelect(option)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-900">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* True/False */}
            {currentQuestion.type === 'true-false' && (
              <div className="space-y-3">
                {['True', 'False'].map((option) => (
                  <label
                    key={option}
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={() => handleAnswerSelect(option)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-900">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Fill in the Blank */}
            {currentQuestion.type === 'fill-blank' && (
              <input
                type="text"
                value={selectedAnswer as string}
                onChange={(e) => handleAnswerSelect(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="secondary"
          onClick={currentQuestionIndex === 0 ? onBack : handlePrevious}
        >
          {currentQuestionIndex === 0 ? 'Exit Quiz' : 'Previous'}
        </Button>

        <Button
          variant="primary"
          onClick={handleNext}
          disabled={selectedAnswer === ''}
        >
          {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
        </Button>
      </div>

      {/* Timer (if applicable) */}
      {quiz.timeLimit && (
        <div className="mt-4 text-center">
          <Badge variant="warning" size="sm">
            ⏱️ Time Limit: {quiz.timeLimit} minutes
          </Badge>
        </div>
      )}
    </Card>
  );
};

export default QuizComponent;