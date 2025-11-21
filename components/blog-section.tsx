'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as Button from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogSection() {
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Garantir que só executa no cliente
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function loadPosts() {
      try {
        const res = await fetch('/api/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!isMounted) return;

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setPosts(data.posts || []);
            setError(null);
          }
        } else {
          const errorText = await res.text().catch(() => res.statusText);
          console.error('Erro ao carregar posts:', res.status, errorText);
          if (isMounted) {
            setPosts([]);
            setError('Erro ao carregar posts');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        if (isMounted) {
          setPosts([]);
          setError('Erro ao conectar com o servidor');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayPosts = posts.slice(0, 3);

  if (loading) {
    return (
      <section className='p-8 mobile:p-4'>
        <div className='mx-auto max-w-[1200px]'>
          <div className='text-center'>
            <p className='text-paragraph-lg text-text-sub-600'>Carregando posts...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='p-8 mobile:p-4'>
        <div className='mx-auto max-w-[1200px]'>
          <div className='text-center'>
            <p className='text-paragraph-lg text-red-500'>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='p-8 mobile:p-4'>
      <div className='mx-auto max-w-[1200px]'>
        <header className='flex items-center justify-between mb-12'>
          <div>
            <Badge variant='with-dot' size='medium'>
              Blog
            </Badge>
            <h2 className='text-primary-base text-title-h2 '>
              News
            </h2>
          </div>
          <Button.Root variant='primary' size='medium' className='h-hug w-fit' asChild>
            <Link href='/posts'>
              See More
            </Link>
          </Button.Root>
        </header>

        {displayPosts.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {displayPosts.map((post: NewsItem) => (
              <article key={post.id} className='group'>
                <Link href={`/posts/${post.slug}`}>
                  <div className='overflow-hidden'>
                    {post.image && (
                      <div className='relative w-full h-[250px] overflow-hidden'>
                        <Image
                          src={post.image.url}
                          alt={post.image.alternativeText || post.title}
                          fill
                          className='object-cover transition-transform duration-300 group-hover:scale-105'
                          style={{ objectPosition: 'center 15%' }}
                        />
                      </div>
                    )}
                  </div>
                  <div className='mt-4 flex items-center text-sm text-gray-500 gap-2'>
                    {post.category && (
                      <span className='bg-[#0A1A4F] text-white text-[10px] font-medium px-1.5 py-0.5 uppercase tracking-wide'>
                        {post.category.name}
                      </span>
                    )}
                    <span>•</span>
                    <time>{formatDate(post.date)}</time>
                  </div>
                  <h6 className='text-title-h6 text-black mt-2'>
                    {post.title}
                  </h6>
                  {post.description && (
                    <p className='text-sub-600 text-paragraph-sm mt-1 line-clamp-3'>
                      {post.description}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-paragraph-lg text-text-sub-600'>Nenhum post disponível no momento.</p>
          </div>
        )}
      </div>
    </section>
  );
}

