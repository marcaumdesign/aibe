"use client";

import Image from "next/image";
import { Root as Button } from "@/components/ui/button";

export default function AIBEWorkshop2024Page() {

  return (
    <div className="min-h-screen bg-white">
      {/* Header Spacer */}
      <div className="h-20"></div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Workshop Overview Section */}
        <section className="mb-16">
          {/* Small label */}
          <p className="text-text-soft-400 font-medium tracking-wider uppercase mb-4 text-subheading-xs text-center">
            WORKSHOPS
          </p>

          {/* Main Title */}
          <h1 className="text-text-strong-950 mb-14 text-title-h1 text-center">
            AIBE Workshop 2024
          </h1>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div>
              {/* Event Title */}
              <h2 className="text-text-strong-950 mb-6 text-title-h2">
                Digital Payments & Financial Inclusion
              </h2>

              {/* Date & Location */}
              <div className="mb-3">
                <p className="text-text-strong-950 mb-2 text-paragraph-lg">
                  <strong>3-4 July 2024</strong>
                </p>
                <p className="text-text-sub-600 text-paragraph-md">
                  São Paulo School of Business Administration (EAESP-FGV)
                </p>
              </div>

              {/* Keynote Speaker */}
              <div className="mb-8">
                <p className="text-text-strong-950 mb-2 text-paragraph-lg">
                  <strong>Keynote by Nicola Borri</strong>
                </p>
                <p className="text-text-sub-600 text-paragraph-md">
                  Lian Group Chair in Fintech and Blockchain Technology & Associate Professor of Finance
                </p>
              </div>

              {/* Download Button */}
              <Button variant="primary" mode="filled" size="medium">
                Download the Final Programme
              </Button>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <Image
                  src="/images/workshops.jpg"
                  alt="AIBE Workshop 2024 Audience"
                  width={400}
                  height={300}
                  className="w-full h-auto"
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
            <Button variant="primary" mode="filled" size="medium">
              View All
            </Button>
          </div>

          {/* Gallery Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Image
                src="/images/image 141.png"
                alt="Palestra no AIBE Workshop"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="relative">
              <Image
                src="/images/image 142.png"
                alt="Grupo de participantes"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="relative">
              <Image
                src="/images/image 143.png"
                alt="Mesa de discussão"
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
