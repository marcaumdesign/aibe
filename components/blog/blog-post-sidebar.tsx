import Link from 'next/link';
import Image from 'next/image';
import CTA from '@/components/cta';
import { Root as Badge } from '@/components/ui/badge';

interface LatestPost {
  id: string | number;
  title: string;
  slug: string;
  image: {
    url: string;
    alternativeText?: string;
  } | null;
  date: string;
}

interface BlogPostSidebarProps {
  latest: LatestPost[];
  tags?: string[];
}

export default function BlogPostSidebar({ latest, tags }: BlogPostSidebarProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <aside className='space-y-12'>
      {/* Latest Posts */}
      {latest && latest.length > 0 && (
        <div className='bg-white rounded-lg border border-gray-200 p-6'>
          <h3 className='text-title-h4 font-semibold text-text-strong-950 mb-6'>
            Latest Publications
          </h3>
          <div className='space-y-4'>
            {latest.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className='flex gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors'
              >
                {post.image && (
                  <div className='relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden'>
                    <Image
                      src={post.image.url}
                      alt={post.image.alternativeText || post.title}
                      fill
                      className='object-cover'
                      quality={95}
                      style={{ objectPosition: 'center 15%' }}
                    />
                  </div>
                )}
                <div className='flex-1 min-w-0'>
                  <h4 className='text-sm font-medium text-text-strong-950 line-clamp-2 group-hover:text-primary-base transition-colors'>
                    {post.title}
                  </h4>
                  <time className='text-xs text-text-weak-600 mt-1 block'>
                    {formatDate(post.date)}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className='bg-white rounded-lg border border-gray-200 p-6'>
          <h3 className='text-title-h4 font-semibold text-text-strong-950 mb-4'>
            Tags
          </h3>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag, index) => (
              <Badge key={index} variant='light'>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className='sticky top-8 w-full max-w-md mx-auto'>
        <div className='relative bg-primary-base rounded-lg p-8 text-center overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]'>
          {/* Animated gradient background */}
          <div className='absolute inset-0 bg-gradient-to-br from-primary-base via-blue-700 to-primary-base opacity-0 group-hover:opacity-100 transition-opacity duration-700'></div>

          {/* Shine effect */}
          <div className='absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000'>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500'></div>
          </div>

          <div className='relative z-10'>
            <h3 className='text-title-h4 font-semibold text-white mb-3 group-hover:scale-105 transition-transform duration-300'>
              Join AIBE
            </h3>
            <p className='text-paragraph-md text-white mb-6 group-hover:text-gray-50 transition-colors duration-300'>
              Connect with researchers and strengthen academic cooperation between Brazil and Italy.
            </p>
            <Link
              href='/membership'
              className='inline-block bg-white text-primary-base px-6 py-3 rounded-lg font-medium hover:bg-gray-50 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:-translate-y-1'
            >
              Become a Member
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

