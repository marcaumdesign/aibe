import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Root as Button } from "@/components/ui/button"
import RichText from '@/components/RichText'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Marquee } from '@/components/ui/marquee'
import { Badge } from '@/components/ui/badge'

import type { Workshop } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const workshops = await payload.find({
    collection: 'workshops',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = workshops.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function WorkshopPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/workshops/' + slug
  const workshop = await queryWorkshopBySlug({ slug })

  if (!workshop) return <PayloadRedirects url={url} />

  // Format dates
  const startDate = workshop.period?.startDate ? new Date(workshop.period.startDate) : null
  const endDate = workshop.period?.endDate ? new Date(workshop.period.endDate) : null

  const formatDateRange = (start: Date | null, end: Date | null): string => {
    if (!start || !end) return ''

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']

    const startDay = start.getDate()
    const startMonth = months[start.getMonth()]
    const startYear = start.getFullYear()

    const endDay = end.getDate()
    const endMonth = months[end.getMonth()]
    const endYear = end.getFullYear()

    // Same month and year: "3-4 July, 2025"
    if (startMonth === endMonth && startYear === endYear) {
      return `${startDay}-${endDay} ${startMonth}, ${startYear}`
    }

    // Different months, same year: "31 July - 1 August, 2025"
    if (startYear === endYear) {
      return `${startDay} ${startMonth} - ${endDay} ${endMonth}, ${startYear}`
    }

    // Different years: "31 December, 2024 - 1 January, 2025"
    return `${startDay} ${startMonth}, ${startYear} - ${endDay} ${endMonth}, ${endYear}`
  }

  const dateRange = formatDateRange(startDate, endDate)

  // Helper function to convert markdown bullets to list items
  const renderMarkdownList = (text: string | null | undefined): string[] => {
    if (!text) return []
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-') || line.startsWith('*'))
      .map(line => line.replace(/^[-*]\s*/, ''))
  }

  // Resolve cover image
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

  return (
    <div className="min-h-screen bg-white">
      <PageClient />

      {/* Header Spacer */}
      <div className="h-20"></div>

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Workshop Hero Section */}
        <section className="mb-16">
          {/* Titles - Centered */}
          <div className="flex flex-col items-center gap-4 mb-14">
            <h2 className="text-primary-base text-title-h3 text-center">
              {workshop.title}
            </h2>
            <h1 className="text-text-strong-950 text-title-h1 text-center">
              {workshop.subject}
            </h1>
          </div>

          {/* Two Column Layout - Date/Place and Image */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column - Date & Place */}
            <div className="flex flex-col gap-8 w-full lg:w-[428px] shrink-0">
              {/* Date */}
              <div className="flex flex-col gap-2">
                <p className="text-text-sub-600 text-paragraph-md">
                  Date
                </p>
                <p className="text-text-strong-950 text-title-h5">
                  {dateRange}
                </p>
              </div>

              {/* Place */}
              <div className="flex flex-col gap-2">
                <p className="text-text-sub-600 text-paragraph-md">
                  Place
                </p>
                <p className="text-text-strong-950 text-title-h5">
                  {workshop.place}
                </p>
              </div>

              {/* Download Button */}
              {workshop.firstButtonText && workshop.firstButtonLink && (
                <Link href={workshop.firstButtonLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" mode="filled" size="medium" className="w-full lg:w-auto">
                    {workshop.firstButtonText}
                  </Button>
                </Link>
              )}
            </div>

            {/* Right Column - Image */}
            <div className="flex-1 w-full">
              <div className="relative w-full h-[420px]">
                {resolvedCover && (
                  <Image
                    src={resolvedCover.url}
                    alt={resolvedCover.alternativeText || workshop.title || 'Workshop cover'}
                    width={1600}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Keynote Speaker Section */}
        {workshop.speaker && typeof workshop.speaker === 'object' && (
          <section className="mb-16">
            <div className="bg-[#f0f6ff] w-full">
              <div className="flex flex-col lg:flex-row gap-2">
                {/* Speaker Image - Left */}
                {workshop.speaker.avatar && typeof workshop.speaker.avatar === 'object' && (
                  <div className="w-full lg:w-[426px] h-[604px] shrink-0">
                    <Image
                      src={getMediaUrl(workshop.speaker.avatar.url || '', workshop.speaker.avatar.updatedAt)}
                      alt={workshop.speaker.avatar.alt || workshop.speaker.name || 'Speaker'}
                      width={426}
                      height={604}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Speaker Info - Right */}
                <div className="flex-1 p-8 flex flex-col gap-8 justify-center">
                  <div className="flex flex-col gap-3">
                    {/* Badge */}
                    <div className="inline-flex items-center justify-center px-2 py-1 rounded-[4px] self-start">
                      <p className="text-primary-base text-subheading-xs uppercase">
                        keynote speaker
                      </p>
                    </div>

                    {/* Speaker Name */}
                    <h2 className="text-primary-base text-title-h2">
                      {workshop.speaker.name}
                    </h2>

                    {/* Role */}
                    {workshop.speaker.role && (
                      <p className="text-text-strong-950 text-paragraph-md max-w-[428px]">
                        {workshop.speaker.role}
                      </p>
                    )}

                    {/* University */}
                    {workshop.speaker.university?.name && (
                      <p className="text-text-strong-950 text-paragraph-md underline">
                        {workshop.speaker.university.link ? (
                          <Link
                            href={workshop.speaker.university.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80"
                          >
                            {workshop.speaker.university.name}
                          </Link>
                        ) : (
                          workshop.speaker.university.name
                        )}
                      </p>
                    )}
                  </div>

                  {/* Bio */}
                  {workshop.speaker.biography && (
                    <p className="text-text-sub-600 text-paragraph-sm">
                      {workshop.speaker.biography}
                    </p>
                  )}

                  {/* Website Button */}
                  {workshop.speaker.link && (
                    <Link href={workshop.speaker.link} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="neutral"
                        mode="stroke"
                        size="medium"
                        className="bg-white"
                      >
                        Open Personal Website
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Workshop Details Section */}
        <section className="mb-16">
          <div className="prose prose-lg max-w-none">
            {workshop.content && (
              <RichText
                className="text-text-sub-600 leading-relaxed mb-6 text-paragraph-md max-w-none"
                data={workshop.content}
                enableGutter={false}
                enableProse={true}
              />
            )}
          </div>
        </section>

        {workshop.type === 'current' && workshop.secondButtonText && workshop.secondButtonLink && (
          <div className="w-full mb-16 flex justify-center">
            <Link href={workshop.secondButtonLink} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" mode="filled" size="medium">
                {workshop.secondButtonText}
              </Button>
            </Link>
          </div>
        )}

        {/* Scientific Committee & Topics Section */}
        <section className="mb-16">
          <div className="bg-blue-50 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Scientific Committee */}
              {workshop.scientificCommittee && renderMarkdownList(workshop.scientificCommittee).length > 0 && (
                <div>
                  <h3 className="text-text-strong-950 mb-6 text-title-h5">
                    Scientific Committees
                  </h3>
                  <ul className="space-y-1 text-text-sub-600">
                    {renderMarkdownList(workshop.scientificCommittee).map((item, index) => (
                      <li key={index} className="flex items-start text-paragraph-md">
                        <span className="text-primary-base mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Right Column - Topics */}
              {workshop.topics && renderMarkdownList(workshop.topics).length > 0 && (
                <div>
                  <h3 className="text-text-strong-950 mb-6 text-title-h5">
                    Topics
                  </h3>
                  <ul className="space-y-1 text-text-sub-600">
                    {renderMarkdownList(workshop.topics).map((item, index) => (
                      <li key={index} className="flex items-start text-paragraph-md">
                        <span className="text-primary-base mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Gallery Section - Only for Past Workshops */}
        {workshop.type === 'past' && workshop.gallery && workshop.gallery.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <div className="flex flex-col gap-2">
                <Badge variant='with-dot' size='medium'>
                  Past Congress
                </Badge>
                <h2 className="text-text-strong-950 text-title-h2">
                  Gallery
                </h2>
              </div>
              <Link href={`/workshops/${slug}/gallery`}>
                <Button variant="primary" mode="filled" size="medium">
                  View All
                </Button>
              </Link>
            </div>

            {/* Gallery Images - Display up to 3 images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {workshop.gallery.slice(0, 3).map((item, index) => {
                if (item.image && typeof item.image === 'object') {
                  return (
                    <div key={index} className="relative">
                      <Image
                        src={getMediaUrl(item.image.url || '', item.image.updatedAt)}
                        alt={item.image.alt || `Workshop gallery photo ${index + 1}`}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover rounded-sm"
                      />
                    </div>
                  )
                }
                return null
              })}
            </div>
          </section>
        )}

        {workshop.sponsors && workshop.sponsors.length > 0 && (
          <section className="">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-text-strong-950 mb-12 text-title-h3 text-center">
                Sponsors
              </h2>

              <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:30s] [--gap:4rem]">
                  {workshop.sponsors.map((sponsor, index) => {
                    if (sponsor.logo && typeof sponsor.logo === 'object') {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center h-32 w-48 mx-8"
                        >
                          <Image
                            src={getMediaUrl(sponsor.logo.url || '', sponsor.logo.updatedAt)}
                            alt={sponsor.logo.alt || `Sponsor ${index + 1}`}
                            width={200}
                            height={120}
                            className="max-h-32 w-auto object-contain"
                          />
                        </div>
                      )
                    }
                    return null
                  })}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
              </div>
            </div>
          </section>
        )}

        {/* Studying Section - Only for Past Workshops */}
        {workshop.type === 'past' && workshop.studyingSection?.studyingTitle && workshop.studyingSection?.studyingDescription && (
          <section className="mt-20 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Texto à esquerda */}
              <div>

                <h2 className="text-text-strong-950 text-title-h2 mb-4">
                  {workshop.studyingSection.studyingTitle}
                </h2>
                <p className="text-text-sub-600 leading-relaxed text-paragraph-md">
                  {workshop.studyingSection.studyingDescription}
                </p>
              </div>

              {/* Imagem à direita */}
              {workshop.studyingSection.studyingImage && typeof workshop.studyingSection.studyingImage === 'object' && (
                <div className="flex md:justify-end">
                  <div className="relative w-full max-w-[720px] h-[420px] md:max-w-[820px] md:h-[500px] lg:max-w-[960px] lg:h-[560px]">
                    <Image
                      src={getMediaUrl(workshop.studyingSection.studyingImage.url || '', workshop.studyingSection.studyingImage.updatedAt)}
                      alt={workshop.studyingSection.studyingImage.alt || workshop.studyingSection.studyingTitle || 'Studying Section'}
                      width={960}
                      height={560}
                      className="w-full h-full object-cover shadow-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Sponsors Section */}

      </main>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const workshop = await queryWorkshopBySlug({ slug })

  return generateMeta({ doc: workshop })
}

const queryWorkshopBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'workshops',
    draft,
    limit: 1,
    depth: 2,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

