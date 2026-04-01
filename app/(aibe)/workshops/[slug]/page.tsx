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
import WorkshopFAQSection from '@/components/workshop-faq'

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
  await draftMode()
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
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-white">
      <PageClient />

      {/* Header Spacer */}
      <div className="h-20 md:h-16 mobile:h-16"></div>

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {/* Main Content */}
      <main className="mx-auto min-w-0 max-w-7xl overflow-x-hidden px-3 sm:px-6 lg:px-8 md:px-6 py-12 md:py-8 mobile:py-6">
        {/* Workshop Hero Section */}
        <section className="mb-16 md:mb-12 mobile:mb-8">
          {/* Titles - Centered */}
          <div className="flex w-full max-w-full flex-col items-center gap-4 md:gap-3 mb-14 md:mb-10 mobile:mb-8">
            <h3 className="text-text-strong-950  text-title-h5 mobile:text-title-h5 text-center">
              {workshop.title}
            </h3>
            <h1 className="w-full max-w-full break-words px-1 text-center text-primary-base text-title-h1 [hyphens:auto] lg:text-title-h1 md:text-title-h2 mobile:text-title-h3">
              {workshop.subject}
            </h1>
          </div>

          {/* Two Column Layout - Date/Place and Image */}
          <div className="flex w-full min-w-0 flex-col items-start gap-8 overflow-hidden bg-[#F3F8FF] md:gap-6 lg:flex-row">
            {/* Left Column - Date & Place */}
            <div className="flex w-full min-w-0 shrink-0 flex-col gap-8 p-4 md:gap-6 md:p-6 lg:w-[428px] lg:p-8">
              {/* Date */}
              <div className="flex flex-col gap-2">
                <p className="text-text-sub-600 text-paragraph-md mobile:text-paragraph-sm">
                  Date
                </p>
                <p className="text-text-strong-950 text-title-h5 lg:text-title-h5 md:text-title-h6 mobile:text-paragraph-lg">
                  {dateRange}
                </p>
              </div>

              {/* Place */}
              <div className="flex flex-col gap-2">
                <p className="text-text-sub-600 text-paragraph-md mobile:text-paragraph-sm">
                  Place
                </p>
                <p className="text-text-strong-950 text-title-h5 lg:text-title-h5 md:text-title-h6 mobile:text-paragraph-lg">
                  {workshop.place}
                </p>
              </div>

              {/* Download Button */}
              {workshop.firstButtonText && workshop.firstButtonLink && (
                <div className="w-full h-[100px] flex items-end justify-start">
                  <Link
                    href={workshop.firstButtonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button variant="primary" mode="filled" size="medium" className="w-full min-w-0 whitespace-normal text-center">
                      {workshop.firstButtonText}
                    </Button>
                  </Link>
                </div>)}
            </div>

            {/* Right Column - Image */}
            <div className="w-full min-w-0 flex-1 lg:w-auto">
              <div className="relative w-full h-[420px] md:h-[350px] mobile:h-[280px]">
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

        {/* Workshop Details Section */}
        <section className="mb-16">
          <div className="prose prose-lg max-w-none">
            {workshop.content && (
              <RichText
                className="mb-6 max-w-none break-words text-paragraph-md leading-relaxed text-text-sub-600 [&_a]:break-all"
                data={workshop.content}
                enableGutter={false}
                enableProse={true}
              />
            )}
          </div>
        </section>

        {/* Keynote Speaker Section */}
        {workshop.speaker && typeof workshop.speaker === 'object' && (
          <section className="mb-16 md:mb-12 mobile:mb-8">
            <div className="w-full max-w-full overflow-hidden bg-[#f0f6ff]">
              <div className="flex min-w-0 flex-col gap-0 lg:flex-row lg:items-stretch">
                {/* Column 1: Speaker Image */}
                {workshop.speaker.avatar && typeof workshop.speaker.avatar === 'object' && (
                  <div className="w-full p-4 md:p-6 mobile:p-3 flex items-center justify-center lg:justify-start">
                    <div className="relative mx-auto h-[min(220px,80vw)] w-[min(220px,80vw)] max-w-full shrink-0 overflow-hidden rounded-full shadow-sm sm:h-[256px] sm:w-[256px]">
                      <Image
                        src={getMediaUrl(workshop.speaker.avatar.url || '', workshop.speaker.avatar.updatedAt)}
                        alt={workshop.speaker.avatar.alt || workshop.speaker.name || 'Speaker'}
                        width={256}
                        height={256}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  </div>
                )}

                {/* Column 2: Speaker Info */}
                <div className="flex w-full min-w-0 flex-col justify-center gap-6 p-4 md:gap-4 md:p-6 mobile:p-5 lg:w-full lg:p-8">
                  <div className="flex flex-col gap-3 md:gap-2">
                    {/* Badge */}
                    <p className="text-text-sub-600 text-paragraph-md mobile:text-paragraph-sm">
                      Keynote Speaker
                    </p>

                    {/* Speaker Name */}
                    <h2 className="text-primary-base text-title-h2 lg:text-title-h2 md:text-title-h3 mobile:text-title-h4">
                      {workshop.speaker.name}
                    </h2>

                    {/* Role */}
                    {workshop.speaker.role && (
                      <p className="text-text-strong-950 text-paragraph-md mobile:text-paragraph-sm">
                        {workshop.speaker.role}
                      </p>
                    )}

                    {/* University */}
                    {workshop.speaker.university?.name && (
                      <p className="text-text-strong-950 text-paragraph-md mobile:text-paragraph-sm underline">
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

                {/* Column 3: Bio */}
                <div className="flex w-full min-w-0 flex-col justify-center p-4 md:p-6 mobile:p-5 lg:p-8">
                  {workshop.speaker.biography && (
                    <>
                      <h3 className="text-text-strong-950 text-title-h6 mobile:text-paragraph-lg mb-4 mobile:mb-3">
                        Bio
                      </h3>
                      <p className="text-text-sub-600 text-paragraph-sm mobile:text-paragraph-xs leading-relaxed">
                        {workshop.speaker.biography}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}



        {workshop.type === 'current' && workshop.secondButtonText && workshop.secondButtonLink && (
          <div className="w-full mb-16 md:mb-12 mobile:mb-8 flex justify-center px-4">
            <Link href={workshop.secondButtonLink} target="_blank" rel="noopener noreferrer" className="w-full md:w-full lg:w-auto">
              <Button variant="primary" mode="filled" size="medium" className="w-full">
                {workshop.secondButtonText}
              </Button>
            </Link>
          </div>
        )}

        {/* Gallery Section - Only for Past Workshops */}
        {workshop.type === 'past' && workshop.gallery && workshop.gallery.length > 0 && (
          <section className="mb-10 md:mb-8 mobile:mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 md:mb-4 gap-4">
              <div className="flex flex-col gap-2">
                <Badge variant='with-dot' size='medium'>
                  Past Congress
                </Badge>
                <h2 className="text-primary-base text-title-h2 lg:text-title-h2 md:text-title-h3 mobile:text-title-h4">
                  Gallery
                </h2>
              </div>
              <Link href={`/workshops/${slug}/gallery`} className="w-full md:w-auto">
                <Button variant="primary" mode="filled" size="medium" className="w-full md:w-auto">
                  View All
                </Button>
              </Link>
            </div>

            {/* Gallery Images - Display up to 3 images */}
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 md:gap-3">
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


        {/* Scientific Committee & Topics Section */}
        <section className="mb-16 md:mb-12 mobile:mb-8">
          <div className="bg-blue-50 p-6 md:p-5 mobile:p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6">
              {/* Left Column - Scientific Committee */}
              {workshop.scientificCommittee && renderMarkdownList(workshop.scientificCommittee).length > 0 && (
                <div>
                  <h5 className="text-primary-base text-title-h5 lg:text-title-h5 md:text-title-h6 mobile:text-title-h6 mb-6 md:mb-5 mobile:mb-4">
                    Scientific Committee
                  </h5>
                  <ul className="space-y-1 text-text-sub-600">
                    {renderMarkdownList(workshop.scientificCommittee).map((item, index) => (
                      <li key={index} className="flex min-w-0 items-start text-paragraph-md mobile:text-paragraph-sm">
                        <span className="mr-2 shrink-0 text-primary-base">•</span>
                        <span className="min-w-0 break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Right Column - Topics */}
              {workshop.topics && renderMarkdownList(workshop.topics).length > 0 && (
                <div>
                  <h5 className="text-primary-base text-title-h5 lg:text-title-h5 md:text-title-h6 mobile:text-title-h6 mb-6 md:mb-5 mobile:mb-4">
                    Topics
                  </h5>
                  <ul className="space-y-1 text-text-sub-600">
                    {renderMarkdownList(workshop.topics).map((item, index) => (
                      <li key={index} className="flex min-w-0 items-start text-paragraph-md mobile:text-paragraph-sm">
                        <span className="mr-2 shrink-0 text-primary-base">•</span>
                        <span className="min-w-0 break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <WorkshopFAQSection items={workshop.faq} />

        {workshop.sponsors && workshop.sponsors.length > 0 && (
          <section className="">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-primary-base text-title-h3 lg:text-title-h3 md:text-title-h4 mobile:text-title-h5 mb-12 md:mb-10 mobile:mb-8 text-center">
                Sponsors
              </h3>

              <div className="relative flex w-full min-w-0 flex-col items-center justify-center overflow-hidden">
                <Marquee pauseOnHover className="[--duration:30s] [--gap:2rem] md:[--gap:4rem]">
                  {workshop.sponsors.map((sponsor, index) => {
                    if (sponsor.logo && typeof sponsor.logo === 'object') {
                      return (
                        <div
                          key={index}
                          className="mx-3 flex h-32 w-36 shrink-0 items-center justify-center sm:mx-6 sm:w-44 md:mx-8 md:w-48"
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
          <section className="mt-20 lg:mt-20 md:mt-16 mobile:mt-12 mb-16 md:mb-12 mobile:mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 items-start">
              {/* Texto à esquerda */}
              <div>

                <h2 className="text-primary-base text-title-h2 lg:text-title-h2 md:text-title-h3 mobile:text-title-h4 mb-4 md:mb-3">
                  {workshop.studyingSection.studyingTitle}
                </h2>
                <p className="text-text-sub-600 leading-relaxed text-paragraph-md mobile:text-paragraph-sm">
                  {workshop.studyingSection.studyingDescription}
                </p>
              </div>

              {/* Imagem à direita */}
              {workshop.studyingSection.studyingImage && typeof workshop.studyingSection.studyingImage === 'object' && (
                <div className="flex lg:justify-end">
                  <div className="relative w-full h-[400px]">
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
    </div >
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

