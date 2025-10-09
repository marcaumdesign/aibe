'use client';

import { RiMapPinLine, RiSendPlaneLine, RiTrophyLine } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import { Root as Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
      <section className='relative bg-white h-[calc(100vh-80px)] flex flex-col'>
        <div className='w-full max-w-[1200px] mx-auto flex-1 flex items-center'>
          {/* Hero Content */}
          <div className='flex flex-col items-center justify-between gap-16 lg:flex-row w-full'>
            <div className='flex-1 flex flex-col gap-8 overflow-hidden items-start'>
              <Badge variant='blue' size='medium' className='w-fit'>
                Italian-Brazilian Association of Economics
              </Badge>

              <div className='flex flex-col gap-4 items-start'>
                <motion.h1
                  className='text-title-h1 text-black'
                  initial={{ opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  Connecting science, cultures, and economies.
                </motion.h1>

                <motion.p
                  className='text-label-lg text-sub-600'
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                >
                  A bilateral non-profit association dedicated to research,
                  academic cooperation, and the exchange of knowledge.
                </motion.p>
              </div>

              <div className='flex flex-col gap-4 sm:flex-row items-start'>
                <Button variant='primary' size='medium' className='h-hug'>
                  Become a Member
                </Button>
                <Button variant='neutral' mode='stroke' size='medium' className='h-hug'>
                  Sign In
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className='relative'>
              <div className='relative w-[500px] h-[600px] z-0'>
                <Image
                  src='/images/hero.png'
                  alt='Hero'
                  fill
                  className='object-cover'
                />
              </div>

              {/* Animação Circular */}
              <div
                className='absolute z-50'
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
                className='absolute z-50'
                style={{
                  left: '450px',
                  top: '50px'
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
        <div className='bg-[#f3f8ff] py-8'>
          <div className='w-full max-w-[1200px] mx-auto'>
            <div className='flex flex-col items-end justify-between gap-8 md:flex-row'>
              <div className='flex-1 space-y-4'>
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
      <section className='py-32'>
        <div className='mx-auto max-w-[1200px] w-full flex flex-col gap-8'>
          <div className='flex flex-col gap-4 text-start'>
            <Badge variant='with-dot' size='medium'>
              Features
            </Badge>
            <h2 className='text-title-h2 text-black animate-translate-y-16'>
              Our Main Initiatives
            </h2>
          </div>

          <div className='grid gap-8 md:grid-cols-3 animate-translate-y-up'>
            {/* Academic Mobility */}
            <div className='border gap-4 border-stroke-sub-200 bg-neutral-100 p-6 flex flex-col justify-start'>
              <div>
                <RiMapPinLine className='text-primary-base w-8 h-8' />
              </div>
              <h3 className='text-title-h4 text-black'>
                Academic Mobility
              </h3>
              <p className='text-sub-600 text-paragraph-lg'>
                Encouraging the exchange of researchers, faculty, and students
                between Brazil and Italy.
              </p>
            </div>


            {/* Events and Awards */}
            <div className='border gap-4 border-stroke-sub-200 bg-neutral-100 p-6 flex flex-col flex-1 justify-start'>
              <div>
                <RiTrophyLine className='text-primary-base w-8 h-8' />
              </div>
              <h3 className='text-title-h4 text-black'>
                Events and Awards
              </h3>
              <p className='text-sub-600 text-paragraph-lg'>
                Annual workshops and the Giorgio Mortara Prize strengthen
                scientific cooperation.
              </p>
            </div>

            {/* Research Sharing */}
            <div className='border gap-4 border-stroke-sub-200 bg-neutral-100 p-6 flex flex-col flex-1 justify-start'>
              <div>
                <RiSendPlaneLine className='text-primary-base w-8 h-8' />
              </div>
              <h3 className='text-title-h4 text-black'>
                Research Sharing
              </h3>
              <p className='text-sub-600 text-paragraph-lg'>
                Newsletters, publications, and research opportunities for the
                academic community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About AIBE Section */}
      <section className='bg-primary-base py-16'>
        <div className='mx-auto max-w-[1200px] gap-8 flex flex-col w-full'>
          <div className='flex flex-col items-end gap-8 lg:flex-row'>
            <div className='flex-1 gap-4 flex flex-col'>
              <Badge variant='with-dot' size='medium'>
                About AIBE
              </Badge>
              <h2 className='text-title-h2 text-white'>
                AIBE at a glance
              </h2>
            </div>
            <Button variant='neutral' mode='lighter' size='medium' className='h-hug' asChild>
              <Link href='/about'>
                About AIBE
              </Link>
            </Button>
          </div>

          <div className='flex flex-col items-start gap-8 lg:flex-row'>
            <div className='flex-1 h-[400px]'>
              <Image
                src='/images/estudante.png'
                alt='AIBE representative with Italian and Brazilian flags'
                width={400}
                height={400}
                className='h-[400px] w-full object-cover'
              />
            </div>
            <div className='flex-1 gap-4 flex flex-col text-justify'>
              <p className='text-paragraph-lg text-white'>
                The AIBE – Italian-Brazilian Association of Economics is a bilateral non-profit organization dedicated to fostering scientific cooperation between Brazil and Italy. The association seeks to strengthen the intellectual and cultural ties that unite both countries, providing a space for dialogue and collaboration with a special focus on the field of economics. We facilitate research collaboration between Brazilian and Italian economists. We also promote links between academia, policy-makers and industry.
              </p>
              <p className='text-paragraph-lg text-white'>
                AIBE is governed by a Board of Directors, who
                are elected for three years by the Members&apos; Assembly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className='py-32'>
        <div className='mx-auto max-w-[1200px] gap-8 flex flex-col w-full'>
          <div className='grid gap-4 md:grid-cols-3'>
            <div className='text-center gap-4 flex flex-col'>
              <div className='text-title-h0 text-primary-base'>
                279
              </div>
              <h3 className='text-title-h4 text-black'>
                Participating Researchers
              </h3>
              <p className='text-sub-600 text-paragraph-lg'>
                567 researchers have already taken part in AIBE meetings.
              </p>
            </div>

            <div className='text-center gap-4 flex flex-col'>
              <div className='text-title-h0 text-primary-base'>
                63
              </div>
              <h3 className='text-title-h4 text-black'>
                Institutions Involved
              </h3>
              <p className='text-sub-600 text-paragraph-lg'>
                Partnership with more than XX universities and research centers
                in Brazil and Italy.
              </p>
            </div>

            <div className='text-center gap-4 flex flex-col'>
              <div className='text-title-h0 text-primary-base'>
                34
              </div>
              <h3 className='text-title-h4 text-black'>
                Students Supported
              </h3>
              <p className='text-sub-600 text-paragraph-lg'>
                XX students and researchers supported in exchange programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className='py-8'>
        <div className='mx-auto max-w-[1200px] w-full'>
          <div className='flex flex-col gap-16'>
            {/* AIBE Annual Workshop */}
            <div className='flex flex-col items-center gap-16 lg:flex-row'>
              <div className='flex-1 flex flex-col gap-4'>
                <Image
                  src='/images/workshops.jpg'
                  alt='AIBE Annual Workshop'
                  width={600}
                  height={600}
                  className='h-[600px] w-full object-cover'
                />
              </div>
              <div className='flex-1 flex flex-col gap-4 items-start'>
                <Badge variant='with-dot' size='medium'>
                  Events & Prizes
                </Badge>
                <h2 className='text-title-h2 text-black'>
                  The AIBE Annual Workshop
                </h2>
                <p className='text-paragraph-lg text-sub-600'>
                  An academic event held alternately in both countries,
                  dedicated to knowledge exchange and scientific dialogue.
                </p>
                <Button variant='primary' size='medium' className='h-hug' asChild>
                  <Link href='/events/workshop2024'>
                    See More
                  </Link>
                </Button>
              </div>
            </div>

            {/* Giorgio Mortara Prize */}
            <div className='flex flex-col items-center gap-16 lg:flex-row-reverse'>
              <div className='flex-1 flex flex-col gap-4'>
                <Image
                  src='/images/premio.jpg'
                  alt='Giorgio Mortara Prize'
                  width={600}
                  height={600}
                  className='h-[600px] w-full object-cover'
                />
              </div>
              <div className='flex-1 flex flex-col gap-4 items-start'>
                <Badge variant='with-dot' size='medium'>
                  Events & Prizes
                </Badge>
                <h2 className='text-title-h2 text-black'>
                  Giorgio Mortara Prize
                </h2>
                <p className='text-paragraph-lg text-sub-600'>
                  Annual recognition for the best paper authored by young
                  Brazilian and Italian researchers in academic collaboration.
                </p>
                <Button variant='primary' size='medium' className='h-hug' asChild>
                  <Link href='/events'>
                    See More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className='pt-16 pb-52'>
        <div className='mx-auto max-w-[1200px] gap-8 flex flex-col w-full'>
          <div className='flex flex-col items-end justify-between gap-8 md:flex-row'>
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
              <p className='text-sub-600 text-paragraph-lg'>
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
              <p className='text-sub-600 text-paragraph-lg'>
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
              <p className='text-sub-600 text-paragraph-lg'>
                The presentation emphasized Italian-Brazilian academic
                cooperation and the association&apos;s scientific initiatives.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative overflow-visible bg-primary-base flex justify-center pb-8 items-end h-[534px]'>
        <div className='relative z-10 mx-auto max-w-[1200px] p-16 w-full'>
          <div className='gap-8 flex flex-col text-center relative'>
            <Image
              src='/images/bandeira cta.svg'
              alt='Brazilian and Italian flags'
              width={402}
              height={294}
              className='absolute left-1/2 transform -translate-x-1/2 top-[-330px] w-auto h-[300px] z-20'
            />

            <div className='text-center gap-4 flex max-w-[700px] flex-col mx-auto'>
              <h2 className='text-title-h2 text-white'>
                Join AIBE and Strengthen Academic Cooperation
              </h2>
              <p className='text-paragraph-lg text-white'>
                By joining AIBE, you will engage with researchers, access unique
                opportunities, and support initiatives that unite Brazil and Italy
                in economic research.
              </p>
            </div>

            <Button variant='neutral' mode='lighter' size='medium' className='h-hug w-fit self-center'>
              Become a Member
            </Button>
          </div>
        </div>

      </section>



    </div>
  );
}
