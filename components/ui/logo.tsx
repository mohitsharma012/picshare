'use client';

import { Camera } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
}

export function Logo({ size = 'md', variant = 'default' }: LogoProps) {
  const sizes = {
    sm: {
      container: 'h-8',
      icon: 'h-5 w-5',
      text: 'text-lg'
    },
    md: {
      container: 'h-10',
      icon: 'h-6 w-6',
      text: 'text-xl'
    },
    lg: {
      container: 'h-12',
      icon: 'h-10 w-10',
      text: 'text-3xl'
    }
  };

  const variants = {
    default: {
      icon: 'text-blue-500',
      text: 'text-gray-900',
      highlight: 'text-blue-500'
    },
    white: {
      icon: 'text-white',
      text: 'text-white',
      highlight: 'text-blue-200'
    }
  };

  return (
    <Link href="/" className={`flex items-center gap-2 ${sizes[size].container} group`}>
      <div className="relative">
        <div className="absolute -inset-2 bg-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <Camera className={`${sizes[size].icon} ${variants[variant].icon} relative`} />
      </div>
      <span className={`font-bold ${sizes[size].text} ${variants[variant].text} flex items-center`}>
        Pic<span className={variants[variant].highlight}>Share</span>
      </span>
    </Link>
  );
}