
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'success' | 'warning' | 'danger';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
  showPercentage = true,
  label,
  size = 'md',
  color = 'default',
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to actual value
    const timer = setTimeout(() => {
      setValue(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    default: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
  };

  return (
    <div className={cn('w-full space-y-2', className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="font-medium text-foreground/80">{label}</span>}
          {showPercentage && (
            <span className="font-medium text-foreground">{Math.round(value)}%</span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn(
            'transition-all duration-1000 ease-out rounded-full',
            colorClasses[color],
            sizeClasses[size]
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
