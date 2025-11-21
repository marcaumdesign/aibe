'use client';

import { useEffect, useState } from 'react';
import DirectorsGrid from '@/components/directors-grid';
import type { Director } from '@/lib/strapi';
import { Badge } from '@/components/ui/badge';

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
      <section className='pt-16 pb-8 px-8 mobile:pt-8 mobile:pb-4 mobile:px-4'>
        <div className='mx-auto max-w-[1200px] w-full'>
          <div className='flex flex-col gap-4 mobile:gap-4 text-center items-center'>
            <Badge variant='with-dot' size='medium'>
              PEOPLE
            </Badge>
            <h1 className='text-primary-base text-title-h1 mobile:text-title-h2'>
              Board of directors
            </h1>
          </div>
        </div>
      </section>

      {/* Directors from Payload - Client Component */}
      <section className='p-8 mobile:p-4'>
        {isLoading ? (
          <div className=''>
            <div className='mx-auto max-w-[1200px] w-full'>
              <div className='grid grid-cols-4 mobile:grid-cols-1 gap-8 mobile:gap-6'>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className='animate-pulse flex flex-col items-center'>
                    <div className='bg-gray-200 w-[200px] h-[200px] rounded-full mb-4 mobile:mb-3'></div>
                    <div className='h-4 bg-gray-200 rounded w-3/4 mb-2 mobile:mb-1'></div>
                    <div className='h-3 bg-gray-200 rounded w-1/2 mb-1'></div>
                    <div className='h-3 bg-gray-200 rounded w-2/3'></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <DirectorsGrid directors={directors} />
        )}
      </section>


    </div>
  );
}

