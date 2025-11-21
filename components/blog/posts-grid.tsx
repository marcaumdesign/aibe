'use client';

import Image from 'next/image';
import Link from 'next/link';

interface NewsItem {
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
}

interface PostsGridProps {
  posts: NewsItem[];
  maxPosts?: number;
}

export default function PostsGrid({ posts, maxPosts }: PostsGridProps) {
  const displayPosts = maxPosts ? posts.slice(0, maxPosts) : posts;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (posts.length === 0) {
    return (
      <div className='py-12 text-center'>
        <h3 className='text-xl mb-2 font-semibold'>Nenhuma notícia disponível</h3>
        <p className='text-text-sub-600'>
          Assim que houver conteúdo, ele aparecerá aqui.
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-3 mobile:grid-cols-1 gap-8'>
      {displayPosts.map((post) => (
        <article key={post.id} className='group cursor-pointer'>
          <Link href={`/posts/${post.slug}`}>
            <div className='bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300'>
              {/* Image */}
              {post.image && (
                <div className='relative w-full aspect-square overflow-hidden'>
                  <Image
                    src={post.image.url.startsWith('http') ? post.image.url : `https://majestic-serenity-7a76c06678.strapiapp.com${post.image.url}`}
                    alt={post.image.alternativeText || post.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                    style={{ objectPosition: 'center 15%' }}
                  />
                </div>
              )}

              {/* Content */}
              <div className='py-6'>
                {/* Category and Date */}
                <div className='flex items-center gap-2 mb-4 text-sm text-gray-500'>
                  {post.category && (
                    <span className='bg-[#0A1A4F] text-white text-[10px] font-medium px-1.5 py-0.5 uppercase tracking-wide'>
                      {post.category.name}
                    </span>
                  )}
                  <span>•</span>
                  <time>{formatDate(post.date)}</time>
                </div>

                {/* Title */}
                <h2 className='text-title-h6 text-text-strong-950 mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors duration-200'>
                  {post.title}
                </h2>

                {/* Description */}
                {post.description && (
                  <p className='text-paragraph-sm text-text-sub-600 line-clamp-3 text-left justify-start'>
                    {post.description}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

