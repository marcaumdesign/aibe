import React from 'react'
import Link from 'next/link'
import * as Button from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface HighlightBannerProps {
  title: string
  button?: {
    enabled?: boolean
    text?: string
    link?: string
  }
}

export function HighlightBanner({ title, button }: HighlightBannerProps) {
  return (
    <div className='bg-[#f3f8ff] py-6 md:py-8'>
      <div className='w-full max-w-[1200px] mx-auto px-4 md:px-8'>
        <div className='flex flex-col items-start md:items-end justify-between gp-6 md:gap-8 md:flex-row'>
          <div className='flex-1 space-y-3 md:space-y-4'>
            <Badge variant='with-dot' size='medium'>
              Highlights
            </Badge>
            <h2 className='text-title-h4 text-black animate-translate-y-up'>{title}</h2>
          </div>
          {button?.enabled && button?.text && button?.link && (
            <Button.Root
              variant='primary'
              mode='filled'
              size='medium'
              className='h-hug'
              asChild
            >
              <Link href={button.link}>{button.text}</Link>
            </Button.Root>
          )}
        </div>
      </div>
    </div>
  )
}

