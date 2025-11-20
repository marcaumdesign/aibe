import type { Metadata } from 'next/types'

import PostsGrid from '@/components/blog/posts-grid'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Post } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

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

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  let payload = null

  try {
    payload = await getPayload({ config: configPromise })
  } catch (error) {
    console.error('Erro ao inicializar Payload:', error)
  }

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const result =
    (payload
      ? await payload
        .find({
          collection: 'posts',
          depth: 2,
          limit: 12,
          page: sanitizedPageNumber,
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
        .catch((error) => {
          console.error('Erro ao buscar posts para listagem:', error)
          // Gracefully fall back to an empty result so the page can render
          return {
            docs: [] as Post[],
            page: sanitizedPageNumber,
            totalPages: 1,
          }
        })
      : null) || { docs: [], page: sanitizedPageNumber, totalPages: 1 }

  const posts = result.docs.map((post) => formatPostForGrid(post))

  return (
    <div className='min-h-screen bg-white'>
      <PageClient />
      {/* Header Section */}
      <section className='pt-20 pb-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <p className='text-text-soft-400 text-subheading-sm uppercase mb-4'>
              BLOG
            </p>
            <h1 className='text-text-strong-950 text-title-h2'>
              Our latest news
            </h1>
          </div>

          {/* Articles Grid */}
          <div className='max-w-7xl mx-auto'>
            <PostsGrid posts={posts} />
          </div>
        </div>
      </section>

      {/* Pagination */}
      {result?.page && result?.totalPages > 1 && (
        <div className='container mx-auto px-4 pb-16'>
          <Pagination page={result.page} totalPages={result.totalPages} />
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Posts Page ${pageNumber || ''} - AIBE`,
    description: 'Leia nossos artigos e notícias mais recentes',
  }
}

export async function generateStaticParams() {
  let payload = null

  try {
    payload = await getPayload({ config: configPromise })
  } catch (error) {
    console.error('Erro ao inicializar Payload para geração estática:', error)
  }
  const { totalDocs } =
    (payload
      ? await payload
        .count({
          collection: 'posts',
          overrideAccess: false,
        })
        .catch((error) => {
          console.error('Erro ao contar posts para geração estática:', error)
          return { totalDocs: 0 }
        })
      : null) || { totalDocs: 0 }

  const totalPages = Math.ceil(totalDocs / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
