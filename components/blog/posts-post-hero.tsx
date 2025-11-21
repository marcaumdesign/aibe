import Link from 'next/link';
import Image from 'next/image';
import { getMediaUrl } from '@/utilities/getMediaUrl';
import type { Media } from '@/payload-types';

interface PostsPostHeroProps {
  post: {
    title: string;
    description: string | null;
    image: {
      url: string;
      alternativeText?: string;
      sizes?: Media['sizes'];
    } | null;
    publishedAt: string;
    author?: {
      name: string;
    };
  };
}

export default function PostsPostHero({ post }: PostsPostHeroProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  // Construir URL da imagem corretamente
  const imageUrl = post.image
    ? (() => {
      const url = post.image.sizes?.large?.url || post.image.url;
      return getMediaUrl(url);
    })()
    : '';

  return (
    <section className='pt-20 mobile:pt-8 pb-16 mobile:pb-8'>
      <div className='container items-start justify-start mx-auto px-4 max-w-7xl'>
        {/* Breadcrumb */}
        <nav className='mb-8 mobile:mb-6'>
          <ol className='flex items-center space-x-2 text-sm text-text-soft-400'>
            <li>
              <Link href='/' className='flex items-center hover:text-text-sub-600 transition-colors'>
                <span className='mr-2'>←</span>
                Home
              </Link>
            </li>
            <li className='text-text-soft-400'>/</li>
            <li>
              <Link href='/posts' className='hover:text-text-sub-600 transition-colors'>
                Blog
              </Link>
            </li>
          </ol>
        </nav>

        {/* Header Content */}
        <div className='text-left mb-16 mobile:mb-8 items-start max-w-4xl mx-auto'>

          <h1 className='text-title-h1 text-left text-text-strong-950 font-semibold mb-6 mobile:mb-4'>
            {post.title}
          </h1>
          {post.description && (
            <p className='text-paragraph-lg text-left text-text-sub-600  mx-auto mb-6 mobile:mb-4'>
              {post.description}
            </p>
          )}

          {/* Meta Info */}
          <div className='flex items-start text-left justify-start gap-3 text-sm text-text-weak-600'>
            {post.author?.name && (
              <>
                <span>By {post.author.name}</span>
                <span>•</span>
              </>
            )}
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </div>

        {/* Featured Image */}
        {post.image && imageUrl && (
          <div className='relative w-full aspect-square mb-12 mobile:mb-8 overflow-hidden rounded-lg max-w-md mobile:max-w-full mx-auto'>
            <Image
              src={imageUrl}
              alt={post.image.alternativeText || post.title}
              fill
              className='object-cover'
              priority
              quality={100}
              sizes="(max-width: 768px) 100vw, 448px"
              style={{ objectPosition: 'center 15%' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
