'use client';

import { RiMapPinLine, RiSendPlaneLine, RiTrophyLine } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import { Root as Button } from '@/components/ui/button';

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
          <div className='flex flex-row mobile:flex-col items-center justify-between gap-16 mobile:gap-8 w-full'>
            <div className='flex-1 flex flex-col gap-8 items-start w-full'>
              <Badge variant='blue' size='medium' className='w-fit'>
                Italian-Brazilian Association of Economics
              </Badge>

              <div className='flex flex-col gap-4 items-start w-full'>
                <h1 className='text-title-h1 text-black'>
                  Connecting science, cultures, and economies.
                </h1>

                <p className='text-label-lg text-text-sub-600'>
                  A bilateral non-profit association dedicated to research,
                  academic cooperation, and the exchange of knowledge.
                </p>
              </div>

              <div className='flex flex-row mobile:flex-col gap-4 items-start w-auto mobile:w-full'>
                <Link href="/membership" className='w-auto mobile:w-full'>
                  <Button variant='primary' size='medium' className='h-hug w-auto mobile:w-full'>
                    Become a Member
                  </Button>
                </Link>
                <Button variant='neutral' mode='stroke' size='medium' className='h-hug w-auto mobile:w-full'>
                  Sign In
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className='relative w-auto mobile:w-full flex justify-center'>
              <div className='relative w-[500px] mobile:w-full max-w-[500px] h-[600px] mobile:h-[400px] z-0'>
                <Image
                  src='/images/hero.png'
                  alt='Hero'
                  fill
                  className='object-cover'
                />
              </div>

              {/* Animação Circular */}
              <div
                className='absolute z-50 block mobile:hidden'
                style={{
                  left: '-20px',
                  top: '550px'
                }}
              >
                <div className='relative w-16 h-16'>
                  {/* Camada 1 - Bandeira (interna) - sem animação */}
                  <div className='absolute inset-0 rounded-full overflow-hidden z-[100]'>
                    <Image
                      src='/images/italy-flag.png'
                      alt='Italy Flag'
                      fill
                      className='object-cover'
                    />
                  </div>

                  {/* Camada 2 - Anel médio - animação customizada */}
                  <div className='absolute inset-0 rounded-full bg-blue-100 scale-125 animate-pulse-custom z-40'></div>

                  {/* Camada 3 - Anel externo - animação mais lenta */}
                  <div className='absolute inset-0 rounded-full bg-blue-50 scale-150 animate-pulse-custom-slow z-30'></div>
                </div>
              </div>

              {/* Segunda Animação Circular */}
              <div
                className='absolute z-50 block mobile:hidden'
                style={{
                  left: '450px',
                  top: '-10px'
                }}
              >
                <div className='relative w-16 h-16'>
                  {/* Camada 1 - Bandeira (interna) - sem animação */}
                  <div className='absolute inset-0 rounded-full overflow-hidden z-[100]'>
                    <Image
                      src='/images/brazil-flag.png'
                      alt='Brazil Flag'
                      fill
                      className='object-cover'
                    />
                  </div>

                  {/* Camada 2 - Anel médio - animação customizada */}
                  <div className='absolute inset-0 rounded-full bg-blue-100 scale-125 animate-pulse-custom z-40'></div>

                  {/* Camada 3 - Anel externo - animação mais lenta */}
                  <div className='absolute inset-0 rounded-full bg-blue-50 scale-150 animate-pulse-custom-slow z-30'></div>
                </div>
              </div>
            </div>

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
              <Button variant='primary' size='medium' className='h-hug' asChild>
                <Link href='/events/workshop'>
                  See Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className='py-8'>
        <div className='mx-auto max-w-[1200px] w-full flex flex-col gap-8 px-4 md:px-8'>
          <div className='flex flex-col gap-4 text-start'>
            <Badge variant='with-dot' size='medium'>
              Features
            </Badge>
            <h2 className='text-title-h2 text-black animate-translate-y-16'>
              Our Main Initiatives
            </h2>
          </div>

          <div className='grid gap-8 md:grid-cols-3 animate-translate-y-up'>
            {/* The AIBE Annual Workshop */}
            <div className='border gap-4 border-stroke-sub-200 bg-white p-0 flex flex-col justify-start overflow-hidden'>
              <div className='relative w-full h-[250px]'>
                <Image
                  src='/images/workshops.jpg'
                  alt='The AIBE Annual Workshop'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='p-6 flex flex-col gap-4'>
                <Badge variant='with-dot' size='medium'>
                  Events & Prizes
                </Badge>
                <h3 className='text-title-h4 text-black'>
                  The AIBE Annual Workshop
                </h3>
                <p className='text-text-sub-600 text-paragraph-lg'>
                  An academic event held alternately in both countries, dedicated to knowledge exchange and scientific dialogue.
                </p>
                <Button variant='primary' size='medium' className='h-hug w-fit' asChild>
                  <Link href='/events/workshop2024'>
                    See More
                  </Link>
                </Button>
              </div>
            </div>

            {/* Giorgio Mortara Prize */}
            <div className='border gap-4 border-stroke-sub-200 bg-white p-0 flex flex-col flex-1 justify-start overflow-hidden'>
              <div className='relative w-full h-[250px]'>
                <Image
                  src='/images/premio.jpg'
                  alt='Giorgio Mortara Prize'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='p-6 flex flex-col gap-4'>
                <Badge variant='with-dot' size='medium'>
                  Events & Prizes
                </Badge>
                <h3 className='text-title-h4 text-black'>
                  Giorgio Mortara Prize
                </h3>
                <p className='text-text-sub-600 text-paragraph-lg'>
                  Annual recognition for the best paper authored by young Brazilian and Italian researchers in academic collaboration.
                </p>
                <Button variant='primary' size='medium' className='h-hug w-fit' asChild>
                  <Link href='/events'>
                    See More
                  </Link>
                </Button>
              </div>
            </div>

            {/* AIBE at a glance */}
            <div className='border gap-4 border-stroke-sub-200 bg-white p-0 flex flex-col flex-1 justify-start overflow-hidden'>
              <div className='relative w-full h-[250px]'>
                <Image
                  src='/images/estudante.png'
                  alt='AIBE at a glance'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='p-6 flex flex-col gap-4'>
                <Badge variant='with-dot' size='medium'>
                  About AIBE
                </Badge>
                <h3 className='text-title-h4 text-black'>
                  AIBE at a glance
                </h3>
                <p className='text-text-sub-600 text-paragraph-lg'>
                  The AIBE – Italian-Brazilian Association of Economics is a bilateral non-profit organization dedicated to fostering scientific cooperation between Brazil and Italy.
                </p>
                <Button variant='primary' size='medium' className='h-hug w-fit' asChild>
                  <Link href='/about'>
                    About AIBE
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className='pt-16 pb-52'>
        <div className='mx-auto max-w-[1200px] gap-8 flex flex-col w-full px-4'>
          <div className='flex flex-col items-start justify-between gap-8 md:items-end md:flex-row'>
            <div className='flex-1 gap-4 flex flex-col'>
              <Badge variant='with-dot' size='medium'>
                Blog
              </Badge>
              <h2 className='text-title-h2 text-black'>
                Our latest news
              </h2>
            </div>
            <Button variant='primary' size='medium' className='h-hug' asChild>
              <Link href='/blog'>
                See More
              </Link>
            </Button>
          </div>

          <div className='grid gap-8 md:grid-cols-3'>
            {/* Blog Post 1 */}
            <article className='gap-4 flex flex-col'>
              <Image
                src='/images/image blog 1.png'
                alt='Meeting with the Italian Consul-General in São Paulo, Domenico Fornara'
                width={300}
                height={300}
                className='h-[300px] w-full object-cover'
              />
              <div className='flex items-center gap-2'>
                <Badge variant='blue' size='small'>
                  NEWS
                </Badge>
                <span className='text-black'>•</span>
                <span className='text-paragraph-md text-black'>July 3, 2024</span>
              </div>
              <h3 className='text-title-h5 text-black'>
                Meeting with the Italian Consul-General in São Paulo, Domenico
                Fornara
              </h3>
              <p className='text-text-sub-600 text-paragraph-lg'>
                AIBE representatives met with the Consul-General to strengthen
                institutional ties and promote academic cooperation.
              </p>
            </article>

            {/* Blog Post 2 */}
            <article className='gap-4 flex flex-col'>
              <Image
                src='/images/image blog 2.png'
                alt='Academic cooperation as a driver of innovation in economics'
                width={300}
                height={300}
                className='h-[300px] w-full object-cover'
              />
              <div className='flex items-center gap-2'>
                <Badge variant='blue' size='small'>
                  BLOG
                </Badge>
                <span className='text-black'>•</span>
                <span className='text-paragraph-md text-black'>June 26, 2024</span>
              </div>
              <h3 className='text-title-h5 text-black'>
                Academic cooperation as a driver of innovation in economics
              </h3>
              <p className='text-text-sub-600 text-paragraph-lg'>
                Brazilian and Italian researchers explore how international
                partnerships enhance the relevance and impact of economic
                research.
              </p>
            </article>

            {/* Blog Post 3 */}
            <article className='gap-4 flex flex-col'>
              <Image
                src='/images/image blog 3.png'
                alt='AIBE presented at FAPESP Day of Italy event'
                width={300}
                height={300}
                className='h-[300px] w-full object-cover'
              />
              <div className='flex items-center gap-2'>
                <Badge variant='blue' size='small'>
                  NEWS
                </Badge>
                <span className='text-black'>•</span>
                <span className='text-paragraph-md text-black'>June 14, 2024</span>
              </div>
              <h3 className='text-title-h5 text-black'>
                AIBE presented at FAPESP&apos;s &quot;Day of Italy&quot; event
              </h3>
              <p className='text-text-sub-600 text-paragraph-lg'>
                The presentation emphasized Italian-Brazilian academic
                cooperation and the association&apos;s scientific initiatives.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative overflow-visible bg-primary-base flex justify-center pb-8 items-end h-[534px] mobile:h-auto mobile:py-16'>
        <div className='relative z-10 mx-auto max-w-[1200px] p-16 mobile:p-8 w-full'>
          <div className='gap-8 mobile:gap-6 flex flex-col text-center relative'>
            <Image
              src='/images/bandeira cta.svg'
              alt='Brazilian and Italian flags'
              width={402}
              height={294}
              className='absolute left-1/2 transform -translate-x-1/2 top-[-330px] mobile:top-[-200px] w-auto h-[300px] mobile:h-[200px] z-20'
            />

            <div className='text-center gap-4 mobile:gap-3 flex max-w-[700px] flex-col mx-auto'>
              <h2 className='text-title-h2 mobile:text-title-h3 text-white'>
                Join AIBE and Strengthen Academic Cooperation
              </h2>
              <p className='text-paragraph-lg mobile:text-paragraph-md text-white'>
                By joining AIBE, you will engage with researchers, access unique
                opportunities, and support initiatives that unite Brazil and Italy
                in economic research.
              </p>
            </div>

            <Link href="/membership">
              <Button variant='neutral' mode='lighter' size='medium' className='h-hug w-fit mobile:w-full self-center'>
                Become a Member
              </Button>
            </Link>
          </div>
        </div>

      </section>



    </div>
  );
}
