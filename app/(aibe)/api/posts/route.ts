import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Post } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface PostItem {
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

function formatPost(post: Post): PostItem {
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

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'posts',
      depth: 2,
      limit: 100,
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

    const posts = result.docs.map((post) => formatPost(post))

    return NextResponse.json({ posts, success: true }, { 
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json(
      { error: errorMessage, posts: [] },
      { status: 500 },
    )
  }
}

