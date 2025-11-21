'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as Drawer from '@/components/ui/drawer';
import * as Button from '@/components/ui/button';
import { RiMenuLine } from '@remixicon/react';
import type { Workshop } from '@/payload-types';

interface MobileMenuProps {
  workshops: Workshop[];
  isLoggedIn: boolean;
}

export default function MobileMenu({ workshops, isLoggedIn }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button.Root
          variant='neutral'
          mode='stroke'
          size='medium'
          className='md:hidden'
        >
          <Button.Icon as={RiMenuLine} />
        </Button.Root>
      </Drawer.Trigger>

      <Drawer.Content>
        <Drawer.Header className='justify-between border-b'>
          <Drawer.Title>Menu</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className='p-5'>
          <nav className='flex flex-col gap-1 text-label-md'>
            {/* Main Navigation */}
            <Item href='/' active={pathname === '/'}>Home</Item>
            <Item href='/about' active={pathname === '/about'}>About Us</Item>
            <Item href='/people' active={pathname === '/people'}>People</Item>

            {/* Workshop Section with subitems */}
            <div className='flex flex-col'>
              <div className={`px-4 py-3 font-medium ${pathname?.startsWith('/workshops') ? 'text-primary-base' : 'text-gray-700'}`}>
                Workshop
              </div>
              <div className='flex flex-col gap-1 pl-4'>
                {workshops.map((workshop) => (
                  <SubItem
                    key={workshop.id}
                    href={`/workshops/${workshop.slug}`}
                    active={pathname === `/workshops/${workshop.slug}`}
                  >
                    {workshop.title}
                  </SubItem>
                ))}
                <SubItem href='/workshops' active={pathname === '/workshops'}>Last Events</SubItem>
              </div>
            </div>

            {/* Prizes - sem subitens */}
            <Item href='/prizes' active={pathname === '/prizes'}>Prizes</Item>

            {/* Blog - sem subitens */}
            <Item href='/posts' active={pathname?.startsWith('/posts')}>Blog</Item>

            <Item href='/contact' active={pathname === '/contact'}>Contact</Item>

            {/* Divider */}
            <div className='my-2 border-t border-gray-200'></div>

            {/* Botões de autenticação */}
            {isLoggedIn ? (
              // Estado logado: apenas botão My Membership
              <div className='mt-2'>
                <Drawer.Close asChild>
                  <button
                    onClick={() => router.push('/account')}
                    className='w-full block rounded-md bg-primary-base px-4 py-3 text-center text-static-white font-medium hover:opacity-90 transition-opacity'
                  >
                    My Membership
                  </button>
                </Drawer.Close>
              </div>
            ) : (
              // Estado deslogado: botões Become a Member e Sign In
              <>
                <div className='mt-2'>
                  <Drawer.Close asChild>
                    <Link
                      href='/create-account'
                      className='block rounded-md bg-primary-base px-4 py-3 text-center text-static-white font-medium hover:opacity-90 transition-opacity'
                    >
                      Become a Member
                    </Link>
                  </Drawer.Close>
                </div>
                <div className='mt-2'>
                  <Drawer.Close asChild>
                    <Link
                      href='/sign-in'
                      className='block rounded-md border border-gray-300 px-4 py-3 text-center text-gray-700 font-medium hover:bg-gray-50 transition-colors'
                    >
                      Sign In
                    </Link>
                  </Drawer.Close>
                </div>
              </>
            )}
          </nav>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

function Item({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Drawer.Close asChild>
      <Link
        href={href}
        className={`block px-4 py-3 hover:bg-gray-50 hover:text-primary-base transition-colors rounded-md font-medium ${active ? 'text-primary-base' : 'text-gray-700'
          }`}
      >
        {children}
      </Link>
    </Drawer.Close>
  );
}

function SubItem({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Drawer.Close asChild>
      <Link
        href={href}
        className={`block px-4 py-2 hover:bg-gray-50 hover:text-primary-base transition-colors rounded-md text-sm ${active ? 'text-primary-base' : 'text-gray-600'
          }`}
      >
        {children}
      </Link>
    </Drawer.Close>
  );
}


