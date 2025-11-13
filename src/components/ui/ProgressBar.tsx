import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'orange' | 'yellow';
  showPercentage?: boolean;
  className?: string;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = 'md',
  color = 'blue',
  showPercentage = true,
  className,
  label
}) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500'
  };

  const baseClasses = 'w-full bg-gray-200 rounded-full overflow-hidden';
  const fillClasses = cn('h-full transition-all duration-300 ease-out', colorClasses[color]);

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
          )}
        </div>
      )}
      <div className={cn(baseClasses, sizeClasses[size])}>
        <div
          className={fillClasses}
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;