import Image from "next/image";
import { Root as Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from '@/components/ui/badge';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import RichText from '@/components/RichText';
import { getMediaUrl } from '@/utilities/getMediaUrl';

import type { PrizesPage as PrizesPageType, Winner, User } from '@/payload-types';

// Helper function to convert markdown bullets to list items
const renderMarkdownList = (text: string | null | undefined): string[] => {
  if (!text) return []
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('-') || line.startsWith('*'))
    .map(line => line.replace(/^[-*]\s*/, ''))
}

// Helper to format author name
const formatAuthorName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
}

export default async function PrizesPage() {
  const payload = await getPayload({ config: configPromise });

  // Fetch the Prizes Page global
  const prizesPageData = await payload.findGlobal({
    slug: 'prizes-page',
    depth: 2,
  }) as PrizesPageType;

  // Fetch winners from the collection
  const winnersResult = await payload.find({
    collection: 'winners',
    depth: 2,
    sort: '-year', // Sort by year descending (most recent first)
    limit: 100,
  });

  const winners = winnersResult.docs as Winner[];

  // Extract data with fallbacks
  const callForSubmissions = prizesPageData?.callForSubmissions;
  const officialLaunch = prizesPageData?.officialLaunch;

  // Resolve official launch image
  let resolvedOfficialLaunchImage = null;
  if (officialLaunch?.image && typeof officialLaunch.image === 'object') {
    const url = officialLaunch.image.url;
    if (url) {
      resolvedOfficialLaunchImage = {
        url: getMediaUrl(url, officialLaunch.image.updatedAt),
        alt: officialLaunch.image.alt || 'Official Launch of the Prize',
      };
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className='relative mt-4 w-full h-[150px] md:h-[120px] mobile:h-[100px]'>
        <Image
          src='/images/heroimage.png'
          alt='Hero'
          fill
          className='object-cover'
        />
      </div>

      {/* Call for Submissions Section - Conditionally rendered */}
      {callForSubmissions?.enabled && (
        <main className="relative bg-white flex flex-col pt-4 pb-8 px-8 md:pt-6 md:pb-6 md:px-6 mobile:pt-8 mobile:pb-4 mobile:px-4">
          {/* Prizes Section */}
          <section className="max-w-[1200px] mx-auto w-full pb-16">
            <div className="flex flex-col gap-4 items-center justify-center">
              {/* Small label */}
              <Badge variant='with-dot' size='medium'>
                PRIZES
              </Badge>

              <div className="flex gap-8">
                <h2 className="text-text-strong-950 text-title-h2 text-center max-w-2xl mx-auto">
                  Giorgio Mortara Prize
                </h2>
              </div>

              {/* Subtitle */}
              <p className="text-text-sub-600 text-center max-w-3xl text-paragraph-lg pb-4">
                For the best paper in economics co-authored by an Italian-Brazilian research team.
              </p>
            </div>

            {/* Prize Description - Introduction from Payload */}
            <div className="prose prose-lg max-w-none py-8 flex flex-col gap-4">
              <h4 className="text-primary-base text-title-h4 w-full text-center">
                Call for Submissions
              </h4>
              {callForSubmissions.introduction && (
                <RichText
                  className="text-text-sub-600 text-paragraph-md max-w-none [&_p]:text-text-sub-600 [&_p]:text-paragraph-md"
                  data={callForSubmissions.introduction}
                  enableGutter={false}
                  enableProse={false}
                />
              )}
            </div>

            {/* Deadline and First Button */}
            <div className="py-6 flex flex-col gap-6 items-center">
              {callForSubmissions.deadline && (
                <p className="text-error-base text-center text-paragraph-md">
                  <strong>The deadline for submission is {callForSubmissions.deadline}</strong>
                </p>
              )}

              {callForSubmissions.firstButton?.text && callForSubmissions.firstButton?.link && (
                <Link href={callForSubmissions.firstButton.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" mode="filled" size="medium">
                    {callForSubmissions.firstButton.text}
                  </Button>
                </Link>
              )}
            </div>

            {/* Eligibility and Rules */}
            {callForSubmissions.eligibilityAndRules && (
              <div className="py-8 flex flex-col gap-4">
                <h2 className="text-primary-base text-title-h5">
                  Eligibility and Rules
                </h2>
                <RichText
                  className="text-text-sub-600 text-paragraph-md max-w-none [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3 [&_li]:flex [&_li]:items-start [&_li]:text-paragraph-md"
                  data={callForSubmissions.eligibilityAndRules}
                  enableGutter={false}
                  enableProse={false}
                />
              </div>
            )}

            {/* Scientific Committee */}
            {callForSubmissions.scientificCommittee && renderMarkdownList(callForSubmissions.scientificCommittee).length > 0 && (
              <div className="p-8 flex w-full bg-[#F3F8FF] flex-col gap-4">
                <h2 className="text-primary-base text-title-h5">
                  Scientific Committee
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {renderMarkdownList(callForSubmissions.scientificCommittee).map((item, index) => (
                    <div key={index} className="flex items-start text-paragraph-md">
                      <span className="text-primary-base pr-2">•</span>
                      <span className="text-text-sub-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Second Button - Download Call for Submissions */}
            {callForSubmissions.secondButton?.text && callForSubmissions.secondButton?.link && (
              <div className="pt-8 flex justify-center">
                <Link href={callForSubmissions.secondButton.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" mode="filled" size="medium">
                    {callForSubmissions.secondButton.text}
                  </Button>
                </Link>
              </div>
            )}
          </section>
        </main>
      )}

      {/* Who is Giorgio Mortara Section - Static */}
      <section id="giorgio-mortara" className="bg-blue-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          <div className="text-center flex flex-col gap-4 items-center">
            <h3 className="text-primary-base text-title-h3">
              Who is Giorgio Mortara?
            </h3>
            <div className="w-20 h-1 bg-primary-base"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Portrait */}
            <div className="flex-shrink-0 w-full lg:w-auto mx-auto lg:mx-0">
              <Image
                src="/images/GiorgioMortara2.jpeg"
                alt="Giorgio Mortara portrait"
                width={640}
                height={640}
                className="w-[350px] h-[350px] object-contain object-top mobile:w-full mobile:h-auto"
              />
            </div>

            {/* Biography */}
            <div className="flex justify-start flex-col gap-4 lg:self-center">
              <div className="flex flex-col gap-3">
                <p className="text-text-sub-600 text-paragraph-md">
                  Giorgio Mortara (Mantua, 1885 - Rio de Janeiro, 1967) was an Italian-Brazilian economist and demographer. During 1924-38, he taught at Bocconi University in Milan.
                </p>
                <p className="text-text-sub-600 text-paragraph-md">
                  In 1939, he emigrated to Rio de Janeiro to escape the fascist Racial Laws. Hired by the newly founded IBGE (Brazilian Institute for Geography and Statistics), he worked as technical advisor on the 1940 Brazilian National Census.
                </p>
                <p className="text-text-sub-600 text-paragraph-md">
                  He started the IBGE&apos;s Laboratory of Statistics and is regarded as the founder of modern demographic analysis in Brazil. Except for a four-year stint at the Sapienza University of Rome (1956-60), he lived in Rio until the end of his life.
                </p>
              </div>
              <Link href="https://www.bancaditalia.it/pubblicazioni/collezioni-biblioteca-baffi/2019-3-scritti-baffi/bibliografia/400-499/459.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" mode="lighter" size="medium">
                  Know more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Official Launch of the Prize Section - Dynamic */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Text on the left */}
            <div className="flex flex-col gap-8">
              <h2 className="text-primary-base text-title-h3">
                {officialLaunch?.title || 'Official Launch of the Prize'}
              </h2>
              {officialLaunch?.text ? (
                officialLaunch.text.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-text-sub-600 text-paragraph-md">
                    {paragraph}
                  </p>
                ))
              ) : (
                <>
                  <p className="text-text-sub-600 text-paragraph-md">
                    The Giorgio Mortara prize was officially launched during the 1st AIBE Workshop, held on 4 July 2025 at the EAESP-FGV in Sao Paulo.
                  </p>
                  <p className="text-text-sub-600 text-paragraph-md">
                    The launch ceremony was opened by Luca J. Uberti, who highlighted Mortara&apos;s significance for our Association, and closed by Fábio Mortara, Giorgio&apos;s grandson, who presented a personal and professionional biography of the Italian-Brazilian economist.
                  </p>
                </>
              )}
            </div>

            {/* Image on the right */}
            <div className="flex md:justify-end">
              <div className="relative w-[400px] h-[400px]">
                {resolvedOfficialLaunchImage ? (
                  <Image
                    src={resolvedOfficialLaunchImage.url}
                    alt={resolvedOfficialLaunchImage.alt}
                    fill
                    className="object-cover object-[25%_40%] shadow-sm"
                  />
                ) : (
                  <Image
                    src="/images/WORKSHOP%20FOTO%209.jpeg"
                    alt="Official Launch of the Prize"
                    fill
                    className="object-cover object-[25%_40%] shadow-sm"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Winners Section - Dynamic from Payload */}
      {winners.length > 0 && (
        <section className="mb-32 bg-gradient-to-b from-blue-50/30 to-white py-20 w-full">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-text-strong-950 mb-3 text-title-h3">
                Past Winners
              </h2>
              <div className="w-20 h-1 bg-primary-base mx-auto"></div>
            </div>

            <div className="space-y-6">
              {winners.map((winner) => {
                // Get resolved authors
                const resolvedAuthors = winner.authors
                  ?.map((authorEntry) => {
                    if (authorEntry.user && typeof authorEntry.user === 'object') {
                      return authorEntry.user as User;
                    }
                    return null;
                  })
                  .filter((author): author is User => author !== null) || [];

                return (
                  <div
                    key={winner.id}
                    className="bg-white border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                      <div className="flex-1">
                        <div className="inline-block mb-4">
                          <span className="bg-primary-base text-white px-4 py-1.5 rounded-full text-label-sm font-semibold">
                            {winner.year}
                          </span>
                        </div>

                        <h3 className="text-text-strong-950 mb-3 text-title-h4 font-bold">
                          {winner.title}
                        </h3>

                        <div className="mb-4 pb-4">
                          <p className="text-text-sub-600 text-paragraph-lg leading-relaxed">
                            {resolvedAuthors.map((author, authorIndex) => (
                              <span key={author.id}>
                                {authorIndex > 0 && <span className="text-text-sub-600"> & </span>}
                                <span className="font-medium text-text-strong-950">
                                  {formatAuthorName(author)}
                                </span>
                                <span className="text-text-sub-600"> ({author.universityCompany})</span>
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>

                      <div className="md:flex-shrink-0 w-full md:w-auto">
                        <Button
                          variant="primary"
                          mode="stroke"
                          size="medium"
                          className="h-hug w-full md:w-fit"
                          asChild
                        >
                          <Link href={winner.link} target="_blank" rel="noopener noreferrer">
                            Open Paper
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
