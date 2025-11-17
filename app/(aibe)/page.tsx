'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as Button from '@/components/ui/button';
import BlogSection from '@/components/blog-section';
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

export default function Home() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative bg-white flex flex-col'>
        <div className='w-full max-w-[1200px] mx-auto px-8 mobile:px-4 flex-1 flex items-center py-8'>
          {/* Hero Content */}
          <div className='flex flex-col mobile:flex-col items-center justify-center gap-8 mobile:gap-8 w-full'>
            <div className='relative w-full mobile:w-full flex justify-center'>
              <div className='relative w-full h-[200px]'>
                <Image
                  src='/images/brasilitalia.jpg'
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
            <div className='flex-1 flex flex-col gap-8 items-center w-full'>


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

        {/* Highlights Section */}
        <div className='bg-[#f3f8ff] py-6 md:py-8'>
          <div className='w-full max-w-[1200px] mx-auto px-4 md:px-8'>
            <div className='flex flex-col items-start md:items-end justify-between gp-6 md:gap-8 md:flex-row'>
              <div className='flex-1 space-y-3 md:space-y-4'>
                <Badge variant='with-dot' size='medium'>
                  Highlights
                </Badge>
                <h2 className='text-title-h4 text-black animate-translate-y-up'>
                  AIBE Annual Workshop 2025 Dates Announced!
                </h2>
              </div>
              <Button.Root variant='primary' mode='filled' size='medium' className='h-hug' asChild>
                <Link href='/events/workshop'>
                  See Details
                </Link>
              </Button.Root>
            </div>
          </div>
        </div>
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
              <div className='relative w-full h-[250px]'>
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
              <div className='relative w-full h-[250px]'>
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
              <div className='relative w-full h-[250px]'>
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
