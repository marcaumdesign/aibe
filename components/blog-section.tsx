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

async function getNews() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/news`, {
      next: { revalidate: 60 }, // Cache por 60 segundos
    });

    if (!res.ok) {
      console.error('Erro ao buscar notícias:', res.status);
      return [];
    }

    const data = await res.json();
    return data.news || [];
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return [];
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogSection() {
  const posts = await getNews();
  const displayPosts = posts.slice(0, 3);

  return (
    <section className='py-20'>
      <div className='container mx-auto max-w-[1200px] px-4'>
        <header className='flex items-center justify-between mb-12'>
          <div>
            <span className='text-sm text-gray-400 uppercase tracking-wide'>• BLOG</span>
            <h2 className='text-title-h2 text-black mt-1'>
              Our latest news
            </h2>
          </div>
          <Link
            href='/blog'
            className='bg-[#0A1A4F] text-white text-sm font-medium px-5 py-2 hover:bg-[#0357B9] transition duration-200 ease-out'
          >
            See More
          </Link>
        </header>

        {displayPosts.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {displayPosts.map((post: NewsItem) => (
              <article key={post.id} className='group'>
                <Link href={`/blog/${post.slug}`}>
                  <div className='overflow-hidden'>
                    {post.image && (
                      <div className='relative w-full aspect-square overflow-hidden'>
                        <Image
                          src={post.image.url.startsWith('http') ? post.image.url : `https://majestic-serenity-7a76c06678.strapiapp.com${post.image.url}`}
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
                  <h3 className='text-title-h5 text-black mt-2'>
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className='text-sub-600 text-paragraph-lg mt-1 line-clamp-3'>
                      {post.description}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <p className='text-paragraph-lg text-text-sub-600'>Nenhuma notícia disponível no momento.</p>
          </div>
        )}
      </div>
    </section>
  );
}

