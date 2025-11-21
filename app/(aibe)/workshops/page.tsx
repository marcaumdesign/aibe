import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Workshop } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-static'
export const revalidate = 600

type WorkshopCard = {
  id: string | number
  title: string
  slug: string
  subject: string
  type: 'current' | 'past'
  cover: {
    url: string
    alternativeText?: string
  } | null
  period: {
    startDate: string
    endDate: string
  }
  place: string
}

async function getWorkshops(): Promise<WorkshopCard[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'workshops',
    depth: 2,
    limit: 100,
    overrideAccess: false,
    sort: '-period.startDate',
    select: {
      id: true,
      title: true,
      slug: true,
      subject: true,
      type: true,
      cover: true,
      period: true,
      place: true,
    },
  })

  const formattedWorkshops = result.docs.map((workshop) => formatWorkshopForGrid(workshop))

  return formattedWorkshops
}

function formatWorkshopForGrid(workshop: Workshop): WorkshopCard {
  let resolvedCover = null

  if (workshop.cover && typeof workshop.cover === 'object') {
    const url = workshop.cover.url
    if (url) {
      resolvedCover = {
        url: getMediaUrl(url, workshop.cover.updatedAt),
        alternativeText: workshop.cover.alt || workshop.title || undefined,
      }
    }
  }

  return {
    id: workshop.id,
    title: workshop.title || 'Sem título',
    slug: workshop.slug || '',
    subject: workshop.subject || '',
    type: workshop.type || 'current',
    cover: resolvedCover,
    period: {
      startDate: workshop.period?.startDate || '',
      endDate: workshop.period?.endDate || '',
    },
    place: workshop.place || '',
  }
}

export default async function WorkshopsPage() {
  const workshops = await getWorkshops()

  return (
    <div className='min-h-screen bg-white'>
      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto pt-16 pb-8 px-8 mobile:pt-8 mobile:pb-4 mobile:px-4">
        {/* Workshops Section */}
        <section className="flex flex-col gap-4 items-center">
          {/* Small label */}
          <Badge variant='with-dot' size='medium'>
            WORKSHOPS and CONGRESSES
          </Badge>

          {/* Main Title */}
          <h2 className="text-primary-base text-title-h2 text-center max-w-2xl mx-auto">
            All Events
          </h2>

          {/* Workshop Images */}
          <div className="flex flex-col md:flex-row gap-8 -ml-4 md:-ml-8 px-4">
            {workshops.map((workshop) => (
              <Link
                key={workshop.id}
                href={`/workshops/${workshop.slug}`}
                className="w-80 group cursor-pointer"
              >
                <div className="aspect-[4/3] relative mb-4 overflow-hidden">
                  {workshop.cover && (
                    <Image
                      src={workshop.cover.url}
                      alt={workshop.cover.alternativeText || workshop.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <h6 className="text-text-strong-950 text-title-h6 text-center group-hover:text-primary-base transition-colors">
                  {workshop.title}
                </h6>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Workshops - AIBE',
    description: 'Veja todos os workshops e congressos da AIBE',
  }
}


