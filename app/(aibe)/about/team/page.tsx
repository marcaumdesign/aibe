import CTA from '@/components/cta';
import DirectorsGrid from '@/components/directors-grid';
import { Badge } from '@/components/ui/badge';
import { getDirectors } from '@/utilities/getDirectors';

export default async function Team() {
  const directors = await getDirectors();

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
