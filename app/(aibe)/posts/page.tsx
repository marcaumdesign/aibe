import type { Metadata } from 'next/types'

import PostsGrid from '@/components/blog/posts-grid'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Post } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

type BlogPostCard = {
  id: string | number
  title: string
  slug: string
  description: string | null
  image: {
    url: string
    alternativeText?: string
  } | null
  date: string
  category?: {
    name: string
    slug: string
  }
}

async function getPosts(): Promise<{ posts: BlogPostCard[]; pagination: { page: number | null; totalPages: number } }> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 12,
    overrideAccess: false,
    sort: '-publishedAt',
    select: {
      id: true,
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
      publishedAt: true,
      createdAt: true,
    },
  })

  const formattedPosts = result.docs.map((post) => formatPostForGrid(post))

  return {
    posts: formattedPosts,
    pagination: {
      page: result.page ?? null,
      totalPages: result.totalPages,
    },
  }
}

function formatPostForGrid(post: Post): BlogPostCard {
  const primaryCategory =
    Array.isArray(post.categories) && post.categories.length > 0
      ? post.categories.find((category) => typeof category === 'object' && category !== null)
      : undefined

  // Try meta.image first, then heroImage
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
    description: post.meta?.description || null,
    image: resolvedImage,
    date: post.publishedAt || post.createdAt || new Date().toISOString(),
    category: primaryCategory
      ? {
        name: primaryCategory.title || 'Categoria',
        slug: primaryCategory.slug || '',
      }
      : undefined,
  }
}

export default async function Page() {
  const { posts, pagination } = await getPosts()

  return (
    <div className='min-h-screen bg-white'>
      <PageClient />
      {/* Header Section */}
      <section className='pt-20 pb-16'>
        <div className='max-w-[1200px] mx-auto px-4'>
          <div className='text-center mb-16'>
            <p className='text-text-soft-400 text-subheading-sm uppercase mb-4'>
              BLOG
            </p>
            <h1 className='text-text-strong-950 text-title-h2'>
              Our latest news
            </h1>
          </div>

          {/* Articles Grid */}
          <div className='w-full'>
            <PostsGrid posts={posts} />
          </div>
        </div>
      </section>

      {/* Pagination */}
      {pagination.totalPages > 1 && pagination.page && (
        <div className='max-w-[1200px] mx-auto px-4 pb-16'>
          <Pagination page={pagination.page} totalPages={pagination.totalPages} />
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Posts - AIBE',
    description: 'Leia nossos artigos e notícias mais recentes',
  }
}
