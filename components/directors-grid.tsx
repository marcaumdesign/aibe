'use client';

import { useState } from 'react';
import DirectorCard from '@/components/director-card';
import DirectorModal from '@/components/director-modal';
import type { Director } from '@/lib/strapi';

interface DirectorsGridProps {
  directors: Director[];
}

export default function DirectorsGrid({ directors }: DirectorsGridProps) {
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);

  const openDirectorModal = (director: Director) => {
    setSelectedDirector(director);
  };

  const closeDirectorModal = () => {
    setSelectedDirector(null);
  };

  const navigateDirector = (direction: 'prev' | 'next') => {
    if (!selectedDirector || directors.length === 0) return;

    const currentIndex = directors.findIndex(d => d.id === selectedDirector.id);
    if (currentIndex === -1) return;

    let newIndex: number;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? directors.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === directors.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedDirector(directors[newIndex]);
  };

  if (directors.length === 0) {
    return null;
  }

  return (
    <>
      <section className='pb-32'>
        <div className='mx-auto max-w-[1200px] w-full px-4'>
          <div className='grid grid-cols-4 mobile:grid-cols-1 gap-8'>
            {directors.map((director) => {
              const imageUrl = director.Avatar?.url || '';

              return (
                <DirectorCard
                  key={director.id}
                  id={director.id}
                  name={director.Name || 'Nome não disponível'}
                  role={director.Role || 'Cargo não disponível'}
                  image={imageUrl}
                  imageAlt={director.Avatar?.alternativeText}
                  clickable={true}
                  onClick={() => openDirectorModal(director)}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Director Modal */}
      <DirectorModal
        director={selectedDirector}
        onClose={closeDirectorModal}
        onNavigate={navigateDirector}
        showNavigation={true}
      />
    </>
  );
}

