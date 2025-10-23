'use client';

import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';
import Image from 'next/image';
import type { Director } from '@/lib/strapi';

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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white max-w-xl w-full max-h-[90vh] relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 bg-[#122368] text-white w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity z-10"
        >
          <span className="text-lg font-bold">×</span>
        </button>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-16 pb-20">
          <div className="flex flex-col items-start text-left">
            {/* Profile Image */}
            <div className="w-48 h-48 bg-[#f3f3f3] overflow-hidden mb-6 flex-shrink-0">
              {director.Avatar?.url ? (
                <Image
                  src={director.Avatar.url}
                  alt={director.Name}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#99a0ae]">
                  <span className="text-6xl">👤</span>
                </div>
              )}
            </div>

            {/* Name and Title */}
            <h2 className="text-[32px] leading-[40px] tracking-[-1.28px] text-black mb-2 flex-shrink-0">
              {director.Name}
            </h2>
            <h3 className="text-title-h5 text-black mb-4 flex-shrink-0">
              {director.Role}
            </h3>

            {/* Description */}
            {director.Description && (
              <p className="font-normal text-[#525866] text-[18px] tracking-[-0.36px] mb-6 text-left flex-shrink-0">
                {director.Description}
              </p>
            )}

            {/* Biography - with scroll */}
            {director.Biography && (
              <div className="w-full mb-8 flex-shrink-0">
                <div className="max-h-[300px] overflow-y-auto pr-2">
                  <p className="font-normal text-[#525866] text-[18px] tracking-[-0.36px] text-left leading-relaxed">
                    {director.Biography}
                  </p>
                </div>
              </div>
            )}

            {/* Explore Profile Button */}
            {director.Link && (
              <a
                href={director.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#122368] text-white px-6 py-3 hover:opacity-80 transition-opacity flex-shrink-0"
              >
                Explore Profile
              </a>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        {showNavigation && onNavigate && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <button
              onClick={() => onNavigate('prev')}
              className="bg-[#122368] text-white w-10 h-10 rounded flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <RiArrowLeftLine className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('next')}
              className="bg-[#122368] text-white w-10 h-10 rounded flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <RiArrowRightLine className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


