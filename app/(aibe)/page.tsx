import Image from 'next/image';
import BlogSection from '@/components/blog-section';
import { MainItem } from '@/components/main-item';
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
    blue: 'bg-primary-base text-text-white-0',
    gray: 'bg-text-soft-400 text-text-white-0',
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

  const dotClasses = 'h-1 w-1 rounded-full bg-text-soft-400 mr-2';

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
      <div className='relative mt-4 w-full h-[150px]'>
        <Image
          src='/images/heroimage.png'
          alt='Hero'
          fill
          className='object-cover'
        />
      </div>
      {/* Hero Section */}
      <section className='relative bg-white flex flex-col pt-4 pb-8 px-8 mobile:pt-8 mobile:pb-4 mobile:px-4'>
        <div className='w-full mx-auto flex-1 flex items-center'>
          {/* Hero Content */}
          <div className='flex flex-col mobile:flex-col items-center justify-center gap-4 w-full'>
            <div className='relative w-full mobile:w-full flex justify-center'>



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
            <div className='flex-1 px-8 mobile:px-4 flex flex-col gap-8 items-center w-full'>


              <div className='flex flex-col gap-4 items-center w-full'>
                <h1 className='text-primary-base text-title-h1'>
                  Associação Italo-Brasileira de Economia
                </h1>
                <h3 className='text-primary-base text-title-h3 text-left md:text-center'>
                  Associazione Italo-Brasiliana di Economia
                </h3>

                <p className='text-paragraph-lg text-text-sub-600'>
                  We are a bilateral, non-profit association that promotes scientific collaboration between Italian and Brazilian economists.


                </p>
              </div>




            </div>

            {/* Hero Image */}

          </div>
        </div>

        {/* Highlights Section - Controlado pelo Payload */}

      </section>


      {/* Features Section */}
      <section className='p-8 mobile:p-4'>
        <div className='mx-auto max-w-[1200px] w-full flex flex-col gap-8'>
          <div className='flex flex-col gap-4 text-start'>

            {/* <h2 className='text-title-h2 text-black animate-translate-y-16'>
              Our Main Initiatives
            </h2> */}
          </div>

          <div className='grid gap-8 md:grid-cols-3 animate-translate-y-up'>
            {/* The AIBE Annual Workshop */}
            <MainItem
              imageSrc='/images/Workshop.jpeg'
              imageAlt='The AIBE Annual Workshop'
              title='AIBE Workshop'
              description='We organize an anual academic event held alternately in both countries.'
              linkHref='/workshops/'
            />

            {/* Giorgio Mortara Prize */}
            <MainItem
              imageSrc='/images/giorgio.jpeg'
              imageAlt='Giorgio Mortara Prize'
              title='Giorgio Mortara Prize'
              description='We award a prize for the best paper by a junior Italian-Brazilian research team.'
              linkHref='/prizes'
              imageFocalPoint='top center'
            />

            {/* AIBE at a glance */}
            <MainItem
              imageSrc='/images/scientific-friendship.jpg'
              imageAlt='AIBE at a glance'
              title='Scientific Friendship'
              description='We facilitate the spread of information and promote academic mobility.'
              linkHref='/about'
            />
          </div>
        </div>
      </section>

      {highlightBanner?.enabled && (
        <HighlightBanner
          title={highlightBanner.title}
          buttonText={highlightBanner.button.text}
          buttonLink={highlightBanner.button.link}
        />
      )}

      {/* Blog Section */}
      <BlogSection />


    </div>
  );
}
