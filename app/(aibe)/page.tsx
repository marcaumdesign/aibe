import Image from 'next/image';
import Link from 'next/link';
import * as Button from '@/components/ui/button';
import BlogSection from '@/components/blog-section';
import { HighlightBanner } from '@/globals/HighlightBanner/Component';
import { getCachedGlobal } from '@/utilities/getGlobals';
import type { HighlightBanner as HighlightBannerType } from '@/payload-types';
// export const metadata: Metadata = {
//   title: 'AIBE - Italian-Brazilian Association of Economics',
//   description:
//     'Connecting science, cultures, and economies. A bilateral non-profit association dedicated to research, academic cooperation, and the exchange of knowledge.',
// };

// Componente Badge reutilizável
function Badge({
  children,
  variant = 'blue',
  size = 'medium',
  withDot = false,
  className,
}: {
  children: React.ReactNode;
  variant?: 'blue' | 'gray' | 'with-dot';
  size?: 'small' | 'medium';
  withDot?: boolean;
  className?: string;
}) {
  const getBaseClasses = () => {
    if (variant === 'with-dot') {
      return 'inline-flex items-center font-medium';
    }
    return 'inline-flex items-center justify-center font-medium';
  };
  const variantClasses = {
    blue: 'bg-[#122368] text-white',
    gray: 'bg-[#99a0ae] text-white',
    'with-dot': 'bg-transparent text-text-soft-400',
  };
  const sizeClasses = {
    small: 'px-2 py-0.5 text-label-xs',
    medium: 'px-2 py-0.5 text-label-sm',
  };

  const getTextSize = () => {
    if (variant === 'with-dot') {
      return 'text-subheading-xs uppercase px-0 py-0';
    }
    return sizeClasses[size];
  };

  const dotClasses = 'h-1 w-1 rounded-full bg-[#99a0ae] mr-2';

  return (
    <span
      className={`${getBaseClasses()} ${variantClasses[variant]} ${getTextSize()} ${className}`}
    >
      {(variant === 'with-dot' || withDot) && <div className={dotClasses}></div>}
      {children}
    </span>
  );
}

export default async function Home() {
  // Buscar dados do Highlight Banner
  const highlightBanner = (await getCachedGlobal('highlight-banner', 0)()) as HighlightBannerType;

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative bg-white flex flex-col'>
        <div className='w-full  mobile:px-4 flex-1 flex items-center pt-4 pb-8'>
          {/* Hero Content */}
          <div className='flex flex-col mobile:flex-col items-center justify-center gap-8 mobile:gap-8 w-full'>
            <div className='relative w-full mobile:w-full flex justify-center'>
              <div className='relative w-full h-[200px]'>
                <Image
                  src='/images/heroimage.png'
                  alt='Hero'
                  fill
                  className='object-cover'
                />
              </div>


              {/* <div
                className='absolute z-10 block mobile:hidden'
                style={{
                  left: '-20px',
                  top: '550px'
                }}
              >
                <div className='relative w-16 h-16'>
                  <div className='absolute inset-0 rounded-full overflow-hidden z-[100]'>
                    <Image
                      src='/images/italy-flag.png'
                      alt='Italy Flag'
                      fill
                      className='object-cover'
                    />
                  </div>

                  <div className='absolute inset-0 rounded-full bg-blue-100 scale-125 animate-pulse-custom z-40'></div>

                  <div className='absolute inset-0 rounded-full bg-blue-50 scale-150 animate-pulse-custom-slow z-30'></div>
                </div>
              </div>

              
              <div
                className='absolute z-10 block mobile:hidden'
                style={{
                  left: '450px',
                  top: '-10px'
                }}
              >
                <div className='relative w-16 h-16'>
                  <div className='absolute inset-0 rounded-full overflow-hidden z-[100]'>
                    <Image
                      src='/images/brazil-flag.png'
                      alt='Brazil Flag'
                      fill
                      className='object-cover'
                    />
                  </div>

                  <div className='absolute inset-0 rounded-full bg-blue-100 scale-125 animate-pulse-custom z-40'></div>

                  <div className='absolute inset-0 rounded-full bg-blue-50 scale-150 animate-pulse-custom-slow z-30'></div>
                </div>
              </div> */}
            </div>
            <div className='flex-1 px-8 flex flex-col gap-8 items-center w-full'>


              <div className='flex flex-col gap-4 items-center w-full'>
                <h1 className='text-title-h1 text-text-strong-950'>
                  Associação Italo-Brasileira de Economia
                </h1>
                <h1 className='text-title-h3 text-center text-text-strong-950'>
                  Associazione Italo-Brasiliana di Economia
                </h1>

                <p className='text-label-lg text-text-sub-600'>
                  We are a bilateral, non-profit association that promotes scientific collaboration between Italian and Brazilian economists.


                </p>
              </div>




            </div>

            {/* Hero Image */}

          </div>
        </div>

        {/* Highlights Section - Controlado pelo Payload */}
        {highlightBanner?.enabled && (
          <HighlightBanner
            title={highlightBanner.title}
            buttonText={highlightBanner.button.text}
            buttonLink={highlightBanner.button.link}
          />
        )}
      </section>


      {/* Features Section */}
      <section className='py-8'>
        <div className='mx-auto max-w-[1200px] w-full flex flex-col gap-8 px-4 md:px-8'>
          <div className='flex flex-col gap-4 text-start'>

            {/* <h2 className='text-title-h2 text-black animate-translate-y-16'>
              Our Main Initiatives
            </h2> */}
          </div>

          <div className='grid gap-8 md:grid-cols-3 animate-translate-y-up'>
            {/* The AIBE Annual Workshop */}
            <div className='border gap-4 border-stroke-sub-200 bg-white p-0 flex flex-col justify-start overflow-hidden h-full'>
              <div className='relative w-full h-[300px]'>
                <Image
                  src='/images/workshops.jpg'
                  alt='The AIBE Annual Workshop'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='p-6 flex flex-col gap-4 flex-1'>

                <h3 className='text-title-h4 text-black'>
                  AIBE Workshop
                </h3>
                <p className='text-sub-600 text-paragraph-lg flex-1'>
                  We organize an anual academic event held alternately in both countries.
                </p>
                <Button.Root variant='primary' size='medium' className='h-hug w-fit mt-auto' asChild>
                  <Link href='/events/workshop2024'>
                    See More
                  </Link>
                </Button.Root>
              </div>
            </div>

            {/* Giorgio Mortara Prize */}
            <div className='border gap-4 border-stroke-sub-200 bg-white p-0 flex flex-col flex-1 justify-start overflow-hidden h-full'>
              <div className='relative w-full h-[300px]'>
                <Image
                  src='/images/premio.jpg'
                  alt='Giorgio Mortara Prize'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='p-6 flex flex-col gap-4 flex-1'>

                <h3 className='text-title-h4 text-black'>
                  Giorgio Mortara Prize
                </h3>
                <p className='text-sub-600 text-paragraph-lg flex-1'>
                  We award a prize for the best paper by a junior Italian-Brazilian research team.
                </p>
                <Button.Root variant='primary' size='medium' className='h-hug w-fit mt-auto' asChild>
                  <Link href='/prizes'>
                    See More
                  </Link>
                </Button.Root>
              </div>
            </div>

            {/* AIBE at a glance */}
            <div className='border gap-4 border-stroke-sub-200 bg-white p-0 flex flex-col flex-1 justify-start overflow-hidden h-full'>
              <div className='relative w-full h-[300px]'>
                <Image
                  src='/images/estudante.png'
                  alt='AIBE at a glance'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='p-6 flex flex-col gap-4 flex-1'>

                <h3 className='text-title-h4 text-black'>
                  Scientific Friendship
                </h3>
                <p className='text-sub-600 text-paragraph-lg flex-1'>
                  We facilitate the spread of information and promote academic mobility.
                </p>
                <Button.Root variant='primary' size='medium' className='h-hug w-fit mt-auto' asChild>
                  <Link href='/about'>
                    See More
                  </Link>
                </Button.Root>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />


    </div>
  );
}
