'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as  Button from '@/components/ui/button';
import MobileMenu from '@/components/mobile-menu';

export default function Header() {
  const router = useRouter();
  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-white border-b border-stroke-soft-200 justify-center items-center flex w-full'>
      <header className='w-full max-w-[1200px] px-8 py-4 md:px-4 lg:px-8 mobile:p-4 flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/images/logo.svg'
            alt='AIBE Logo'
            width={113}
            height={42}
            className='h-10 w-auto md:h-8 lg:h-10'
          />

        </Link>

        {/* Navigation (tablet and desktop) */}
        <nav className='text-base md:text-sm lg:text-lg hidden items-center gap-4 md:gap-3 lg:gap-8 font-medium text-black md:flex'>
          <a
            href='/'
            className='transition-colors hover:text-primary-base'
          >
            Home
          </a>
          <a
            href='/about'
            className='transition-colors hover:text-primary-base'
          >
            About Us
          </a>
          <a
            href='/people'
            className='transition-colors hover:text-primary-base'
          >
            People
          </a>
          <div className='relative group'>
            <button
              className='transition-colors hover:text-primary-base cursor-pointer'
            >
              Workshop
            </button>
            {/* Dropdown Menu */}
            <div className='absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
              <div className='py-2'>
                <Link
                  href='/workshop'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-base transition-colors'
                >
                  AIBE Workshop 2025
                </Link>
                <Link
                  href='/events/workshop2024'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-base transition-colors'
                >
                  AIBE Workshop 2024
                </Link>
                <Link
                  href='/events'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-base transition-colors'
                >
                  Last Events
                </Link>
              </div>
            </div>
          </div>
          <div className='relative group'>
            <button
              className='transition-colors hover:text-primary-base cursor-pointer'
            >
              Prizes
            </button>
            {/* Dropdown Menu */}
            <div className='absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
              <div className='py-2'>
                <Link
                  href='/prizes'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-base transition-colors'
                >
                  Giorgio Mortara
                </Link>
                <Link
                  href='/prizes/giorgio-mortara-2'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-base transition-colors'
                >
                  Giorgio Mortara 2 (Test)
                </Link>
              </div>
            </div>
          </div>
          <div className='relative group'>
            <Link
              href='/blog'
              className='transition-colors hover:text-primary-base'
            >
              Blog
            </Link>
            {/* Dropdown Menu */}
            <div className='absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
              <div className='py-2'>
                <Link
                  href='/blog/academic-cooperation'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-base transition-colors'
                >
                  Academic Cooperation
                </Link>
              </div>
            </div>
          </div>
          <a
            href='/contact'
            className='transition-colors hover:text-primary-base'
          >
            Contact
          </a>
        </nav>

        {/* CTA/Button area */}
        <div className='flex items-center gap-2 md:gap-3 lg:gap-4'>
          {/* Mobile: Menu button replaces CTA */}
          <div className='md:hidden'>
            <MobileMenu />
          </div>
          {/* Tablet & Desktop: Keep CTA */}
          <div className='hidden md:flex items-center gap-2 lg:gap-4'>
            <Button.Root
              variant='primary'
              size='medium'
              className='rounded-none md:text-sm lg:text-base md:px-3 lg:px-4'
              onClick={() => router.push('/membership')}
            >
              <span className='hidden lg:inline'>Become a Member</span>
              <span className='inline lg:hidden'>Join</span>
            </Button.Root>
            <Button.Root
              variant='neutral'
              mode='stroke'
              size='medium'
              className='rounded-none md:text-sm lg:text-base md:px-3 lg:px-4'
              onClick={() => router.push('/sign-in')}
            >
              Sign In
            </Button.Root>
          </div>
        </div>
      </header>
    </div>
  );
}
