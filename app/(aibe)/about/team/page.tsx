'use client';

import { useEffect, useState } from 'react';
import CTA from '@/components/cta';
import DirectorsGrid from '@/components/directors-grid';
import type { Director } from '@/lib/strapi';
import { Badge } from '@/components/ui/badge';

export default function Team() {
  const [directors, setDirectors] = useState<Director[]>([]);

  useEffect(() => {
    async function loadDirectors() {
      try {
        console.log('📡 Buscando diretores via API proxy (Team page)...');
        const res = await fetch('/api/directors', {
          cache: 'no-store',
        });

        if (!res.ok) {
          console.error('❌ Erro na API proxy:', res.status);
          return;
        }

        const json = await res.json();
        const data = json.directors || [];
        console.log('📥 Diretores carregados via API (Team page):', data.length);
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
          <div className='flex flex-col gap-8 text-center items-center'>
            <Badge variant='with-dot' size='medium'>
              TEAM
            </Badge>
            <h1 className='text-title-h1 text-black'>
              Board of directors
            </h1>
          </div>
        </div>
      </section>

      {/* Directors from Payload - Client Component */}
      <div className='mb-24'>
        <DirectorsGrid directors={directors} />
      </div>

      {/* CTA Section */}
      <div className='mt-80 mobile:mt-48'>
        <CTA />
      </div>
    </div>
  );
}
