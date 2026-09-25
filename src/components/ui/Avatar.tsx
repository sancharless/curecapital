import React from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'busy' | 'offline';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  status,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const getInitials = (n: string) => {
    return n.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <div className={`
        ${sizeMap[size]} rounded-full overflow-hidden flex items-center justify-center font-semibold
        bg-[#11233B] text-brand-cyan border border-white/10 select-none
      `}>
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span className={`
          absolute bottom-0 right-0 block rounded-full ring-2 ring-bg-primary
          ${size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'}
          ${status === 'online' ? 'bg-positive' : status === 'busy' ? 'bg-alert' : 'bg-text-tertiary'}
        `} />
      )}
    </div>
  );
};
