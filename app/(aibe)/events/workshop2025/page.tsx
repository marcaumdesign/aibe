"use client";

import Image from "next/image";
import Link from "next/link";
import { Root as Button } from "@/components/ui/button";

export default function AIBEWorkshop2024Page() {

  return (
    <div className="min-h-screen bg-white">
      {/* Header Spacer */}
      <div className="h-20"></div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Workshop Overview Section */}
        <section className="mb-16">
          {/* Small label */}
          <p className="text-text-soft-400 font-medium tracking-wider uppercase mb-4 text-subheading-xs text-center">
            WORKSHOPS
          </p>

          {/* Main Title */}
          <h1 className="text-text-strong-950 mb-14 text-title-h1 text-center">
            AIBE Workshop 2025
          </h1>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Event Title */}
              <h2 className="text-text-strong-950 mb-6 text-title-h2">
                Digital Payments & Financial Inclusion
              </h2>

              {/* Date & Location */}
              <div className="mb-3">
                <p className="text-text-strong-950 mb-2 text-paragraph-lg">
                  <strong>3-4 July 2025</strong>
                </p>
                <p className="text-text-sub-600 text-paragraph-md">
                  São Paulo School of Business Administration (EAESP-FGV)
                </p>
              </div>

              {/* Keynote Speaker */}
              <div className="mb-8">
                <p className="text-text-sub-600 text-paragraph-md">Keynote by</p>
                <div className="mt-3 md:mt-6 md:grid md:grid-cols-[auto,1fr] md:items-start md:gap-8">
                  {/* Foto à esquerda */}
                  <div className="flex justify-center md:justify-start">
                    <Image
                      src="/images/Bicola%20Borri.jpg?v=1"
                      alt="Participantes em reunião"
                      width={135}
                      height={180}
                      className="w-[135px] h-[180px] aspect-[3/4] object-cover object-right rounded-md shadow-sm mx-auto"
                    />
                  </div>
                  {/* Texto à direita */}
                  <div className="mt-4 md:mt-0">
                    <h3 className="text-6xl md:text-10xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
                      <Link
                        href="https://sites.google.com/site/nicolaborri/Nicola-Borri?authuser=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        aria-label="Nicola Borri (abrir site)"
                      >
                        Nicola Borri
                      </Link>
                    </h3>
                    <p className="mt-4 text-text-sub-600 text-paragraph-md">
                      Lian Group Chair in Fintech and Blockchain Technology & Associate Professor of Finance
                    </p>
                    <Link
                      href="https://www.luiss.it/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-teal-700 underline"
                    >
                      LUISS Guido Carli
                    </Link>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <Button variant="primary" mode="filled" size="medium">
                Download the Final Programme
              </Button>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center lg:justify-end lg:col-span-3 pl-8">
              <div className="relative w-full h-[420px] md:h-[520px] lg:h-[620px]">
                <Image
                  src="/images/imagefgv.png"
                  alt="FGV Building"
                  width={1600}
                  height={1000}
                  className="w-full h-full object-cover rounded-none shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Workshop Details Section */}
        <section className="mb-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-text-sub-600 leading-relaxed mb-6 text-paragraph-md">
              The 2025 AIBE Workshop will be held at EAESP-FGV in São Paulo on 3-4 July. The event is jointly organized by EAESP-FGV and the University of Milano-Bicocca, and is hosted by the Center for Microfinance and Financial Inclusion Studies (FGVcemif).
              This year&apos;s Workshop aims to present cutting-edge research on all aspects of digital finance and financial inclusion. We invite submissions from any area of economics, with any geographic focus. A non-exclusive list of topics is provided below. We expect to put together some 6 contributed sessions with around 12 papers, each of which will be assigned a discussant. The workshop will also feature a keynote session (Nicola Borri) and a policy roundtable. Confirmed speakers on the policy roundtable include: Daniela Russo (European Central Bank), Paulo Picchetti (Banco Central do Brasil), e Massimo Cirasino (Payment Systems Academy, Italy).
            </p>
          </div>
        </section>

        {/* Scientific Committee & Topics Section */}
        <section className="mb-16">
          <div className="bg-blue-50 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Scientific Committee */}
              <div>
                <h3 className="text-text-strong-950 mb-6 text-title-h5">
                  Scientific Committees
                </h3>
                <ul className="space-y-1 text-text-sub-600">
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Rafael Schiozer, EAESP-FGV (São Paulo)</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Nicola Borri, LUISS Guido Carli (Roma)</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Tito Cordella, SAIS Europe (Bolonha)</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Alan de Gennaro, EAESP-FGV (São Paulo)</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Andrea Ugolini, Università di Milano-Bicocca (Milão)</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Lauro Gonzalez, FGVcemif (São Paulo)</span>
                  </li>
                </ul>
              </div>

              {/* Right Column - Topics */}
              <div>
                <h3 className="text-text-strong-950 mb-6 text-title-h5">
                  Topics
                </h3>
                <ul className="space-y-1 text-text-sub-600">
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Digital payment systems & mobile money</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Fintech & neo-banks</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Financial inclusion & financial literacy as tools of financial stability</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Digital loans, digital insurance & household finance</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Digital money, corruption & financial fraud</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Crypto currencies in emerging markets</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Central Bank Digital Currencies (CBDC)</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Other finance & development topics with relevance to the conference theme</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-text-soft-400 font-medium tracking-wider uppercase mb-2 text-subheading-xs">
                Past Congresses
              </p>
              <h2 className="text-text-strong-950 text-title-h2">
                Gallery
              </h2>
            </div>
            <Link href="/events/gallery">
              <Button variant="primary" mode="filled" size="medium">
                View All
              </Button>
            </Link>
          </div>

          {/* Gallery Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Image
                src="/images/WORKSHOP%20FOTO%2010.jpeg"
                alt="AIBE Workshop photo 10"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="relative">
              <Image
                src="/images/WORKSHOP%20FOTO%2011.jpeg"
                alt="AIBE Workshop photo 11"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="relative">
              <Image
                src="/images/WORKSHOP%20FOTO%204.jpeg"
                alt="AIBE Workshop photo 4"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Studying Section */}
        <section className="mt-20 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Texto à esquerda */}
            <div>
              <p className="text-text-soft-400 font-medium tracking-wider uppercase mb-2 text-subheading-xs">
                Studying
              </p>
              <h2 className="text-text-strong-950 text-title-h2 mb-4">
                Studying Economics in Italy
              </h2>
              <p className="text-text-sub-600 leading-relaxed text-paragraph-md">
                The Workshop also hosted a special panel on Studying Economics in Italy, co-organized with the Italian Cultural Institute in Sao Paulo (IIC-SP). Five participants presented the Master&apos;s progammes in economics, management and finance offered by their universities. This year, featured universities included: LUISS Guido Carli (Rome), SAIS Bologna, University of Milano-Bicocca, and Politecnico di Milano. The event was promoted by the IIC and welcomed an audience of around 30 undergraduate students from several Sao Paulo universities. The objective of this session, which AIBE plans to alternate with a similar event on &quot;Studying Economics in Brazil&quot;, is to showcase Italy&apos;s and Brazil&apos;s academic excellence in teaching, promote student exchange, and facilitate brain circulation between the two countries.
              </p>
            </div>

            {/* Imagem à direita (pequena) */}
            <div className="flex md:justify-end">
              <div className="relative w-full max-w-[720px] h-[420px] md:max-w-[820px] md:h-[500px] lg:max-w-[960px] lg:h-[560px]">
                <Image
                  src="/images/studying.jpeg"
                  alt="Panel - Studying Economics in Italy"
                  width={960}
                  height={560}
                  className="w-full h-full object-cover shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="mt-64 mb-80 mobile:mb-48">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-text-strong-950 mb-8 text-title-h3 text-center">
              Sponsors
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
              {/* Bicocca */}
              <div className="flex items-center justify-center h-32 w-full">
                <Image
                  src="/images/Patricionador Bicocca.png"
                  alt="Università degli Studi di Milano-Bicocca"
                  width={200}
                  height={120}
                  className="max-h-32 w-auto object-contain"
                />
              </div>

              {/* Banca D'Italia */}
              <div className="flex items-center justify-center h-32 w-full">
                <Image
                  src="/images/Patrocionador Banca D'Italia.png"
                  alt="Banca D'Italia"
                  width={200}
                  height={120}
                  className="max-h-32 w-auto object-contain"
                />
              </div>

              {/* FGC */}
              <div className="flex items-center justify-center h-32 w-full">
                <Image
                  src="/images/Patrocionador FGC.jpeg"
                  alt="FGC"
                  width={200}
                  height={120}
                  className="max-h-32 w-auto object-contain"
                />
              </div>

              {/* FGV */}
              <div className="flex items-center justify-center h-32 w-full">
                <Image
                  src="/images/Patrocionador FGV.png"
                  alt="FGV"
                  width={200}
                  height={120}
                  className="max-h-32 w-auto object-contain"
                />
              </div>

              {/* San Paolo */}
              <div className="flex items-center justify-center h-32 w-full">
                <Image
                  src="/images/Patrocionador San Paolo.png"
                  alt="San Paolo"
                  width={200}
                  height={120}
                  className="max-h-32 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
