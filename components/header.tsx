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
      <header className='w-full max-w-[1200px] px-8 py-4 mobile:p-4 flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/images/logo.svg'
            alt='AIBE Logo'
            width={113}
            height={42}
            className='h-10 w-auto'
          />

        </Link>

        {/* Navigation (desktop) */}
        <nav className='text-lg hidden items-center gap-8 font-medium text-black md:flex'>
          <div className='relative group'>
            <a
              href='/about'
              className='transition-colors hover:text-primary-base'
            >
              About AIBE
            </a>
            {/* Dropdown Menu */}
            <div className='absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
              <div className='py-2'>
                <Link
                  href='/about#context'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-base transition-colors'
                >
                  AIBE in Context
                </Link>
                <Link
                  href='/about/team'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-base transition-colors'
                >
                  Team
                </Link>
              </div>
            </div>
          </div>
          <div className='relative group'>
            <a
              href='/events'
              className='transition-colors hover:text-primary-base'
            >
              Events & Prizes
            </a>
            {/* Dropdown Menu */}
            <div className='absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
              <div className='py-2'>
                {/* AIBE Workshop with submenu */}
                <div className='relative group/workshop'>
                  <div className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-base transition-colors cursor-pointer'>
                    AIBE Workshop
                  </div>
                  {/* Submenu */}
                  <div className='absolute left-full top-0 ml-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover/workshop:opacity-100 group-hover/workshop:visible transition-all duration-200 z-50'>
                    <div className='py-2'>
                      <Link
                        href='/events/workshop'
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
                    </div>
                  </div>
                </div>
                <Link
                  href='/events'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-base transition-colors'
                >
                  Giorgio Mortara
                </Link>
                <Link
                  href='/events/pastcongresses'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-base transition-colors'
                >
                  Past Congresses
                </Link>
              </div>
            </div>
          </div>
          <a
            href='/membership'
            className='transition-colors hover:text-primary-base'
          >
            Membership
          </a>
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
                  href='/blog'
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-base transition-colors'
                >
                  Blog
                </Link>
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
        <div className='flex items-center'>
          {/* Mobile: Menu button replaces CTA */}
          <div className='md:hidden'>
            <MobileMenu />
          </div>
          {/* Desktop: Keep CTA */}
          <div className='hidden md:block'>
            <Button.Root
              variant='primary'
              size='medium'
              className='rounded-none'
              onClick={() => router.push('/membership')}
            >
              Become a Member
            </Button.Root>
          </div>
        </div>
      </header>
    </div>
  );
}
