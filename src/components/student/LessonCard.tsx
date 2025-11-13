import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { Lesson } from '@/types/common';

interface LessonCardProps {
  lesson: Lesson;
  progress?: number;
  completed?: boolean;
  onStart?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  progress = 0,
  completed = false,
  onStart,
  size = 'md'
}) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  };

  const typeIcons = {
    'text': '📖',
    'video': '🎥',
    'image': '🖼️',
    'exercise': '✏️',
    'example': '💡'
  };

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <Card hover={true} className={sizeClasses[size]}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className={`font-semibold text-gray-900 mb-1 ${
            size === 'lg' ? 'text-xl' : size === 'md' ? 'text-lg' : 'text-base'
          }`}>
            {lesson.title}
          </h3>
          <p className={`text-gray-600 ${
            size === 'lg' ? 'text-base' : 'text-sm'
          }`}>
            {lesson.description}
          </p>
        </div>
        {completed && (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600">✓</span>
          </div>
        )}
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" size="sm">
          Grade {lesson.grade}
        </Badge>
        <Badge
          variant="default"
          size="sm"
          className={difficultyColors[lesson.difficulty]}
        >
          {lesson.difficulty}
        </Badge>
        <Badge variant="default" size="sm">
          {lesson.estimatedMinutes} min
        </Badge>
      </div>

      {/* Progress */}
      {progress > 0 && (
        <div className="mb-4">
          <ProgressBar
            progress={progress}
            size="sm"
            showPercentage={true}
          />
        </div>
      )}

      {/* Content Types */}
      <div className="flex flex-wrap gap-2 mb-4">
        {lesson.content.map((content, index) => (
          <span
            key={index}
            className="text-xs text-gray-500"
            title={content.type}
          >
            {typeIcons[content.type]}
          </span>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {completed ? (
            <span className="text-green-600 font-medium">Completed ✓</span>
          ) : progress > 0 ? (
            <span>In Progress ({Math.round(progress)}%)</span>
          ) : (
            <span>Not Started</span>
          )}
        </div>
        <Button
          variant={completed ? 'secondary' : 'primary'}
          size="sm"
          onClick={onStart}
        >
          {completed ? 'Review' : progress > 0 ? 'Continue' : 'Start'}
        </Button>
      </div>
    </Card>
  );
};

export default LessonCard;