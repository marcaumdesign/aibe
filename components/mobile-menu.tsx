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
          <nav className='flex flex-col gap-3 text-label-md'>
            {/* About */}
            <Section title='About AIBE'>
              <Item href='/about#context'>AIBE in Context</Item>
              <Item href='/about/team'>Team</Item>
            </Section>

            {/* Events & Prizes */}
            <Section title='Events & Prizes'>
              <Item href='/events/workshop'>AIBE Workshop 2025</Item>
              <Item href='/events/workshop2024'>AIBE Workshop 2024</Item>
              <Item href='/events'>Giorgio Mortara</Item>
              <Item href='/events/pastcongresses'>Past Congresses</Item>
            </Section>

            {/* Blog */}
            <Section title='Blog'>
              <Item href='/blog'>Blog</Item>
              <Item href='/blog/academic-cooperation'>Academic Cooperation</Item>
            </Section>

            {/* Contact (alinhado com itens internos) */}
            <div className='pl-3'>
              <Item href='/contact'>Contact</Item>
            </div>

            {/* Become a Member CTA */}
            <div className='mt-4'>
              <Drawer.Close asChild>
                <Link
                  href='/membership'
                  className='block rounded-none bg-primary-base px-4 py-3 text-center text-static-white'
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-text-sub-600'>{title}</div>
      <div className='flex flex-col gap-2 pl-3'>{children}</div>
    </div>
  );
}

function Item({ href, children, emphasized }: { href: string; children: React.ReactNode; emphasized?: boolean }) {
  return (
    <Drawer.Close asChild>
      <Link
        href={href}
        className={
          emphasized
            ? 'rounded-md bg-primary-alpha-10 px-3 py-2 text-primary-base'
            : 'rounded-md px-3 py-2 hover:bg-bg-weak-50'
        }
      >
        {children}
      </Link>
    </Drawer.Close>
  );
}


