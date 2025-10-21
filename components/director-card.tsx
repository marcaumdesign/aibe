'use client';

import Image from 'next/image';

interface DirectorCardProps {
  id?: number;
  name: string;
  role: string;
  image: string;
  imageAlt?: string;
  onClick?: () => void;
  clickable?: boolean;
}

export default function DirectorCard({
  name,
  role,
  image,
  imageAlt,
  onClick,
  clickable = false,
}: DirectorCardProps) {
  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`flex flex-col gap-4 items-center text-center ${clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
        }`}
      onClick={handleClick}
    >
      <div className='relative w-[246px] h-[295px] bg-[#f3f3f3] overflow-hidden pointer-events-none'>
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
        <h3 className='text-title-h5 text-black'>{name}</h3>
        <p className='text-paragraph-lg text-[#525866]'>{role}</p>
      </div>
    </div>
  );
}

