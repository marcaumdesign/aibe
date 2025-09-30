import { Metadata } from 'next';
import Image from 'next/image';
import CTA from '@/components/cta';

export const metadata: Metadata = {
  title: 'Academic cooperation as a driver of innovation in economics - AIBE',
  description: 'Brazilian and Italian researchers explore how international partnerships enhance the relevance and impact of economic research.',
};

export default function AcademicCooperationPage() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Header Section */}
      <section className='pt-20 pb-16'>
        <div className='container mx-auto px-4 max-w-4xl'>
          <div className='text-center mb-16'>
            <p className='text-subheading-sm text-text-soft-400 uppercase tracking-wider mb-4'>
              BLOG
            </p>
            <h1 className='text-title-h1 text-text-strong-950 font-semibold mb-6'>
              Academic cooperation as a driver of innovation in economics
            </h1>
            <p className='text-paragraph-lg text-text-sub-600 max-w-3xl mx-auto'>
              Brazilian and Italian researchers explore how international partnerships enhance the relevance and impact of economic research.
            </p>
          </div>

          {/* Main Image */}
          <div className='relative w-full h-[400px] mb-12 overflow-hidden'>
            <Image
              src='/images/image 143.png'
              alt='Brazilian and Italian researchers in a collaborative meeting'
              fill
              className='object-cover'
              priority
            />
          </div>

          {/* Article Content */}
          <div className='prose prose-lg max-w-none'>
            <div className='space-y-6 text-paragraph-md text-text-sub-600 leading-relaxed'>
              <p>
                In a world where economies are increasingly interconnected, academic cooperation plays a crucial role in shaping innovative approaches to economic research. The exchange of knowledge between Brazilian and Italian researchers has proven to be not only a source of intellectual enrichment but also a catalyst for new methods, models, and solutions to global challenges.
              </p>

              <p>
                Over the last decades, bilateral initiatives have shown how joint efforts can enhance the relevance of economic studies. Collaborative workshops, such as the annual AIBE Workshop, create platforms where early-career and senior scholars alike can present their research, receive feedback, and develop international networks. This environment of dialogue fosters fresh perspectives and paves the way for groundbreaking studies in areas such as digital finance, sustainable development, and public policy design.
              </p>

              <p>
                One of the strongest impacts of cooperation is seen in the growth of co-authored publications between Brazilian and Italian economists. These partnerships bring together diverse academic traditions and methodologies, resulting in research that is more comprehensive and globally relevant. At the same time, they help build a resilient academic community that values diversity, openness, and shared goals.
              </p>

              <p>
                Looking ahead, academic cooperation will remain essential in driving innovation. By strengthening institutional ties, supporting mobility programs for students and researchers, and expanding access to funding opportunities, AIBE and its partners continue to nurture the conditions under which knowledge can truly flourish.
              </p>

              <p>
                In conclusion, cooperation is not only about connecting researchers — it is about building a global academic ecosystem capable of generating ideas that address the pressing economic challenges of our time.
              </p>
            </div>
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
