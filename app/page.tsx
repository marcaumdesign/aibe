import { RiMapPinLine, RiSendPlaneLine, RiTrophyLine } from '@remixicon/react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'AIBE - Italian-Brazilian Association of Economics',
  description:
    'Connecting science, cultures, and economies. A bilateral non-profit association dedicated to research, academic cooperation, and the exchange of knowledge.',
};

// Componente Badge reutilizável
function Badge({
  children,
  variant = 'blue',
  size = 'medium',
  className,
}: {
  children: React.ReactNode;
  variant?: 'blue' | 'gray';
  size?: 'small' | 'medium';
  className?: string;
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium';
  const variantClasses = {
    blue: 'bg-[#122368] text-white',
    gray: 'bg-[#99a0ae] text-white',
  };
  const sizeClasses = {
    small: 'px-2 py-0.5 text-label-xs',
    medium: 'px-2 py-0.5 text-label-sm',
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}

// Componente Button reutilizável
function Button({
  children,
  variant = 'primary',
  size = 'medium',
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-[#323232] text-white hover:bg-[#0f1d5a]',
    secondary:
      'bg-white text-[#525866] border border-[#e1e4ea] hover:bg-gray-50',
  };
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
}

export default function Home() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative bg-white py-16'>
        <div className='mx-auto max-w-7xl px-8'>
          {/* Header */}
          <header className='mb-16 flex items-center justify-between'>
            {/* Logo */}
            <div className='flex items-center gap-2'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#122368]'>
                <span className='text-xl font-bold text-white'>S</span>
              </div>
              <span className='text-3xl font-semibold tracking-tight text-primary-base'>
                AIBE
              </span>
            </div>

            {/* Navigation */}
            <nav className='text-lg hidden items-center gap-8 font-medium text-black md:flex'>
              <a
                href='#about'
                className='transition-colors hover:text-primary-base'
              >
                About AIBE
              </a>
              <a
                href='#events'
                className='transition-colors hover:text-primary-base'
              >
                Events & Prizes
              </a>
              <a
                href='#membership'
                className='transition-colors hover:text-primary-base'
              >
                Membership
              </a>
              <a
                href='/blog'
                className='transition-colors hover:text-primary-base'
              >
                Blog
              </a>
              <a
                href='#contact'
                className='transition-colors hover:text-primary-base'
              >
                Contact
              </a>
            </nav>

            {/* CTA Button */}
            <Button variant='primary' size='medium'>
              Become a Member
            </Button>
          </header>

          {/* Hero Content */}
          <div className='flex flex-col items-center gap-16 lg:flex-row'>
            <div className='flex-1 space-y-6'>
              <Badge variant='blue' size='medium'>
                Italian-Brazilian Association of Economics
              </Badge>

              <h1 className='text-title-h1 text-black'>
                Connecting science, cultures, and economies.
              </h1>

              <p className='text-label-lg text-text-sub-600'>
                A bilateral non-profit association dedicated to research,
                academic cooperation, and the exchange of knowledge.
              </p>

              <div className='flex flex-col gap-4 sm:flex-row'>
                <Button variant='primary' size='medium'>
                  Become a Member
                </Button>
                <Button variant='secondary' size='medium'>
                  Sign In
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className='flex-1'>
              <div className='relative'>
                <div className='relative h-[500px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#122368] to-[#1b8231]'>
                  {/* Placeholder para imagem hero */}
                  <div className='text-2xl absolute inset-0 flex items-center justify-center font-semibold text-white'>
                    Hero 
                  </div>

                  {/* Elementos decorativos */}
                  <div className='absolute right-8 top-8 h-20 w-20 rounded-full bg-white opacity-20'></div>
                  <div className='absolute bottom-8 left-8 h-16 w-16 rounded-full bg-[#00933f] opacity-80'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className='bg-[#f3f8ff] py-16'>
        <div className='mx-auto max-w-[1200px] px-8'>
          <div className='flex flex-col items-end justify-between gap-8 md:flex-row'>
            <div className='flex-1 space-y-4'>
              <div className='flex items-center gap-2'>
                <div className='h-1 w-1 rounded-full bg-[#99a0ae]'></div>
                <span className='text-label-xs font-medium uppercase tracking-wider text-[#99a0ae]'>
                  Highlights
                </span>
              </div>
              <h2 className='text-title-h4 text-black'>
                AIBE Annual Workshop 2025 Dates Announced!
              </h2>
            </div>
            <Button variant='primary' size='medium'>
              See Details
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16'>
        <div className='mx-auto max-w-[1200px] px-8'>
          <div className='mb-8 text-start'>
            <div className='mb-4 flex items-center justify-start gap-2'>
              <div className='h-1 w-1 rounded-full bg-[#99a0ae]'></div>
              <span className='text-label-xs font-medium uppercase tracking-wider text-[#99a0ae]'>
                Features
              </span>
            </div>
            <h2 className='text-title-h2 text-black'>
              Our Main Initiatives
            </h2>
          </div>

          <div className='grid gap-8 md:grid-cols-3'>
            {/* Academic Mobility */}
            <div className='rounded-lg border border-[#e1e4ea] bg-[#f3f3f3] p-6'>
              <div className='mb-4 flex h-8 w-8 items-center justify-center rounded-lg '>
               <RiMapPinLine className='text-primary-base' />
              </div>
              <h3 className='text-title-h4 mb-4 font-semibold text-black'>
                Academic Mobility
              </h3>
              <p className='text-[#525866]'>
                Encouraging the exchange of researchers, faculty, and students
                between Brazil and Italy.
              </p>
            </div>
        

            {/* Events and Awards */}
            <div className='rounded-lg border border-[#e1e4ea] bg-[#f3f3f3] p-6'>
              <div className='mb-4 flex h-8 w-8 items-center justify-center rounded-lg '>
                <RiTrophyLine className='text-primary-base' />
              </div>
              <h3 className='text-title-h4 mb-4 font-semibold text-black'>
                Events and Awards
              </h3>
              <p className='text-[#525866]'>
                Annual workshops and the Giorgio Mortara Prize strengthen
                scientific cooperation.
              </p>
            </div>

            {/* Research Sharing */}
            <div className='rounded-lg border border-[#e1e4ea] bg-[#f3f3f3] p-6'>
              <div className='mb-4 flex h-8 w-8 items-center justify-center rounded-lg '>
              <RiSendPlaneLine className='text-primary-base' />
              </div>
              <h3 className='text-title-h4 mb-4 font-semibold text-black'>
                Research Sharing
              </h3>
              <p className='text-[#525866]'>
                Newsletters, publications, and research opportunities for the
                academic community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About AIBE Section */}
      <section className='bg-[#f3f8ff] py-16'>
        <div className='mx-auto max-w-7xl px-8'>
          <div className='mb-16 flex flex-col items-end justify-between gap-8 lg:flex-row'>
            <div className='flex-1 space-y-4'>
              <div className='flex items-center gap-2'>
                <div className='h-1 w-1 rounded-full bg-[#99a0ae]'></div>
                <span className='text-label-xs font-medium uppercase tracking-wider text-[#99a0ae]'>
                  About AIBE
                </span>
              </div>
              <h2 className='text-title-h2 text-white'>
                AIBE at a glance
              </h2>
            </div>
            <Button variant='secondary' size='medium'>
              About AIBE
            </Button>
          </div>

          <div className='flex flex-col items-start gap-8 lg:flex-row'>
            <div className='flex-1'>
              <div className='text-2xl flex h-[400px] w-full items-center justify-center rounded-lg bg-[#122368] font-semibold text-white'>
                About Image
              </div>
            </div>
            <div className='flex-1 space-y-4 text-white'>
              <p className='text-lg leading-relaxed text-text-strong-950'>
                The AIBE – Italian-Brazilian Association of Economics is a
                bilateral non-profit organization dedicated to fostering
                scientific cooperation between Brazil and Italy. The association
                seeks to strengthen the intellectual and cultural ties that
                unite both countries, providing a space for dialogue and
                collaboration with a special focus on the field of economics.
              </p>
              <p className='text-lg leading-relaxed'>
                We facilitate research collaboration between Brazilian and
                Italian economists. We also promote links between academia,
                policy-makers and industry.
              </p>
              <p className='text-lg leading-relaxed'>
                AIBE is governed by a <strong>Board of Directors</strong>, who
                are elected for three years by the Members' Assembly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className='py-16'>
        <div className='mx-auto max-w-7xl px-8'>
          <div className='grid gap-8 md:grid-cols-3'>
            <div className='space-y-4 text-center'>
              <div className='text-title-h0 font-semibold leading-none text-primary-base'>
                279
              </div>
              <h3 className='text-title-h4 font-semibold text-black'>
                Participating Researchers
              </h3>
              <p className='text-[#525866]'>
                567 researchers have already taken part in AIBE meetings.
              </p>
            </div>

            <div className='space-y-4 text-center'>
              <div className='text-title-h0 font-semibold leading-none text-primary-base'>
                63
              </div>
              <h3 className='text-title-h4 font-semibold text-black'>
                Institutions Involved
              </h3>
              <p className='text-[#525866]'>
                Partnership with more than XX universities and research centers
                in Brazil and Italy.
              </p>
            </div>

            <div className='space-y-4 text-center'>
              <div className='text-title-h0 font-semibold leading-none text-primary-base'>
                34
              </div>
              <h3 className='text-title-h4 font-semibold text-black'>
                Students Supported
              </h3>
              <p className='text-[#525866]'>
                XX students and researchers supported in exchange programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className='py-16'>
        <div className='mx-auto max-w-7xl px-8'>
          <div className='space-y-16'>
            {/* AIBE Annual Workshop */}
            <div className='flex flex-col items-center gap-16 lg:flex-row'>
              <div className='flex-1'>
                <div className='text-xl flex h-[500px] w-full items-center justify-center rounded-lg border border-[#e1e4ea] bg-[#f3f3f3] text-[#525866]'>
                  Workshop Image
                </div>
              </div>
              <div className='flex-1 space-y-6'>
                <div className='flex items-center gap-2'>
                  <div className='h-1 w-1 rounded-full bg-[#99a0ae]'></div>
                  <span className='text-label-xs font-medium uppercase tracking-wider text-[#99a0ae]'>
                    Events & Prizes
                  </span>
                </div>
                <h2 className='text-title-h2 text-black'>
                  The AIBE Annual Workshop
                </h2>
                <p className='text-lg text-[#525866]'>
                  An academic event held alternately in both countries,
                  dedicated to knowledge exchange and scientific dialogue.
                </p>
                <Button variant='primary' size='medium'>
                  See More
                </Button>
              </div>
            </div>

            {/* Giorgio Mortara Prize */}
            <div className='flex flex-col items-center gap-16 lg:flex-row-reverse'>
              <div className='flex-1'>
                <div className='text-xl flex h-[500px] w-full items-center justify-center rounded-lg border border-[#e1e4ea] bg-[#f3f3f3] text-[#525866]'>
                  Prize Image
                </div>
              </div>
              <div className='flex-1 space-y-6'>
                <div className='flex items-center gap-2'>
                  <div className='h-1 w-1 rounded-full bg-[#99a0ae]'></div>
                  <span className='text-label-xs font-medium uppercase tracking-wider text-[#99a0ae]'>
                    Events & Prizes
                  </span>
                </div>
                <h2 className='text-title-h2 text-black'>
                  Giorgio Mortara Prize
                </h2>
                <p className='text-lg text-[#525866]'>
                  Annual recognition for the best paper authored by young
                  Brazilian and Italian researchers in academic collaboration.
                </p>
                <Button variant='primary' size='medium'>
                  See More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className='py-16'>
        <div className='mx-auto max-w-7xl px-8'>
          <div className='mb-16 flex flex-col items-end justify-between gap-8 md:flex-row'>
            <div className='flex-1 space-y-4'>
              <div className='flex items-center gap-2'>
                <div className='h-1 w-1 rounded-full bg-[#99a0ae]'></div>
                <span className='text-label-xs font-medium uppercase tracking-wider text-[#99a0ae]'>
                  Blog
                </span>
              </div>
              <h2 className='text-title-h2 text-black'>
                Our latest news
              </h2>
            </div>
            <Button variant='primary' size='medium'>
              See More
            </Button>
          </div>

          <div className='grid gap-8 md:grid-cols-3'>
            {/* Blog Post 1 */}
            <article className='space-y-4'>
              <div className='flex h-[300px] w-full items-center justify-center rounded-lg border border-[#e1e4ea] bg-[#f3f3f3] text-[#525866]'>
                News Image 1
              </div>
              <div className='flex items-center gap-2'>
                <Badge variant='blue' size='small'>
                  NEWS
                </Badge>
                <span className='text-black'>•</span>
                <span className='text-sm text-black'>July 3, 2024</span>
              </div>
              <h3 className='text-title-h5 font-semibold leading-tight text-black'>
                Meeting with the Italian Consul-General in São Paulo, Domenico
                Fornara
              </h3>
              <p className='text-[#525866]'>
                AIBE representatives met with the Consul-General to strengthen
                institutional ties and promote academic cooperation.
              </p>
            </article>

            {/* Blog Post 2 */}
            <article className='space-y-4'>
              <div className='flex h-[300px] w-full items-center justify-center rounded-lg border border-[#e1e4ea] bg-[#f3f3f3] text-[#525866]'>
                Blog Image 2
              </div>
              <div className='flex items-center gap-2'>
                <Badge variant='blue' size='small'>
                  BLOG
                </Badge>
                <span className='text-black'>•</span>
                <span className='text-sm text-black'>June 26, 2024</span>
              </div>
              <h3 className='text-title-h5 font-semibold leading-tight text-black'>
                Academic cooperation as a driver of innovation in economics
              </h3>
              <p className='text-[#525866]'>
                Brazilian and Italian researchers explore how international
                partnerships enhance the relevance and impact of economic
                research.
              </p>
            </article>

            {/* Blog Post 3 */}
            <article className='space-y-4'>
              <div className='flex h-[300px] w-full items-center justify-center rounded-lg border border-[#e1e4ea] bg-[#f3f3f3] text-[#525866]'>
                News Image 3
              </div>
              <div className='flex items-center gap-2'>
                <Badge variant='blue' size='small'>
                  NEWS
                </Badge>
                <span className='text-black'>•</span>
                <span className='text-sm text-black'>June 14, 2024</span>
              </div>
              <h3 className='text-title-h5 font-semibold leading-tight text-black'>
                AIBE presented at FAPESP's "Day of Italy" event
              </h3>
              <p className='text-[#525866]'>
                The presentation emphasized Italian-Brazilian academic
                cooperation and the association's scientific initiatives.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative overflow-hidden bg-[#122368] py-24'>
        <div className='relative z-10 mx-auto max-w-7xl px-8'>
          <div className='space-y-8 text-center'>
            <h2 className='text-title-h2 mx-auto max-w-4xl text-white'>
              Join AIBE and Strengthen Academic Cooperation
            </h2>
            <p className='text-lg mx-auto max-w-3xl text-[#cacfd8]'>
              By joining AIBE, you will engage with researchers, access unique
              opportunities, and support initiatives that unite Brazil and Italy
              in economic research.
            </p>
            <Button variant='secondary' size='medium'>
              Become a Member
            </Button>
          </div>
        </div>

        {/* Background decoration */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-white'></div>
          <div className='absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 transform rounded-full bg-white'></div>
        </div>
      </section>

      

      {/* Footer */}
      <footer className='bg-[#122368] text-white'>
        <div className='mx-auto max-w-7xl px-8 py-16'>
          <div className='mb-12 grid gap-16 md:grid-cols-5'>
            {/* Logo and Social */}
            <div className='space-y-8 md:col-span-2'>
              <div className='flex items-center gap-3'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white'>
                  <span className='text-2xl font-bold text-primary-base'>A</span>
                </div>
                <span className='text-4xl font-semibold tracking-tight text-white'>
                  AIBE
                </span>
              </div>

              <div className='flex gap-3'>
                <div className='flex h-6 w-6 items-center justify-center rounded-md bg-white'>
                  <span className='text-sm text-primary-base'>in</span>
                </div>
                <div className='flex h-6 w-6 items-center justify-center rounded-md bg-white'>
                  <span className='text-sm text-primary-base'>X</span>
                </div>
                <div className='flex h-6 w-6 items-center justify-center rounded-md bg-white'>
                  <span className='text-sm text-primary-base'>BS</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className='space-y-4'>
              <h4 className='text-xs font-medium uppercase tracking-wider text-[#cacfd8]'>
                Home
              </h4>
              <ul className='space-y-2 text-white'>
                <li>
                  <a
                    href='#features'
                    className='transition-colors hover:text-[#cacfd8]'
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href='#about'
                    className='transition-colors hover:text-[#cacfd8]'
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href='#workshop'
                    className='transition-colors hover:text-[#cacfd8]'
                  >
                    AIBE Workshop
                  </a>
                </li>
                <li>
                  <a
                    href='#prize'
                    className='transition-colors hover:text-[#cacfd8]'
                  >
                    Giorgio Mortara
                  </a>
                </li>
                <li>
                  <a
                    href='/blog'
                    className='transition-colors hover:text-[#cacfd8]'
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className='space-y-4'>
              <h4 className='text-xs font-medium uppercase tracking-wider text-[#cacfd8]'>
                About Us
              </h4>
              <ul className='space-y-2 text-white'>
                <li>
                  <a
                    href='#about'
                    className='transition-colors hover:text-[#cacfd8]'
                  >
                    About AIBE
                  </a>
                </li>
                <li>
                  <a
                    href='#context'
                    className='transition-colors hover:text-[#cacfd8]'
                  >
                    AIBE in Context
                  </a>
                </li>
                <li>
                  <a
                    href='#team'
                    className='transition-colors hover:text-[#cacfd8]'
                  >
                    Team
                  </a>
                </li>
              </ul>
            </div>

            <div className='space-y-4'>
              <h4 className='text-xs font-medium uppercase tracking-wider text-[#cacfd8]'>
                Events & Prizes
              </h4>
              <ul className='space-y-2 text-white'>
                <li>
                  <a
                    href='#workshop'
                    className='transition-colors hover:text-[#cacfd8]'
                  >
                    AIBE Workshop
                  </a>
                </li>
                <li>
                  <a
                    href='#prize'
                    className='transition-colors hover:text-[#cacfd8]'
                  >
                    Giorgio Mortara
                  </a>
                </li>
              </ul>
            </div>

            <div className='space-y-4'>
              <h4 className='text-xs font-medium uppercase tracking-wider text-[#cacfd8]'>
                Contact
              </h4>
              <ul className='space-y-2 text-white'>
                <li>
                  <a
                    href='#membership'
                    className='transition-colors hover:text-[#cacfd8]'
                  >
                    Membership
                  </a>
                </li>
                <li>
                  <a
                    href='#offices'
                    className='transition-colors hover:text-[#cacfd8]'
                  >
                    Offices
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-[#cacfd8] pt-8'>
            <p className='text-center text-white'>
              Copyright © 2024 AIBE. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
