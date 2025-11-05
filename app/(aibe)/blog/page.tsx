import { Metadata } from 'next';
import CTA from '@/components/cta';
import BlogGrid from '@/components/blog/blog-grid';

export const metadata: Metadata = {
  title: 'Blog - AIBE',
  description: 'Leia nossos artigos e notícias mais recentes',
};

async function getNews() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/news`, {
      cache: 'no-store',
      next: { revalidate: 0 },
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

export default async function BlogPage() {
  const news = await getNews();

  return (
    <div className='min-h-screen bg-white'>
      {/* Header Section */}
      <section className='pt-20 pb-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <p className='text-subheading-sm text-text-soft-400 uppercase tracking-wider mb-4'>
              BLOG
            </p>
            <h1 className='text-title-h2 text-text-strong-950'>
              Our latest news
            </h1>
          </div>

          {/* Articles Grid */}
          <div className='max-w-7xl mx-auto'>
            <BlogGrid posts={news} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="mt-48">
        <CTA />
      </div>
    </div>
  );
}
