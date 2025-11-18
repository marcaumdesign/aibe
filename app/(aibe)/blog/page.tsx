import { Metadata } from 'next';
import CTA from '@/components/cta';
import BlogGrid from '@/components/blog/blog-grid';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Post } from '@/payload-types';

export const metadata: Metadata = {
  title: 'Blog - AIBE',
  description: 'Leia nossos artigos e notícias mais recentes',
};

type BlogPostCard = {
  id: string | number;
  title: string;
  slug: string;
  description: string | null;
  image: {
    url: string;
    alternativeText?: string;
  } | null;
  date: string;
  category?: {
    name: string;
    slug: string;
  };
};

async function getPosts(): Promise<BlogPostCard[]> {
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
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
      publishedAt: true,
      createdAt: true,
    },
  });

  return posts.docs.map((post) => formatPostForGrid(post));
}

function formatPostForGrid(post: Post): BlogPostCard {
  const primaryCategory =
    Array.isArray(post.categories) && post.categories.length > 0
      ? post.categories.find((category) => typeof category === 'object' && category !== null)
      : undefined;

  const metaImage = post.meta?.image;
  const resolvedImage =
    metaImage && typeof metaImage === 'object'
      ? {
        url: metaImage?.sizes?.medium?.url || metaImage?.url || '',
        alternativeText: metaImage?.alt || post.title || undefined,
      }
      : null;

  return {
    id: post.id,
    title: post.title || 'Sem título',
    slug: post.slug || '',
    description: post.meta?.description || null,
    image: resolvedImage?.url ? resolvedImage : null,
    date: post.publishedAt || post.createdAt || new Date().toISOString(),
    category: primaryCategory
      ? {
        name: primaryCategory.title || 'Categoria',
        slug: primaryCategory.slug || '',
      }
      : undefined,
  };
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className='min-h-screen bg-white'>
      {/* Header Section */}
      <section className='pt-20 pb-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <p className='text-subheading-sm text-text-soft-400 uppercase  mb-4'>
              BLOG
            </p>
            <h1 className='text-title-h2 text-text-strong-950'>
              Our latest news
            </h1>
          </div>

          {/* Articles Grid */}
          <div className='max-w-7xl mx-auto'>
            <BlogGrid posts={posts} />
          </div>
        </div>
      </section>


    </div>
  );
}
