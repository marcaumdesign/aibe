import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import PostsPostHero from '@/components/blog/posts-post-hero'
import PostsPostSidebar from '@/components/blog/posts-post-sidebar'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import type { Post } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

interface LatestPost {
  id: string | number
  title: string
  slug: string
  image: {
    url: string
    alternativeText?: string
  } | null
  date: string
}

async function fetchLatestPosts(): Promise<LatestPost[]> {
  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'posts',
      depth: 2,
      limit: 4,
      overrideAccess: false,
      sort: '-publishedAt',
      select: {
        id: true,
        title: true,
        slug: true,
        meta: true,
        heroImage: true,
        publishedAt: true,
        createdAt: true,
      },
    })

    return result.docs.map((post) => {
      const metaImage = post.meta?.image
      const heroImage = post.heroImage
      
      let resolvedImage = null
      
      if (metaImage && typeof metaImage === 'object') {
        const url = metaImage.sizes?.medium?.url || metaImage.url
        if (url) {
          resolvedImage = {
            url: getMediaUrl(url, metaImage.updatedAt),
            alternativeText: metaImage.alt || post.title || undefined,
          }
        }
      } else if (heroImage && typeof heroImage === 'object') {
        const url = heroImage.sizes?.medium?.url || heroImage.url
        if (url) {
          resolvedImage = {
            url: getMediaUrl(url, heroImage.updatedAt),
            alternativeText: heroImage.alt || post.title || undefined,
          }
        }
      }

      return {
        id: post.id,
        title: post.title || 'Sem título',
        slug: post.slug || '',
        image: resolvedImage,
        date: post.publishedAt || post.createdAt || new Date().toISOString(),
      }
    })
  } catch (error) {
    console.error('Erro ao buscar últimos posts:', error)
    return []
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  // Buscar últimos posts para a sidebar
  const latestPosts = await fetchLatestPosts()

  // Mapear o post do Payload para o formato esperado pelo BlogPostHero
  const metaImage = post.meta?.image
  const heroImage = post.heroImage
  
  let resolvedImage = null
  
  if (metaImage && typeof metaImage === 'object') {
    const url = metaImage.sizes?.large?.url || metaImage.url
    if (url) {
      resolvedImage = {
        url: getMediaUrl(url, metaImage.updatedAt),
        alternativeText: metaImage.alt || post.title || undefined,
        sizes: metaImage.sizes,
      }
    }
  } else if (heroImage && typeof heroImage === 'object') {
    const url = heroImage.sizes?.large?.url || heroImage.url
    if (url) {
      resolvedImage = {
        url: getMediaUrl(url, heroImage.updatedAt),
        alternativeText: heroImage.alt || post.title || undefined,
        sizes: heroImage.sizes,
      }
    }
  }

  const heroPostData = {
    title: post.title || '',
    description: post.meta?.description || null,
    image: resolvedImage,
    publishedAt: post.publishedAt || post.createdAt || new Date().toISOString(),
    author: post.populatedAuthors && post.populatedAuthors.length > 0
      ? { name: post.populatedAuthors[0].name || '' }
      : undefined,
  }

  return (
    <div className='min-h-screen bg-white'>
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Hero Section */}
      <PostsPostHero post={heroPostData} />

      {/* Main Content - 2 Columns Layout */}
      <section className='pb-16'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <div className='grid grid-cols-12 gap-8'>
            {/* Main Content - 8 columns */}
            <div className='col-span-12 lg:col-span-8'>
              <RichText className="max-w-none" data={post.content} enableGutter={false} enableProse={true} />
            </div>

            {/* Sidebar - 4 columns */}
            <div className='col-span-12 lg:col-span-4'>
              <PostsPostSidebar latest={latestPosts} tags={[]} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
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
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      meta: true,
      heroImage: true,
      publishedAt: true,
      createdAt: true,
      populatedAuthors: true,
      relatedPosts: true,
    },
  })

  return result.docs?.[0] || null
})
