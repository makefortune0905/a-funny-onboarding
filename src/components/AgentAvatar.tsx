import React from 'react';
import { Bot } from 'lucide-react';
import { cn } from '../lib/utils';

interface AgentAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'shrimp' | 'generic';
  imageUrl?: string | null;
  className?: string;
}

const sizeClassMap: Record<NonNullable<AgentAvatarProps['size']>, string> = {
  xs: 'h-5 w-5 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-9 w-9 text-base',
  lg: 'h-10 w-10 text-lg',
  xl: 'h-16 w-16 text-2xl',
};

export const AgentAvatar: React.FC<AgentAvatarProps> = ({ size = 'md', variant = 'shrimp', imageUrl, className }) => {
  const isGeneric = variant === 'generic';

  if (imageUrl) {
    return (
      <div
        className={cn(
          'overflow-hidden rounded-full border border-border bg-card select-none',
          sizeClassMap[size],
          className,
        )}
        aria-label="扣子虾头像"
      >
        <img src={imageUrl} alt="扣子虾头像" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        isGeneric
          ? 'rounded-full border border-border bg-accent text-muted-foreground flex items-center justify-center select-none'
          : 'rounded-full border border-orange-200 bg-orange-100/90 text-orange-600 flex items-center justify-center select-none',
        sizeClassMap[size],
        className,
      )}
      aria-label="扣子虾头像"
    >
      {isGeneric ? <Bot size={size === 'xl' ? 24 : size === 'lg' ? 18 : size === 'md' ? 16 : size === 'sm' ? 14 : 12} /> : <span className="leading-none">🦐</span>}
    </div>
  );
};
