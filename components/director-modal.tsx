'use client';

import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';
import Image from 'next/image';
import type { Director } from '@/lib/strapi';
import Link from 'next/link';

interface DirectorModalProps {
  director: Director | null;
  onClose: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  showNavigation?: boolean;
}

export default function DirectorModal({
  director,
  onClose,
  onNavigate,
  showNavigation = true,
}: DirectorModalProps) {
  if (!director) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 mobile:p-2"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white max-w-xl w-full max-h-[90vh] mobile:max-h-[95vh] relative flex flex-col rounded mobile:rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 mobile:top-3 left-4 mobile:left-3 bg-[#122368] text-white w-8 h-8 mobile:w-7 mobile:h-7 flex items-center justify-center hover:opacity-80 transition-opacity z-10"
        >
          <span className="text-lg mobile:text-base font-bold">×</span>
        </button>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-8 mobile:p-4 pt-16 mobile:pt-12 pb-20 mobile:pb-16">
          <div className="flex flex-col items-start text-left">
            {/* Profile Image */}
            <div className="relative w-[300px] h-[420px] aspect-[3/4] mobile:w-full mobile:max-w-[300px] mobile:h-[420px] overflow-hidden shadow-sm mb-6 mobile:mb-4 flex-shrink-0 mx-auto">
              {director.Avatar?.url ? (
                <Image
                  src={director.Avatar.url}
                  alt={director.Name}
                  fill
                  className="object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#99a0ae]">
                  <span className="text-6xl mobile:text-4xl">👤</span>
                </div>
              )}
            </div>

            {/* Name and Title */}
            <h2 className="text-[32px] mobile:text-[24px] leading-[40px] mobile:leading-[30px] tracking-[-1.28px] mobile:tracking-[-0.96px] text-black mb-2 mobile:mb-1.5 flex-shrink-0">
              {director.Name}
            </h2>
            <h3 className="text-title-h5 mobile:text-title-h6 text-black mb-4 mobile:mb-3 flex-shrink-0">
              {director.Role}
            </h3>

            {/* Description */}
            {director.Description && (
              <p className="font-normal text-[#525866] text-[18px] mobile:text-[16px] tracking-[-0.36px] mobile:tracking-[-0.32px] mb-6 mobile:mb-4 text-left flex-shrink-0">
                {director.Description}
              </p>
            )}

            {/* Biography - with scroll */}
            {director.Biography && (
              <div className="w-full mb-8 mobile:mb-6 flex-shrink-0">
                <div className="max-h-[300px] mobile:max-h-[200px] overflow-y-auto pr-2">
                  <p className="font-normal text-[#525866] text-[18px] mobile:text-[16px] tracking-[-0.36px] mobile:tracking-[-0.32px] text-left leading-relaxed">
                    {director.Biography}
                  </p>
                </div>
              </div>
            )}

            {/* Explore Profile Button */}
            {director.Link && (
              <Link
                href={director.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#122368] text-white px-6 mobile:px-4 py-3 mobile:py-2.5 hover:opacity-80 transition-opacity flex-shrink-0 text-sm mobile:text-xs"
              >
                Explore Profile
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        {showNavigation && onNavigate && (
          <div className="absolute bottom-4 mobile:bottom-3 left-4 mobile:left-3 right-4 mobile:right-3 flex justify-between">
            <button
              onClick={() => onNavigate('prev')}
              className="bg-[#122368] text-white w-10 h-10 mobile:w-9 mobile:h-9 rounded flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <RiArrowLeftLine className="w-5 h-5 mobile:w-4 mobile:h-4" />
            </button>
            <button
              onClick={() => onNavigate('next')}
              className="bg-[#122368] text-white w-10 h-10 mobile:w-9 mobile:h-9 rounded flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <RiArrowRightLine className="w-5 h-5 mobile:w-4 mobile:h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


