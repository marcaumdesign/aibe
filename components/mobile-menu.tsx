'use client';

import Link from 'next/link';
import * as Drawer from '@/components/ui/drawer';
import * as Button from '@/components/ui/button';
import { RiMenuLine } from '@remixicon/react';

export default function MobileMenu() {
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
            <Item href='/'>Home</Item>
            <Item href='/about'>About US</Item>
            <Item href='/people'>People</Item>

            {/* Workshop Section with subitems */}
            <div className='flex flex-col'>
              <div className='px-4 py-3 text-gray-700 font-medium'>
                Workshop
              </div>
              <div className='flex flex-col gap-1 pl-4'>
                <SubItem href='/workshop'>AIBE Workshop 2025</SubItem>
                <SubItem href='/events/workshop2024'>AIBE Workshop 2024</SubItem>
                <SubItem href='/events'>Last Events</SubItem>
              </div>
            </div>

            {/* Prizes Section with subitems */}
            <div className='flex flex-col'>
              <div className='px-4 py-3 text-gray-700 font-medium'>
                Prizes
              </div>
              <div className='flex flex-col gap-1 pl-4'>
                <SubItem href='/prizes'>Giorgio Mortara</SubItem>
                <SubItem href='/prizes/giorgio-mortara-2'>Giorgio Mortara 2 (Test)</SubItem>
              </div>
            </div>

            {/* Blog Section with subitems */}
            <div className='flex flex-col'>
              <Item href='/posts'>Blog</Item>
              <div className='flex flex-col gap-1 pl-4'>
                <SubItem href='/blog/academic-cooperation'>Academic Cooperation</SubItem>
              </div>
            </div>

            <Item href='/contact'>Contact</Item>

            {/* Divider */}
            <div className='my-2 border-t border-gray-200'></div>

            {/* Sign In Button */}
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

            {/* Become a Member CTA */}
            <div className='mt-2'>
              <Drawer.Close asChild>
                <Link
                  href='/membership'
                  className='block rounded-md bg-primary-base px-4 py-3 text-center text-static-white font-medium hover:opacity-90 transition-opacity'
                >
                  Become a Member
                </Link>
              </Drawer.Close>
            </div>
          </nav>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

function Item({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Drawer.Close asChild>
      <Link
        href={href}
        className='block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-base transition-colors rounded-md font-medium'
      >
        {children}
      </Link>
    </Drawer.Close>
  );
}

function SubItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Drawer.Close asChild>
      <Link
        href={href}
        className='block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary-base transition-colors rounded-md text-sm'
      >
        {children}
      </Link>
    </Drawer.Close>
  );
}


