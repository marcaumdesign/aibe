import DirectorsGrid from '@/components/directors-grid';
import { Badge } from '@/components/ui/badge';
import { getDirectors } from '@/utilities/getDirectors';

export default async function People() {
  const directors = await getDirectors();

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

      {/* Directors Grid */}
      <section className='p-8 mobile:p-4'>
        <DirectorsGrid directors={directors} />
      </section>


    </div>
  );
}

