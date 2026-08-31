'use client';

import React from 'react';

interface GoldDividerProps {
  className?: string;
  icon?: React.ReactNode;
}

export default function GoldDivider({ className = '', icon }: GoldDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`} aria-hidden="true">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold opacity-60" />
      <span className="text-gold flex items-center justify-center">
        {icon || (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
          </svg>
        )}
      </span>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold opacity-60" />
    </div>
  );
}
