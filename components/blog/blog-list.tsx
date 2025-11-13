import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Root as Badge } from '@/components/ui/badge';
import { Root as Button } from '@/components/ui/button';
import { fetchArticles } from '@/lib/strapi';

export default async function BlogList() {
  let posts = [] as Awaited<ReturnType<typeof fetchArticles>>;
  try {
    posts = await fetchArticles();
  } catch {
    return (
      <div className='py-12 text-center'>
        <h3 className='text-xl mb-2 font-semibold'>Erro ao carregar artigos</h3>
        <p className='text-text-weak-600'>Tente novamente mais tarde.</p>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className='py-12 text-center'>
        <h3 className='text-xl mb-2 font-semibold'>Nenhum artigo publicado</h3>
        <p className='text-text-weak-600'>
          Assim que houver conteúdo, ele aparecerá aqui.
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {posts.map((post) => (
        <Card
          key={post.id}
          className='hover:shadow-lg h-full transition-shadow duration-200'
        >
          {post.cover?.url && (
            <div className='relative w-full aspect-square overflow-hidden rounded-t-lg'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover.formats?.medium?.url || post.cover.url}
                alt={post.cover.alternativeText || post.title}
                className='h-full w-full object-cover'
              />
            </div>
          )}

          <CardHeader>
            <div className='mb-2 flex items-center gap-2'>
              {post.category?.name && (
                <Badge variant='light' className='text-xs'>
                  {post.category.name}
                </Badge>
              )}
            </div>

            <CardTitle className='text-lg line-clamp-2'>
              <Link href={`/blog/${post.slug}`} className='hover:underline'>
                {post.title}
              </Link>
            </CardTitle>
            <CardDescription className='text-sm'>
              {formatDate(post.publishedAt)}
            </CardDescription>
          </CardHeader>

          <CardContent className='flex flex-1 flex-col'>
            {post.description && (
              <p className='text-text-weak-700 mb-4 line-clamp-3'>
                {post.description}
              </p>
            )}
            <div className='flex items-center justify-between'>
              {post.author?.name && (
                <span className='text-sm text-text-weak-600'>
                  Por {post.author.name}
                </span>
              )}
              <Button asChild variant='neutral' mode='stroke' size='small'>
                <Link href={`/blog/${post.slug}`}>Ler mais</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
