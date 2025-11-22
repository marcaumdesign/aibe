"use client";

import Image from "next/image";
// import CTA from "@/components/cta";
import { Root as Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from '@/components/ui/badge';

interface Winner {
  year: number;
  title: string;
  authors: {
    name: string;
    institution: string;
    country: string;
  }[];
  link: string;
}

const winnersData: Winner[] = [
  {
    year: 2024,
    title: "Digital Financial Inclusion and Economic Development in Emerging Markets",
    authors: [
      { name: "Marco Rossi", institution: "Università Bocconi", country: "Italy" },
      { name: "Ana Silva", institution: "FGV-EAESP", country: "Brazil" }
    ],
    link: "https://example.com/paper2024"
  },
  {
    year: 2023,
    title: "Cross-Border Trade Flows Between Italy and Brazil: A Comparative Analysis",
    authors: [
      { name: "Giovanni Bianchi", institution: "University of Milano-Bicocca", country: "Italy" },
      { name: "Carlos Oliveira", institution: "USP", country: "Brazil" }
    ],
    link: "https://example.com/paper2023"
  },
  {
    year: 2022,
    title: "Monetary Policy Transmission in Dual Banking Systems",
    authors: [
      { name: "Francesco Romano", institution: "LUISS Guido Carli", country: "Italy" },
      { name: "Paula Santos", institution: "PUC-Rio", country: "Brazil" }
    ],
    link: "https://example.com/paper2022"
  },
  {
    year: 2021,
    title: "Labor Market Dynamics and Migration Patterns: Italy-Brazil Perspectives",
    authors: [
      { name: "Alessandro Ferrari", institution: "SAIS Bologna", country: "Italy" },
      { name: "Roberto Costa", institution: "FGV-Rio", country: "Brazil" }
    ],
    link: "https://example.com/paper2021"
  },
  {
    year: 2020,
    title: "Innovation Ecosystems and Economic Growth: A Comparative Study",
    authors: [
      { name: "Luca Verdi", institution: "Politecnico di Milano", country: "Italy" },
      { name: "Fernanda Alves", institution: "Unicamp", country: "Brazil" }
    ],
    link: "https://example.com/paper2020"
  }
];

export default function EventsPage() {
  // Ordenar ganhadores do mais recente para o mais antigo
  const sortedWinners = [...winnersData].sort((a, b) => b.year - a.year);

  return (
    <div className="min-h-screen bg-white">
      <div className='relative mt-4 w-full h-[150px]'>
        <Image
          src='/images/heroimage.png'
          alt='Hero'
          fill
          className='object-cover'
        />
      </div>
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 pt-16 pb-8 mobile:pt-8 mobile:pb-4">
        {/* Prizes Section */}
        <section className="max-w-[1200px] mx-auto w-full pb-16">
          <div className="flex flex-col gap-4 items-center justify-center">
            {/* Small label */}
            <Badge variant='with-dot' size='medium'>
              PRIZES
            </Badge>


            <div className="flex gap-8">
              {/* <div
                className=' z-10 block mobile:hidden'
                style={{
                  right: '300px',
                  top: '235px'
                }}
              >
                <div className='relative w-16 h-16'>
                  <div className='absolute inset-0 rounded-full overflow-hidden z-[100]'>
                    <Image
                      src='/images/italy-flag.png'
                      alt='Italy Flag'
                      fill
                      className='object-cover'
                    />
                  </div>

                  <div className='absolute inset-0 rounded-full bg-blue-100 scale-125 animate-pulse-custom z-40'></div>

                  <div className='absolute inset-0 rounded-full bg-blue-50 scale-150 animate-pulse-custom-slow z-30'></div>
                </div>
              </div> */}
              <h2 className="text-primary-base text-title-h2 text-center max-w-2xl mx-auto">
                Giorgio Mortara Prize


              </h2>


              {/* <div
                className=' z-10 block mobile:hidden'
                style={{
                  left: '300px',
                  top: ' 235px'
                }}
              >
                <div className='relative w-16 h-16'>
                  <div className='absolute inset-0 rounded-full overflow-hidden z-[100]'>
                    <Image
                      src='/images/brazil-flag.png'
                      alt='Brazil Flag'
                      fill
                      className='object-cover'
                    />
                  </div>

                  <div className='absolute inset-0 rounded-full bg-blue-100 scale-125 animate-pulse-custom z-40'></div>

                  <div className='absolute inset-0 rounded-full bg-blue-50 scale-150 animate-pulse-custom-slow z-30'></div>
                </div>
              </div> */}
            </div>
            {/* Main Title */}


            {/* Subtitle */}
            <p className="text-text-sub-600 text-center max-w-3xl text-paragraph-lg pb-4">
              For the best paper in economics co-authored by an Italian-Brazilian research team.
            </p>
          </div>

          {/* Prize Description */}
          <div className="prose prose-lg max-w-none py-8 flex flex-col gap-4">
            <h4 className="text-primary-base text-title-h4 w-full text-center">
              Call for Submissions
            </h4>
            <p className="text-text-sub-600 text-paragraph-md">
              The Italian-Brazilian Economics Association is awarding a prize worth 1,000 euros for the best paper in economics co-authored by an Italian-Brazilian research team.
            </p>
            <p className="text-text-sub-600 text-paragraph-md">
              The Scientific Committee of the prize is soliciting working papers from any area of economics and on any topic.
            </p>
            <p className="text-text-sub-600 text-paragraph-md">
              The winning article will be announced in early 2026. One member of the research team will be invited to attend the 2026 AIBE Workshop, which will take place in Italy, in order to present the paper.
            </p>
          </div>

          {/* To Apply Section */}
          <div className="py-8 flex flex-col gap-4">
            <h2 className="text-primary-base text-title-h5">
              To apply
            </h2>
            <p className="text-text-sub-600 text-paragraph-md">
              Submit a copy of your manuscript, together with contact details, names and affiliations of all co-authors, and proofs of AIBE membership. Annual membership can be obtained <Link href="/membership" className="text-primary-base hover:underline">here</Link>. It is valid for 1 year and starts at 2 euros.
            </p>
          </div>

          <div className="py-6 flex flex-col gap-6 items-center">
            <p className="text-error-base text-center text-paragraph-md">
              <strong>The deadline for submission is 15 January 2026 (midnight, Italy)</strong>
            </p>

            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdm48mF3Jtn0Hx_EeEa2QGn_WClyDK7KZyUApz9A-wVEBIPfg/viewform?usp=sharing&ouid=105093767266996443933" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" mode="filled" size="medium">
                Submit Paper
              </Button>
            </Link>
          </div>

          {/* Eligibility and Rules */}
          <div className="py-8 flex flex-col gap-4">
            <h2 className="text-primary-base text-title-h5">
              Eligibility and Rules
            </h2>
            <ul className="flex flex-col gap-3 text-text-sub-600">
              <li className="flex items-start text-paragraph-md">
                <span className="text-primary-base pr-2">•</span>
                <span>Authors may be of any nationality. Yet, at least one co-author should be based at an Italian academic or research institution, AND at least one co-author should be based at a Brazilian academic or research institution.</span>
              </li>
              <li className="flex items-start text-paragraph-md">
                <span className="text-primary-base pr-2">•</span>
                <span>Submissions should be in English and must be working papers not yet accepted for publication at the time of submission. However, they may be under review.</span>
              </li>
              <li className="flex items-start text-paragraph-md">
                <span className="text-primary-base pr-2">•</span>
                <span>The Scientific Committee will consider contributions from any area of economics and on any topic, even if unrelated to Italy, Brazil or to the topic of the 2026 AIBE Workshop (yet to be announced).</span>
              </li>
              <li className="flex items-start text-paragraph-md">
                <span className="text-primary-base pr-2">•</span>
                <span>At least one co-author should be a member of AIBE.</span>
              </li>
              <li className="flex items-start text-paragraph-md">
                <span className="text-primary-base pr-2">•</span>
                <span>The winning paper will be selected based on academic criteria of originality, rigour, clarity and contribution to scholarship.</span>
              </li>
            </ul>
          </div>

          {/* Scientific Committee */}
          <div className="p-8 flex w-full bg-[#F3F8FF] flex-col gap-4">
            <h2 className="text-primary-base text-title-h5">
              Scientific Committee
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start text-paragraph-md">
                <span className="text-primary-base pr-2">•</span>
                <span className="text-text-sub-600">Fernando L. Aiube, UERJ (Rio de Janeiro)</span>
              </div>
              <div className="flex items-start text-paragraph-md">
                <span className="text-primary-base pr-2">•</span>
                <span className="text-text-sub-600">Raphael B. Corbi, USP (Sao Paulo)</span>
              </div>
              <div className="flex items-start text-paragraph-md">
                <span className="text-primary-base pr-2">•</span>
                <span className="text-text-sub-600">Tito Cordella, SAIS Europe (Bologna)</span>
              </div>
              <div className="flex items-start text-paragraph-md">
                <span className="text-primary-base pr-2">•</span>
                <span className="text-text-sub-600">Chiara Falco, University of Milan (Milan) & USP (Sao Paulo)</span>
              </div>
              <div className="flex items-start text-paragraph-md">
                <span className="text-primary-base pr-2">•</span>
                <span className="text-text-sub-600">Alan de Gennaro, EAESP-FGV (Sao Paulo)</span>
              </div>
              <div className="flex items-start text-paragraph-md">
                <span className="text-primary-base pr-2">•</span>
                <span className="text-text-sub-600">Rafael F. Schiozer, EAESP-FGV (Sao Paulo)</span>
              </div>
              <div className="flex items-start text-paragraph-md">
                <span className="text-primary-base pr-2">•</span>
                <span className="text-text-sub-600">Luca J. Uberti, University of Milano-Bicocca (Milan)</span>
              </div>
              <div className="flex items-start text-paragraph-md">
                <span className="text-primary-base pr-2">•</span>
                <span className="text-text-sub-600">Andrea Ugolini, University of Milano-Bicocca (Milan)</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-8 flex justify-center">
            <Link href="https://drive.google.com/file/d/1z41fsmEGp1WHKawgTBQbrcZi1Zw760F5/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" mode="filled" size="medium">
                Download Call for Submissions
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Who is Giorgio Mortara Section */}
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

      {/* Official Launch of the Prize Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Texto à esquerda */}
            <div className="flex flex-col gap-8">
              <h2 className="text-primary-base text-title-h2">
                Official Launch of the Prize
              </h2>
              <p className="text-text-sub-600 text-paragraph-md">
                The Giorgio Mortara prize was officially launched during the 1st AIBE Workshop, held on 4 July 2025 at the EAESP-FGV in Sao Paulo.
              </p>
              <p className="text-text-sub-600 text-paragraph-md">
                The launch ceremony was opened by Luca J. Uberti, who highlighted Mortara&apos;s significance for our Association, and closed by Fábio Mortara, Giorgio&apos;s grandson, who presented a personal and professionional biography of the Italian-Brazilian economist.
              </p>
            </div>

            {/* Imagem à direita (pequena) */}
            <div className="flex md:justify-end">
              <div className="relative w-[400px] h-[400px]">
                <Image
                  src="/images/WORKSHOP%20FOTO%209.jpeg"
                  alt="Official Launch of the Prize"
                  fill
                  className="object-cover object-[25%_40%] shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Winners Section 
      <section className="mb-32 bg-gradient-to-b from-blue-50/30 to-white py-20 w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-text-strong-950 mb-3 text-title-h3">
              Past Winners
            </h2>
            <div className="w-20 h-1 bg-primary-base mx-auto rounded-full"></div>
          </div>

          
        <div className="space-y-6">
            {sortedWinners.map((winner) => (
              <div
                key={winner.year}
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

          <div className="mb-4 pb-4 ">
            <p className="text-text-sub-600 text-paragraph-lg leading-relaxed">
              {winner.authors.map((author, authorIndex) => (
                <span key={authorIndex}>
                  {authorIndex > 0 && <span className="text-text-sub-600"> & </span>}
                  <span className="font-medium text-text-strong-950">{author.name}</span>
                  <span className="text-text-sub-600"> ({author.institution}, {author.country})</span>
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
              </div >
            ))
}
          </div >
        </div >
      </section >*/}


    </div >
  );
}
