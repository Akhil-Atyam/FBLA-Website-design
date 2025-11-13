import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = true,
  padding = 'md'
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-md';

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200' : '';

  const classes = cn(
    baseClasses,
    paddingClasses[padding],
    hoverClasses,
    className
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;