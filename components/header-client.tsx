'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import * as Button from '@/components/ui/button';
import MobileMenu from '@/components/mobile-menu';
import type { Workshop } from '@/payload-types';
import { useMembershipRedirect } from '@/hooks/use-membership-redirect';

interface HeaderClientProps {
  workshops: Workshop[];
  isLoggedIn: boolean;
}

export function HeaderClient({ workshops, isLoggedIn }: HeaderClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { redirectToMembership, isProcessing } = useMembershipRedirect({ isLoggedIn });

  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-white border-b border-stroke-soft-200 justify-center items-center flex w-full'>
      <header className='w-full max-w-[1200px] px-8 py-4 mobile:p-4 flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/images/AIBE_corrected_bg 1.png'
            alt='AIBE Logo'
            width={113}
            height={42}
            className='h-16 w-auto'
          />
        </Link>

        {/* Navigation (desktop) */}
        <nav className='text-lg hidden items-center gap-4 font-medium text-text-strong-950 md:flex'>
          <Link
            href='/'
            className={`transition-colors hover:text-primary-base ${pathname === '/' ? 'text-primary-base' : ''}`}
          >
            Home
          </Link>
          <Link
            href='/about'
            className={`transition-colors hover:text-primary-base ${pathname === '/about' ? 'text-primary-base' : ''}`}
          >
            About Us
          </Link>
          <Link
            href='/people'
            className={`transition-colors hover:text-primary-base ${pathname === '/people' ? 'text-primary-base' : ''}`}
          >
            People
          </Link>
          <div className='relative group'>
            <button className={`transition-colors ${pathname?.startsWith('/workshops') ? 'text-primary-base' : ''}`}>Workshop</button>
            {/* Dropdown Menu */}
            <div className='absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
              <div className='py-2'>
                {workshops.map((workshop) => (
                  <Link
                    key={workshop.id}
                    href={`/workshops/${workshop.slug}`}
                    className='block px-4 py-2 text-text-sub-600 text-label-sm hover:bg-gray-50 hover:text-primary-base transition-colors'
                  >
                    {workshop.title}
                  </Link>
                ))}
                <Link
                  href='/workshops'
                  className='block px-4 py-2 text-text-sub-600 text-label-sm hover:bg-gray-50 hover:text-primary-base transition-colors'
                >
                  All Events
                </Link>
              </div>
            </div>
          </div>

          <div className='relative group'>
            <Link
              href='/prizes'
              className={`transition-colors hover:text-primary-base ${pathname === '/prizes' ? 'text-primary-base' : ''}`}
            >
              Prizes
            </Link>
          </div>
          <div className='relative group'>
            <Link
              href='/posts'
              className={`transition-colors hover:text-primary-base ${pathname?.startsWith('/posts') ? 'text-primary-base' : ''}`}
            >
              Blog
            </Link>
          </div>
          <Link
            href='/contact'
            className={`transition-colors hover:text-primary-base ${pathname === '/contact' ? 'text-primary-base' : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* CTA/Button area */}
        <div className='flex items-center gap-4'>
          {/* Mobile: Menu button replaces CTA */}
          <div className='md:hidden'>
            <MobileMenu workshops={workshops} isLoggedIn={isLoggedIn} />
          </div>
          {/* Desktop: Keep CTA */}
          <div className='hidden md:flex items-center gap-4'>
            {isLoggedIn ? (
              // Estado logado: botão My Membership
              <Button.Root
                variant='primary'
                size='medium'
                className='rounded-none'
                onClick={() => router.push('/account')}
              >
                My Membership
              </Button.Root>
            ) : (
              // Estado deslogado: botões Become a Member e Sign In
              <>
                <Button.Root
                  variant='primary'
                  size='medium'
                  className='rounded-none'
                  onClick={redirectToMembership}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Become a Member'}
                </Button.Root>
                <Button.Root
                  variant='neutral'
                  mode='stroke'
                  size='medium'
                  className='rounded-none'
                  onClick={() => router.push('/sign-in')}
                >
                  Sign In
                </Button.Root>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

