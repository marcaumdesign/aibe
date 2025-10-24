'use client';

import { useEffect, useState } from 'react';
import CTA from '@/components/cta';
import DirectorsGrid from '@/components/directors-grid';
import type { Director } from '@/lib/strapi';

export default function People() {
  const [directors, setDirectors] = useState<Director[]>([]);

  useEffect(() => {
    async function loadDirectors() {
      try {
        console.log('📡 Buscando diretores via API proxy (People page)...');
        const res = await fetch('/api/directors', {
          cache: 'no-store',
        });

        if (!res.ok) {
          console.error('❌ Erro na API proxy:', res.status);
          return;
        }

        const json = await res.json();
        const data = json.directors || [];
        console.log('📥 Diretores carregados via API (People page):', data.length);
        setDirectors(data);
      } catch (error) {
        console.error('❌ Erro ao buscar diretores:', error);
      }
    }
    loadDirectors();
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      {/* Header Section */}
      <section className='pt-8 pb-16'>
        <div className='mx-auto max-w-[1200px] w-full px-4'>
          <div className='flex flex-col gap-8 text-center'>
            <div className='inline-flex items-center justify-center px-2 py-0.5 bg-transparent text-[#99a0ae] text-subheading-xs uppercase tracking-[0.48px]'>
              <div className='h-1 w-1 rounded-full bg-[#99a0ae] mr-2'></div>
              PEOPLE
            </div>
            <h1 className='text-title-h1 text-black'>
              Board of directors
            </h1>
          </div>
        </div>
      </section>

      {/* Directors from Strapi - Client Component */}
      <div className='mb-24'>
        <DirectorsGrid directors={directors} />
      </div>

      {/* CTA Section */}
      <CTA />
    </div>
  );
}

