import Link from 'next/link';
import Image from 'next/image';

interface BlogPostHeroProps {
  post: {
    title: string;
    description: string | null;
    image: {
      url: string;
      alternativeText?: string;
      formats?: {
        large?: { url: string };
        medium?: { url: string };
      };
    } | null;
    publishedAt: string;
    author?: {
      name: string;
    };
  };
}

export default function BlogPostHero({ post }: BlogPostHeroProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <section className='pt-20 pb-16'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Breadcrumb */}
        <nav className='mb-8'>
          <ol className='flex items-center space-x-2 text-sm text-text-soft-400'>
            <li>
              <Link href='/' className='flex items-center hover:text-text-sub-600 transition-colors'>
                <span className='mr-2'>←</span>
                Home
              </Link>
            </li>
            <li className='text-text-soft-400'>/</li>
            <li>
              <Link href='/blog' className='hover:text-text-sub-600 transition-colors'>
                Blog
              </Link>
            </li>
          </ol>
        </nav>

        {/* Header Content */}
        <div className='text-center mb-16 max-w-4xl mx-auto'>
          <p className='text-subheading-sm text-text-soft-400 uppercase tracking-wider mb-4'>
            BLOG
          </p>
          <h1 className='text-title-h1 text-text-strong-950 font-semibold mb-6'>
            {post.title}
          </h1>
          {post.description && (
            <p className='text-paragraph-lg text-text-sub-600 max-w-3xl mx-auto mb-6'>
              {post.description}
            </p>
          )}

          {/* Meta Info */}
          <div className='flex items-center justify-center gap-3 text-sm text-text-weak-600'>
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
        {post.image && (
          <div className='relative w-full h-[400px] mb-12 overflow-hidden rounded-lg'>
            <Image
              src={post.image.formats?.large?.url || post.image.url}
              alt={post.image.alternativeText || post.title}
              fill
              className='object-cover'
              priority
              quality={100}
              sizes="(max-width: 1280px) 100vw, 1280px"
              style={{ objectPosition: 'center 15%' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

