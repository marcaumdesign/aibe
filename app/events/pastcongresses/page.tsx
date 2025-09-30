"use client";

import Image from "next/image";
import CTA from "@/components/cta";

export default function PastCongressesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Spacer */}
      <div className="h-20"></div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Past Congresses Section */}
        <section className="mb-16">
          {/* Small label */}
          <p className="text-text-soft-400 font-medium tracking-wider uppercase text-center mb-4 text-subheading-xs">
            WORKSHOPS
          </p>

          {/* Main Title */}
          <h1 className="text-text-strong-950 text-center mb-10 max-w-2xl mx-auto text-title-h2">
            Past Congresses
          </h1>

          {/* Congress Images */}
          <div className="flex flex-col md:flex-row gap-8 mb-16 -ml-4 md:-ml-8">
            {/* AIBE Workshop 2025 */}
            <div className="w-80">
              <div className="aspect-[4/3] relative mb-4">
                <Image
                  src="/images/imagefgv.png"
                  alt="AIBE Workshop 2025 at FGV"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-text-strong-950 text-title-h6 text-center">
                AIBE Workshop 2025
              </h3>
            </div>

            {/* AIBE Workshop 2024 */}
            <div className="w-80">
              <div className="aspect-[4/3] relative mb-4">
                <Image
                  src="/images/workshops.jpg"
                  alt="AIBE Workshop 2024"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-text-strong-950 text-title-h6 text-center">
                AIBE Workshop 2024
              </h3>
            </div>
          </div>
        </section>
      </main>

      {/* CTA Section */}
      <CTA />
    </div>
  );
}
