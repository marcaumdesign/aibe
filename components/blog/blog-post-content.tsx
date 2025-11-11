import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface ContentBlock {
  __component: string;
  id: number;
  body?: string;
  title?: string;
}

interface BlogPostContentProps {
  content: ContentBlock[];
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  if (!content || content.length === 0) {
    return (
      <div className='text-text-sub-600'>
        <p>Conteúdo não disponível.</p>
      </div>
    );
  }

  return (
    <div className='prose prose-lg max-w-none'>
      <div className='space-y-6 text-paragraph-md text-text-sub-600 leading-relaxed'>
        {content.map((block) => {
          if (block.__component === 'shared.rich-text') {
            return (
              <div key={`rt-${block.id}`} className='mb-8'>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className='mb-4 mt-8 text-title-h1 font-bold text-text-strong-950'>
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className='mb-3 mt-6 text-title-h2 font-bold text-text-strong-950'>
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className='mb-2 mt-4 text-title-h3 font-bold text-text-strong-950'>
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className='text-paragraph-md text-text-sub-600 mb-4'>
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className='font-semibold text-text-strong-950'>
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className='italic'>{children}</em>
                    ),
                    a: ({ href, children }) => (
                      <Link
                        href={href}
                        className='text-primary-base hover:underline'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {children}
                      </Link>
                    ),
                    ul: ({ children }) => (
                      <ul className='mb-4 list-disc list-inside space-y-2 text-text-sub-600'>
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className='mb-4 list-decimal list-inside space-y-2 text-text-sub-600'>
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className='text-text-sub-600'>{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className='text-text-sub-600 mb-4 border-l-4 border-primary-base pl-4 italic'>
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className='text-sm rounded bg-gray-100 px-2 py-1 font-mono text-text-strong-950'>
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
                  {block.body || ''}
                </ReactMarkdown>
              </div>
            );
          }

          if (block.__component === 'shared.quote') {
            return (
              <Card key={`qt-${block.id}`} className='mb-6'>
                <CardContent className='py-6'>
                  <blockquote className='border-l-4 border-primary-base pl-4 italic text-text-sub-600'>
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


