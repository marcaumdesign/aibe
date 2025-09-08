import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import * as  Button  from '@/components/ui/button';

const DynamicThemeSwitch = dynamic(() => import('./theme-switch'), {
  ssr: false,
});

export default function Header() {
  return (
    <div className='justify-center items-center border-stroke-soft-200 flex w-full'>
      <header className='w-full max-w-[1200px] py-4 flex items-center justify-between'>
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
            <Button.Root variant='primary' size='medium'>
              Become a Member
            </Button.Root>
      </header>
    </div>
  );
}
