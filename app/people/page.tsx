'use client';

import { useEffect, useState } from 'react';
import CTA from '@/components/cta';
import DirectorsGrid from '@/components/directors-grid';
import type { Director } from '@/lib/strapi';

export default function People() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDirectors() {
      try {
        console.log('📡 Buscando diretores via API proxy (People page)...');
        const res = await fetch('/api/directors', {
          cache: 'default'
        });

        if (!res.ok) {
          console.error('❌ Erro na API proxy:', res.status);
          setIsLoading(false);
          return;
        }

        const json = await res.json();
        const data = json.directors || [];
        console.log('📥 Diretores carregados via API (People page):', data.length);
        setDirectors(data);
        setIsLoading(false);
      } catch (error) {
        console.error('❌ Erro ao buscar diretores:', error);
        setIsLoading(false);
      }
    }
    loadDirectors();
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      {/* Header Section */}
      <section className='pt-8 pb-16 mobile:pt-4 mobile:pb-8'>
        <div className='mx-auto max-w-[1200px] w-full px-4 mobile:px-4'>
          <div className='flex flex-col gap-8 mobile:gap-4 text-center'>
            <div className='inline-flex items-center justify-center px-2 py-0.5 bg-transparent text-[#99a0ae] text-subheading-xs mobile:text-xs uppercase tracking-[0.48px]'>
              <div className='h-1 w-1 rounded-full bg-[#99a0ae] mr-2'></div>
              PEOPLE
            </div>
            <h1 className='text-title-h1 mobile:text-title-h2 text-black'>
              Board of directors
            </h1>
          </div>
        </div>
      </section>

      {/* Directors from Strapi - Client Component */}
      <div className='mb-24 mobile:mb-12'>
        {isLoading ? (
          <section className='pb-32 mobile:pb-16'>
            <div className='mx-auto max-w-[1200px] w-full px-4 mobile:px-4'>
              <div className='grid grid-cols-4 mobile:grid-cols-1 gap-8 mobile:gap-6'>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className='animate-pulse'>
                    <div className='bg-gray-200 aspect-square rounded-lg mb-4 mobile:mb-3'></div>
                    <div className='h-4 bg-gray-200 rounded w-3/4 mb-2 mobile:mb-1'></div>
                    <div className='h-3 bg-gray-200 rounded w-1/2'></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <DirectorsGrid directors={directors} />
        )}
      </div>

      {/* CTA Section */}
      <CTA />
    </div>
  );
}

