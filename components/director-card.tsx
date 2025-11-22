'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface DirectorCardProps {
  id?: number;
  name: string;
  role: string;
  description?: string;
  image: string;
  imageAlt?: string;
  onClick?: () => void;
  clickable?: boolean;
}

export default function DirectorCard({
  name,
  role,
  description,
  image,
  imageAlt,
  onClick,
  clickable = false,
}: DirectorCardProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  // Layout horizontal para telas < 900px
  if (isSmallScreen) {
    return (
      <div
        className={`flex flex-row gap-4 items-center text-left ${clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
          }`}
        onClick={handleClick}
      >
        <div className='relative w-[120px] h-[120px] flex-shrink-0 overflow-hidden rounded-full shadow-sm pointer-events-none'>
          {image && image !== '' ? (
            <Image
              src={image}
              alt={imageAlt || name}
              fill
              className='object-cover object-center'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-[#99a0ae]'>
              <span className='text-4xl'>👤</span>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-1.5 pointer-events-none flex-1'>
          <h3 className='text-title-h6 text-primary-base'>{name}</h3>
          <p className='text-paragraph-md text-text-strong-950'>{role}</p>
          {description && (
            <p className='text-paragraph-xs text-[#525866]'>{description}</p>
          )}
        </div>
      </div>
    );
  }

  // Layout vertical para telas >= 900px (original)
  return (
    <div
      className={`flex flex-col gap-4 items-center text-center ${clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
        }`}
      onClick={handleClick}
    >
      <div className='relative w-[200px] h-[200px] aspect-square overflow-hidden rounded-full shadow-sm pointer-events-none mx-auto'>
        {image && image !== '' ? (
          <Image
            src={image}
            alt={imageAlt || name}
            fill
            className='object-cover object-center'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-[#99a0ae]'>
            <span className='text-6xl'>👤</span>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-2 pointer-events-none'>
        <h3 className='text-title-h5 text-primary-base'>{name}</h3>
        <p className='text-paragraph-lg text-text-strong-950'>{role}</p>
        {description && (
          <p className='text-paragraph-xs text-[#525866]'>{description}</p>
        )}
      </div>
    </div>
  );
}

