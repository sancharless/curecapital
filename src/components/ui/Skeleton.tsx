import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle' | 'chart' | 'card' | 'balance';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'rect' 
}) => {
  const baseShimmer = "relative overflow-hidden bg-white/[0.04] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.06] before:to-transparent";

  if (variant === 'circle') {
    return <div className={`rounded-full ${baseShimmer} ${className}`} />;
  }

  if (variant === 'balance') {
    return (
      <div className="space-y-2">
        <div className={`h-4 w-28 rounded ${baseShimmer}`} />
        <div className={`h-10 w-64 rounded-lg ${baseShimmer}`} />
        <div className={`h-4 w-40 rounded ${baseShimmer}`} />
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className={`w-full h-[280px] rounded-xl flex flex-col justify-end p-4 gap-3 ${baseShimmer} ${className}`}>
        <div className="flex items-end gap-2 h-44 w-full opacity-30">
          <div className="flex-1 bg-white/10 rounded-t h-[40%]" />
          <div className="flex-1 bg-white/10 rounded-t h-[65%]" />
          <div className="flex-1 bg-white/10 rounded-t h-[50%]" />
          <div className="flex-1 bg-white/10 rounded-t h-[80%]" />
          <div className="flex-1 bg-white/10 rounded-t h-[75%]" />
          <div className="flex-1 bg-white/10 rounded-t h-[95%]" />
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-5 rounded-card-lg border border-white/5 space-y-4 ${baseShimmer} ${className}`}>
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="h-4 w-12 rounded bg-white/10" />
        </div>
        <div className="h-8 w-44 rounded bg-white/10" />
        <div className="h-3 w-full rounded bg-white/10" />
      </div>
    );
  }

  return (
    <div className={`rounded-md ${baseShimmer} ${className}`} />
  );
};
