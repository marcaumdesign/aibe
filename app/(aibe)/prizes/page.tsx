"use client";

import Image from "next/image";
import CTA from "@/components/cta";
import { Root as Button } from "@/components/ui/button";
import Link from "next/link";

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
      {/* Header Spacer */}
      <div className="h-20"></div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Prizes Section */}
        <section className="mb-16">
          {/* Small label */}
          <p className="text-text-soft-400 font-medium tracking-wider uppercase text-center mb-4 text-subheading-xs" >
            PRIZES
          </p>

          {/* Main Title */}
          <h1 className="text-text-strong-950 text-center mb-4 max-w-2xl mx-auto text-title-h2">
            1st Giorgio Mortara Prize
          </h1>

          {/* Subtitle */}
          <p className="text-text-sub-600 text-center mb-5 max-w-3xl text-paragraph-lg">
            For the best paper in economics co-authored by an Italian-Brazilian research team.
          </p>

          {/* Main Image */}
          <div className="mb-8">
            <Image
              src="/images/Reunionimage.png"
              alt="AIBE Workshop presentation"
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>

          {/* Prize Description */}
          <div className="prose prose-lg max-w-none mb-2">
            <p className="text-text-sub-600 leading-relaxed mb-4 text-paragraph-md">
              The Italian-Brazilian Economics Association is awarding a prize worth 1,000 euros for the best paper in economics co-authored by an Italian-Brazilian research team.
            </p>
            <p className="text-text-sub-600 leading-relaxed mb-4 text-paragraph-md">
              The Scientific Committee of the prize is soliciting working papers from any area of economics and on any topic.
            </p>
            <p className="text-text-sub-600 leading-relaxed mb-6 text-paragraph-md">
              The winning article will be announced in early 2026. One member of the research team will be invited to attend the 2026 AIBE Workshop, which will take place in Italy, in order to present the paper.
            </p>
          </div>

          {/* To Apply Section */}
          <div className="mb-16">
            <h2 className="text-text-strong-950 mb-4 text-title-h5">
              To apply
            </h2>
            <p className="text-text-sub-600 leading-relaxed mb-4 text-paragraph-md">
              Submit a copy of your manuscript, together with contact details, names and affiliations of all co-authors, and proofs of AIBE membership. Annual membership can be obtained <Link href="/membership" className="text-blue-600 hover:underline">here</Link>. It is valid for 1 year and starts at 2 euros.
            </p>
            <p className="text-text-sub-600 leading-relaxed mb-6 text-paragraph-md">
              <strong>The deadline for submission is 15 January 2026 (midnight, Italy)</strong>
            </p>
          </div>

          {/* Eligibility and Rules */}
          <div className="mb-12">
            <h2 className="text-text-strong-950 mb-4 text-title-h5">
              Eligibility and Rules
            </h2>
            <ul className="space-y-3 text-text-sub-600 leading-relaxed">
              <li className="flex items-start text-paragraph-md">
                <span className="text-black-600 mr-2">•</span>
                <span>Authors may be of any nationality. Yet, at least one co-author should be based at an Italian academic or research institution, AND at least one co-author should be based at a Brazilian academic or research institution.</span>
              </li>
              <li className="flex items-start text-paragraph-md">
                <span className="text-black-600 mr-2">•</span>
                <span>Submissions should be in English and must be working papers not yet accepted for publication at the time of submission. However, they may be under review.</span>
              </li>
              <li className="flex items-start text-paragraph-md">
                <span className="text-black-600 mr-2">•</span>
                <span>The Scientific Committee will consider contributions from any area of economics and on any topic, even if unrelated to Italy, Brazil or to the topic of the 2026 AIBE Workshop (yet to be announced).</span>
              </li>
              <li className="flex items-start text-paragraph-md">
                <span className="text-black-600 mr-2">•</span>
                <span>At least one co-author should be a member of AIBE.</span>
              </li>
              <li className="flex items-start text-paragraph-md">
                <span className="text-black-600 mr-2">•</span>
                <span>The winning paper will be selected based on academic criteria of originality, rigour, clarity and contribution to scholarship.</span>
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button variant="primary" mode="filled" size="medium">
              Submit Paper
            </Button>
          </div>
        </section>
      </main>

      {/* Who is Giorgio Mortara Section */}
      <section id="giorgio-mortara" className="mb-16 bg-blue-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-text-strong-950 mb-4 text-title-h3">
              Who is Giorgio Mortara?
            </h2>
            <div className="w-20 h-1 bg-primary-base mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Portrait */}
            <div className="flex-shrink-0 w-full lg:w-auto mx-auto lg:mx-0">
              <Image
                src="/images/GiorgioMortara2.jpeg"
                alt="Giorgio Mortara portrait"
                width={640}
                height={640}
                className="w-[640px] h-[640px] object-contain object-top mobile:w-full mobile:h-auto"
              />
            </div>

            {/* Biography */}
            <div className="flex-1 lg:self-center">
              <div className="space-y-3">
                <p className="text-text-sub-600 leading-relaxed text-paragraph-md">
                  Giorgio Mortara (Matua, 1885 - Rio de Janeiro, 1967) was an Italian-Brazilian economist and demographer. During 1924-38, he taught at Bocconi University in Milan.
                </p>
                <p className="text-text-sub-600 leading-relaxed text-paragraph-md">
                  In 1939, he emigrated to Rio de Janeiro to escape the fascist Racial Laws. Hired by the newly founded IBGE (Brazilian Institute for Geography and Statistics), he worked as technical advisor on the 1940 Brazilian National Census.
                </p>
                <p className="text-text-sub-600 leading-relaxed text-paragraph-md">
                  He started the IBGE&apos;s Laboratory of Statistics and is regarded as the founder of modern demographic analysis in Brazil. Except for a four-year stint at the Sapienza University of Rome (1956-60), he lived in Rio until the end of his life.
                </p>
                <p className="text-text-sub-600 leading-relaxed text-paragraph-md">
                  The prize is awarded jointly by the AIBE Board and by the Scientific Committee of the annual AIBE Workshop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Launch of the Prize Section */}
      <section className="mt-20 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Texto à esquerda */}
            <div>
              <p className="text-text-soft-400 font-medium tracking-wider uppercase mb-2 text-subheading-xs">
                Studying
              </p>
              <h2 className="text-text-strong-950 text-title-h2 mb-4">
                Official Launch of the Prize
              </h2>
              <p className="text-text-sub-600 leading-relaxed text-paragraph-md">
                The Giorgio Mortara prize was officially launched during the 1st AIBE Workshop, held on 4 July 2025 at the EAESP-FGV in Sao Paulo. The launch ceremony was opened by Luca J. Uberti, who highlighted Mortara&apos;s significance for our Association, and closed by Fábio Mortara, Giorgio&apos;s grandson, who presented a personal and professionional biography of the Italian-Brazilian economist.
              </p>
            </div>

            {/* Imagem à direita (pequena) */}
            <div className="flex md:justify-end">
              <div className="relative w-full max-w-[720px] h-[420px] md:max-w-[820px] md:h-[500px] lg:max-w-[960px] lg:h-[560px]">
                <Image
                  src="/images/WORKSHOP%20FOTO%209.jpeg"
                  alt="Official Launch of the Prize"
                  width={960}
                  height={560}
                  className="w-full h-full object-cover rounded-md shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Winners Section */}
      <section className="mb-32 bg-gradient-to-b from-blue-50/30 to-white py-20 w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-text-strong-950 mb-3 text-title-h3">
              Past Winners
            </h2>
            <div className="w-20 h-1 bg-primary-base mx-auto rounded-full"></div>
          </div>

          {/* Winners List */}
          <div className="space-y-6">
            {sortedWinners.map((winner) => (
              <div
                key={winner.year}
                className="bg-white border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="flex-1">
                    {/* Year Badge */}
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

                  {/* Link Button */}
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
            ))}
          </div>
        </div>
      </section>


    </div >
  );
}
