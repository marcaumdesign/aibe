"use client";

import Image from "next/image";
import { useState } from "react";
import { RiAddLine } from '@remixicon/react';
import { Root as Button } from "@/components/ui/button";

// Componente Accordion para FAQ
function AccordionItem({
  question,
  answer,
  isOpen,
  onClick
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 text-left flex items-center gap-4 focus:outline-none"
        onClick={onClick}
      >
        <RiAddLine
          className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''
            }`}
        />
        <span className="text-text-strong-950 text-title-h6">{question}</span>
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function AIBEWorkshopPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const faqData = [
    {
      question: "When and where will the Workshop take place?",
      answer: "The AIBE Workshop 2025 will be held on 3-4 July 2025 at the São Paulo School of Business Administration (EAESP-FGV), São Paulo, Brazil."
    },
    {
      question: "Is there a registration fee?",
      answer: "No, there is no registration fee. AIBE covers travel and accommodation for selected participants."
    },
    {
      question: "Who can apply?",
      answer: "We welcome paper submissions from researchers at any career stage. The workshop is particularly targeted at Italians and foreigners at Italian institutions, Brazilians and foreigners at Brazilian institutions, Italians and Brazilians at foreign institutions, and others interested in interacting with these communities."
    },
    {
      question: "What is the main theme of the 2025 Workshop?",
      answer: "The main theme is \"Digital Payments & Financial Inclusion\", focusing on cutting-edge research in digital finance, fintech, and financial inclusion."
    },
    {
      question: "Who is the keynote speaker?",
      answer: "The keynote speaker is Nicola Borri, Lian Group Chair in Fintech and Blockchain Technology & Associate Professor of Finance at Luiss University."
    },
    {
      question: "How can I apply to present a paper?",
      answer: "You can apply by submitting a paper through our submission system. You need to provide proof of AIBE membership, which can be obtained through our membership page. Membership is valid for 1 year and costs 2 euros."
    }
  ];

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
            AIBE Workshop 2025
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
                  <strong>3-4 July 2025</strong>
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
                  src="/images/imagefgv.png"
                  alt="FGV Building"
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

            <h3 className="text-text-strong-950 mb-4 text-title-h5">
              Funding
            </h3>
            <p className="text-text-sub-600 leading-relaxed mb-4 text-paragraph-md">
              There is no registration fee. AIBE covers travel and accommodation for selected participants
              (to be indicated in your application). A conference dinner will be held on July 3, 2025.
            </p>
            <p className="text-text-sub-600 leading-relaxed mb-6 text-paragraph-md">
              We acknowledge financial support from Banca d&apos;Italia, FAPESP, University of Milano-Bicocca,
              FGV-EAESP, Fundo Garantidor de Créditos (FGC), and Istituto Italiano di Cultura - San Paolo.
            </p>

            <h3 className="text-text-strong-950 mb-4 text-title-h5">
              To Apply
            </h3>
            <p className="text-text-sub-600 leading-relaxed mb-4 text-paragraph-md">
              We welcome paper submissions from researchers at any career stage, including specifically, but not exclusively: Italians and foreigners based at Italian research institutions; Brazilians and foreigners based at Brazilian research institutions; Italians and Brazilians based at foreign institutions. Other researchers with an interest in interacting with the Brazilian and Italian research communities are also welcome to apply.
            </p>
            <p className="text-text-sub-600 leading-relaxed mb-6 text-paragraph-md">
              To submit a paper, applicants should provide proof of AIBE membership. Annual membership can be obtained here. It is valid for 1 year and starts at 2 euros.
              <a href="/membership" className="text-primary-base hover:underline">
              </a>

            </p>

            <div className="text-center">
              <Button variant="primary" mode="filled" size="medium">
                Submit a Paper
              </Button>
            </div>
          </div>
        </section>

        {/* Scientific Committee & Topics Section */}
        <section className="mb-16">
          <div className="bg-blue-50 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Scientific Committee */}
              <div>
                <h3 className="text-text-strong-950 mb-6 text-title-h5">
                  Scientific Committee
                </h3>
                <ul className="space-y-1 text-text-sub-600">
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Rafael Schiozer, EAESP-FGV (São Paulo)</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Nicola Borri, LUISS Guido Carli (Rome)</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Tito Cordella, SAIS Europe (Bologna)</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Alan de Gennaro, EAESP-FGV (São Paulo)</span>
                  </li>
                  <li className="flex items-start text-paragraph-md">
                    <span className="text-primary-base mr-2">•</span>
                    <span>Andrea Ugolini, Università di Milano-Bicocca (Milan)</span>
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
                    <span>Other finance & development topics with relevance to the conference theme</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Title */}
            <div className="space-y-4">
              <h2 className="text-text-strong-950 text-title-h2 max-w-[400px]">
                Frequently Asked Questions
              </h2>
            </div>

            {/* Right Column - FAQ Items */}
            <div className="space-y-0">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onClick={() => toggleFaq(index)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
