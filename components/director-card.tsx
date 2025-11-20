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
      className={`flex flex-col gap-4 mobile:gap-3 items-center text-center ${clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
        }`}
      onClick={handleClick}
    >
      <div className='relative w-[200px] h-[200px] aspect-[3/4] mobile:w-full mobile:max-w-[300px] mobile:h-[420px] overflow-hidden shadow-sm pointer-events-none mx-auto'>
        {image && image !== '' ? (
          <Image
            src={image}
            alt={imageAlt || name}
            fill
            className='object-cover object-center'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-[#99a0ae]'>
            <span className='text-6xl mobile:text-4xl'>👤</span>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-2 mobile:gap-1.5 pointer-events-none'>
        <h3 className='text-title-h5 mobile:text-title-h6 text-black'>{name}</h3>
        <p className='text-paragraph-lg mobile:text-paragraph-md text-[#525866]'>{role}</p>
      </div>
    </div>
  );
}

