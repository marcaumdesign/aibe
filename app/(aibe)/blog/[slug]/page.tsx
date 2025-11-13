import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPostHero from '@/components/blog/blog-post-hero';
import BlogPostContent from '@/components/blog/blog-post-content';
import BlogPostSidebar from '@/components/blog/blog-post-sidebar';
import { fetchArticleBySlug, fetchArticles } from '@/lib/strapi';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

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

// Buscar últimos posts para a sidebar
async function fetchLatestPosts(): Promise<LatestPost[]> {
  try {
    const articles = await fetchArticles();

    // Retornar apenas os 4 primeiros, mapeando para o formato esperado
    return articles.slice(0, 4).map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      image: article.cover
        ? {
          url: article.cover.url,
          alternativeText: article.cover.alternativeText,
        }
        : null,
      date: article.publishedAt,
    }));
  } catch (error) {
    console.error('Erro ao buscar últimos posts:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await fetchArticleBySlug(slug);

    if (!article) {
      return { title: 'Artigo não encontrado - AIBE' };
    }

    return {
      title: `${article.title} - AIBE Blog`,
      description: article.description || undefined,
      alternates: { canonical: `/blog/${article.slug}` },
      openGraph: {
        title: article.title,
        description: article.description || undefined,
        images: article.cover?.url ? [{ url: article.cover.url }] : undefined,
        type: 'article',
        publishedTime: article.publishedAt,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.description || undefined,
        images: article.cover?.url ? [article.cover.url] : undefined,
      },
    };
  } catch (error) {
    console.error('Erro ao gerar metadata:', error);
    return { title: 'Artigo - AIBE' };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return notFound();
  }

  // Buscar últimos posts para a sidebar
  const latestPosts = await fetchLatestPosts();

  // Mapear o artigo do Strapi para o formato esperado pelos componentes
  const post = {
    title: article.title,
    description: article.description,
    image: article.cover
      ? {
        url: article.cover.url,
        alternativeText: article.cover.alternativeText,
        formats: article.cover.formats,
      }
      : null,
    publishedAt: article.publishedAt,
    author: article.author,
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <BlogPostHero post={post} />

      {/* Main Content - 2 Columns Layout */}
      <section className='pb-16'>
        <div className='container mx-auto px-4 max-w-7xl'>
          <div className='grid grid-cols-12 gap-8'>
            {/* Main Content - 8 columns */}
            <div className='col-span-12 lg:col-span-8'>
              <BlogPostContent content={article.blocks || []} />
            </div>

            {/* Sidebar - 4 columns */}
            <div className='col-span-12 lg:col-span-4'>
              <BlogPostSidebar latest={latestPosts} tags={[]} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
