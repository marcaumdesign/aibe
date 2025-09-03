import { Metadata } from 'next';
import BlogList from '@/components/blog/blog-list';

export const metadata: Metadata = {
  title: 'Blog - AIBE',
  description: 'Leia nossos artigos e notícias mais recentes',
};

export default function BlogPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-4xl mb-4 font-bold text-text-strong-950'>Blog</h1>
        <p className='text-lg text-text-weak-600'>
          Descubra insights, novidades e tendências em nossos artigos
        </p>
      </div>

      <BlogList />
    </div>
  );
}
