import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CTA from '@/components/cta';
import { Root as Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Blog - AIBE',
  description: 'Leia nossos artigos e notícias mais recentes',
};

// Dados mockados dos artigos baseados no design
const blogArticles = [
  {
    id: 1,
    image: '/images/image blog 1.png',
    category: 'NEWS',
    date: 'July 3, 2024',
    title: 'Meeting with the Italian Consul-General in São Paulo, Domenico Fornara',
    description: 'AIBE representatives met with the Consul-General to strengthen institutional ties and promote academic cooperation.',
    slug: 'meeting-italian-consul-general'
  },
  {
    id: 2,
    image: '/images/image blog 2.png',
    category: 'BLOG',
    date: 'June 26, 2024',
    title: 'Academic cooperation as a driver of innovation in economics',
    description: 'Brazilian and Italian researchers explore how international partnerships enhance the relevance and impact of economic research.',
    slug: 'academic-cooperation-innovation-economics'
  },
  {
    id: 3,
    image: '/images/image blog 3.png',
    category: 'NEWS',
    date: 'June 14, 2024',
    title: 'AIBE presented at FAPESP\'s "Day of Italy" event',
    description: 'The presentation emphasized Italian-Brazilian academic cooperation and the association\'s scientific initiatives.',
    slug: 'aibe-fapesp-day-italy'
  },
  {
    id: 4,
    image: '/images/image blog 1.png',
    category: 'NEWS',
    date: 'July 3, 2024',
    title: 'Meeting with the Italian Consul-General in São Paulo, Domenico Fornara',
    description: 'AIBE representatives met with the Consul-General to strengthen institutional ties and promote academic cooperation.',
    slug: 'meeting-italian-consul-general-2'
  },
  {
    id: 5,
    image: '/images/image blog 2.png',
    category: 'BLOG',
    date: 'June 26, 2024',
    title: 'Academic cooperation as a driver of innovation in economics',
    description: 'Brazilian and Italian researchers explore how international partnerships enhance the relevance and impact of economic research.',
    slug: 'academic-cooperation-innovation-economics-2'
  },
  {
    id: 6,
    image: '/images/image blog 3.png',
    category: 'NEWS',
    date: 'June 14, 2024',
    title: 'AIBE presented at FAPESP\'s "Day of Italy" event',
    description: 'The presentation emphasized Italian-Brazilian academic cooperation and the association\'s scientific initiatives.',
    slug: 'aibe-fapesp-day-italy-2'
  }
];

export default function BlogPage() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Header Section */}
      <section className='pt-20 pb-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <p className='text-subheading-sm text-text-soft-400 uppercase tracking-wider mb-4'>
              BLOG
            </p>
            <h1 className='text-title-h2 text-text-strong-950 font-semibold'>
              Our latest news
            </h1>
          </div>

          {/* Articles Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
            {blogArticles.map((article) => (
              <article key={article.id} className='group cursor-pointer'>
                <Link href={`/blog/${article.slug}`}>
                  <div className='bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300'>
                    {/* Image */}
                    <div className='relative h-64 overflow-hidden'>
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                    </div>

                    {/* Content */}
                    <div className='p-6'>
                      {/* Category and Date */}
                      <div className='flex items-center gap-2 mb-4'>
                        <Badge
                          variant='light'
                          className='bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-none'
                        >
                          {article.category}
                        </Badge>
                        <span className='text-text-soft-400 text-sm'>•</span>
                        <span className='text-text-soft-400 text-sm'>{article.date}</span>
                      </div>

                      {/* Title */}
                      <h2 className='text-title-h6 text-text-strong-950 font-semibold mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors duration-200'>
                        {article.title}
                      </h2>

                      {/* Description */}
                      <p className='text-paragraph-sm text-text-sub-600 line-clamp-3 text-left justify-start'>
                        {article.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
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
