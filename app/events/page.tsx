"use client";

import Image from "next/image";
import { useState } from "react";
import CTA from "@/components/cta";
import { Root as Button } from "@/components/ui/button";

export default function EventsPage() {
  const [formData, setFormData] = useState({
    manuscript: null as File | null,
    contactDetails: "",
    coAuthors: "",
    affiliations: "",
    membershipProof: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

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
              Submit a copy of your manuscript, together with contact details, names and affiliations of all co-authors, and proofs of AIBE membership. Annual membership can be obtained <a href="/membership" className="text-blue-600 hover:underline">here</a>. It is valid for 1 year and starts at 2 euros.
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
      <section id="giorgio-mortara" className="mb-64 bg-blue-50 py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-text-strong-950 mb-6 text-title-h3">
            Who is Giorgio Mortara?
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Portrait */}
            <div className="flex-shrink-0">
              <Image
                src="/images/Giorgiomortara.png"
                alt="Giorgio Mortara portrait"
                width={384}
                height={384}
                className="w-96 h-96 object-cover"
              />
            </div>

            {/* Biography */}
            <div className="flex-1">
              <p className="text-text-sub-600 leading-relaxed mb-4 text-paragraph-md">
                Giorgio Mortara (Matua, 1885 - Rio de Janeiro, 1967) was an Italian-Brazilian economist and demographer. During 1924-38, he taught at Bocconi University in Milan. In 1939, he emigrated to Rio de Janeiro to escape the fascist Racial Laws. Hired by the newly founded IBGE (Brazilian Institute for Geography and Statistics), he worked as technical advisor on the 1940 Brazilian National Census. He started the IBGE's Laboratory of Statistics and is regarded as the founder of modern demographic analysis in Brazil. Except for a four-year stint at the Sapienza University of Rome (1956-60), he lived in Rio until the end of his life.
              </p>
              <p className="text-text-sub-600 leading-relaxed text-paragraph-md">
                The prize is awarded jointly by the AIBE Board and by the Scientific Committee of the annual AIBE Workshop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </div >
  );
}
