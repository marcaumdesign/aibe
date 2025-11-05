import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchArticleBySlug, fetchArticleSlugs } from '@/lib/strapi';
import { Card, CardContent } from '@/components/ui/card';
import { Root as Badge } from '@/components/ui/badge';

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const slugs = await fetchArticleSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await fetchArticleBySlug(slug);
    if (!article) return { title: 'Artigo não encontrado' };
    return {
      title: `${article.title} - AIBE Blog`,
      description: article.description || undefined,
      alternates: { canonical: `/blog/${article.slug}` },
      openGraph: {
        title: article.title,
        description: article.description || undefined,
        images: article.cover?.url ? [{ url: article.cover.url }] : undefined,
      },
    };
  } catch {
    return { title: 'Artigo' };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) return notFound();

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6'>
        <Link href='/blog' className='text-text-weak-600 hover:underline'>
          ← Voltar para o blog
        </Link>
      </div>

      <h1 className='text-4xl mb-3 font-bold text-text-strong-950'>
        {article.title}
      </h1>
      <div className='text-sm text-text-weak-600 mb-6 flex flex-wrap items-center gap-3'>
        {article.category?.name && (
          <Badge variant='light'>{article.category.name}</Badge>
        )}
        <span>Publicado em {formatDate(article.publishedAt)}</span>
        {article.author?.name && <span>por {article.author.name}</span>}
      </div>

      {article.cover?.url && (
        <div className='mb-8 overflow-hidden rounded-lg'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover.formats?.large?.url || article.cover.url}
            alt={article.cover.alternativeText || article.title}
            className='h-auto w-full object-cover'
          />
        </div>
      )}

      {article.description && (
        <p className='text-lg text-text-weak-700 mb-8'>{article.description}</p>
      )}

      <div className='prose prose-neutral dark:prose-invert max-w-none'>
        {article.blocks?.map((block) => {
          if (block.__component === 'shared.rich-text') {
            return (
              <div key={`rt-${block.id}`} className='mb-8'>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className='mb-4 mt-8 text-title-h1 font-bold'>
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className='mb-3 mt-6 text-title-h2 font-bold'>
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className='mb-2 mt-4 text-title-h3 font-bold'>
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className='text-paragraph-md'>{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong className='text-label-md'>{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className='italic'>{children}</em>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className='text-blue-600 hover:underline'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {children}
                      </a>
                    ),
                    ul: ({ children }) => (
                      <ul className='mb-4 list-inside list-disc space-y-1'>
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className='mb-4 list-inside list-decimal space-y-1'>
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className='text-text-weak-700'>{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className='text-text-weak-600 mb-4 border-l-4 border-gray-300 pl-4 italic'>
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className='text-sm rounded bg-gray-100 px-2 py-1 font-mono'>
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className='mb-4 overflow-x-auto rounded-lg bg-gray-100 p-4'>
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {block.body}
                </ReactMarkdown>
              </div>
            );
          }
          if (block.__component === 'shared.quote') {
            return (
              <Card key={`qt-${block.id}`} className='mb-6'>
                <CardContent className='py-6'>
                  <blockquote className='border-l-4 pl-4 italic'>
                    {block.body}
                  </blockquote>
                  {block.title && (
                    <div className='text-sm text-text-weak-600 mt-2 text-right'>
                      — {block.title}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
