'use client';

import { RiMapPinLine, RiSendPlaneLine, RiTrophyLine } from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import { Root as Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

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

// Componente BlogSection
function BlogSection() {
  interface NewsItem {
    id: string | number;
    title: string;
    slug: string;
    description: string | null;
    image: {
      url: string;
      alternativeText?: string;
    } | null;
    date: string;
    category?: {
      name: string;
    };
  }

  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch('/api/news');
        if (res.ok) {
          const data = await res.json();
          setPosts(data.news || []);
        } else {
          console.error('Erro ao carregar notícias:', res.status);
        }
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const displayPosts = posts.slice(0, 3);

  if (loading) {
    return (
      <section className='pt-16 pb-52'>
        <div className='mx-auto max-w-[1200px] gap-8 flex flex-col w-full px-4'>
          <div className='text-center'>
            <p className='text-paragraph-lg text-text-sub-600'>Carregando notícias...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-20'>
      <div className='container mx-auto max-w-[1200px] px-4'>
        <header className='flex items-center justify-between mb-12'>
          <div>
            <span className='text-sm text-gray-400 uppercase tracking-wide'>• BLOG</span>
            <h2 className='text-title-h2 text-black mt-1'>
              Our latest news
            </h2>
          </div>
          <Link
            href='/blog'
            className='bg-[#0A1A4F] text-white text-sm font-medium px-5 py-2 hover:bg-[#0357B9] transition duration-200 ease-out'
          >
            See More
          </Link>
        </header>

        {displayPosts.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {displayPosts.map((post) => (
              <article key={post.id} className='group'>
                <Link href={`/blog/${post.slug}`}>
                  <div className='overflow-hidden rounded-md'>
                    {post.image && (
                      <div className='relative w-full aspect-square overflow-hidden'>
                        <Image
                          src={post.image.url.startsWith('http') ? post.image.url : `https://majestic-serenity-7a76c06678.strapiapp.com${post.image.url}`}
                          alt={post.image.alternativeText || post.title}
                          fill
                          className='object-cover transition-transform duration-300 group-hover:scale-105'
                          style={{ objectPosition: 'center 15%' }}
                        />
                      </div>
                    )}
                  </div>
                  <div className='mt-4 flex items-center text-sm text-gray-500 gap-2'>
                    {post.category && (
                      <span className='bg-[#0A1A4F] text-white text-[10px] font-medium px-1.5 py-0.5 uppercase tracking-wide'>
                        {post.category.name}
                      </span>
                    )}
                    <span>•</span>
                    <time>{formatDate(post.date)}</time>
                  </div>
                  <h3 className='text-title-h5 text-black mt-2'>
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className='text-sub-600 text-paragraph-lg mt-1 line-clamp-3'>
                      {post.description}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-paragraph-lg text-text-sub-600'>Nenhuma notícia disponível no momento.</p>
          </div>
        )}
      </div>
    </section>
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

                <p className='text-label-lg text-sub-600'>
                  A bilateral non-profit association dedicated to research,
                  academic cooperation, and the exchange of knowledge.
                </p>
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
                className='absolute z-10 block mobile:hidden'
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
                className='absolute z-10 block mobile:hidden'
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
                <Badge variant='with-dot' size='medium'>
                  AIBE Workshop
                </Badge>
                <h3 className='text-title-h4 text-black'>
                  The AIBE Annual Workshop
                </h3>
                <p className='text-sub-600 text-paragraph-lg flex-1'>
                  An academic event held alternately in both countries, dedicated to knowledge exchange and scientific dialogue.
                </p>
                <Button variant='primary' size='medium' className='h-hug w-fit mt-auto' asChild>
                  <Link href='/events/workshop2024'>
                    See More
                  </Link>
                </Button>
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
                <Badge variant='with-dot' size='medium'>
                  Events
                </Badge>
                <h3 className='text-title-h4 text-black'>
                  Giorgio Mortara Prize
                </h3>
                <p className='text-sub-600 text-paragraph-lg flex-1'>
                  Annual recognition for the best paper authored by young Brazilian and Italian researchers in academic collaboration.
                </p>
                <Button variant='primary' size='medium' className='h-hug w-fit mt-auto' asChild>
                  <Link href='/prizes'>
                    See More
                  </Link>
                </Button>
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
                <Badge variant='with-dot' size='medium'>
                  About AIBE
                </Badge>
                <h3 className='text-title-h4 text-black'>
                  AIBE at a glance
                </h3>
                <p className='text-sub-600 text-paragraph-lg flex-1'>
                  The AIBE – Italian-Brazilian Association of Economics is a bilateral non-profit organization dedicated to fostering scientific cooperation between Brazil and Italy.
                </p>
                <Button variant='primary' size='medium' className='h-hug w-fit mt-auto' asChild>
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
      <BlogSection />

      {/* CTA Section */}
      <section className='relative overflow-visible bg-primary-base flex justify-center pb-8 items-end h-[534px] mobile:h-auto mobile:py-16 mt-20'>
        <div className='relative z-10 mx-auto max-w-[1200px] p-16 mobile:p-8 w-full'>
          <div className='gap-8 mobile:gap-6 flex flex-col text-center relative'>
            <Image
              src='/images/bandeira cta.svg'
              alt='Brazilian and Italian flags'
              width={402}
              height={294}
              className='absolute left-1/2 transform -translate-x-1/2 top-[-320px] mobile:top-[-210px] w-auto h-[290px] mobile:h-[200px] z-20'
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
