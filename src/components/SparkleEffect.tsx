import React from 'react';
import { Sparkles } from 'lucide-react';

interface SparkleProps {
  className?: string;
}

const SparkleEffect: React.FC<SparkleProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Sparkles className="absolute top-4 left-4 w-4 h-4 text-accent animate-sparkle opacity-70" style={{ animationDelay: '0s' }} />
      <Sparkles className="absolute top-12 right-8 w-3 h-3 text-primary animate-sparkle opacity-50" style={{ animationDelay: '0.5s' }} />
      <Sparkles className="absolute bottom-16 left-12 w-5 h-5 text-secondary animate-sparkle opacity-60" style={{ animationDelay: '1s' }} />
      <Sparkles className="absolute bottom-8 right-4 w-3 h-3 text-accent animate-sparkle opacity-40" style={{ animationDelay: '1.5s' }} />
      <Sparkles className="absolute top-1/2 left-1/4 w-4 h-4 text-primary animate-sparkle opacity-30" style={{ animationDelay: '0.8s' }} />
      <Sparkles className="absolute top-1/3 right-1/3 w-3 h-3 text-secondary animate-sparkle opacity-50" style={{ animationDelay: '1.2s' }} />
    </div>
  );
};

export default SparkleEffect;