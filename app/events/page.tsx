"use client";

import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/cta";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Spacer */}
      <div className="h-16"></div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        {/* Past Congresses Section */}
        <section className="mb-16">
          {/* Small label */}
          <p className="text-text-soft-400 font-medium tracking-wider uppercase text-center mb-4 text-subheading-xs">
            WORKSHOPS and CONGRESSES
          </p>

          {/* Main Title */}
          <h1 className="text-text-strong-950 text-center mb-10 max-w-2xl mx-auto text-title-h2 px-4">
            All Events
          </h1>

          {/* Congress Images */}
          <div className="flex flex-col md:flex-row gap-8 mb-10 -ml-4 md:-ml-8 px-4">
            {/* AIBE Workshop 2025 */}
            <Link href="/workshop" className="w-80 group cursor-pointer">
              <div className="aspect-[4/3] relative mb-4 overflow-hidden">
                <Image
                  src="/images/imagefgv.png"
                  alt="AIBE Workshop 2025 at FGV"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-text-strong-950 text-title-h6 text-center group-hover:text-primary-base transition-colors">
                AIBE Workshop 2025
              </h3>
            </Link>

            {/* AIBE Workshop 2024 */}
            <Link href="/events/workshop2024" className="w-80 group cursor-pointer">
              <div className="aspect-[4/3] relative mb-4 overflow-hidden">
                <Image
                  src="/images/workshops.jpg"
                  alt="AIBE Workshop 2024"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-text-strong-950 text-title-h6 text-center group-hover:text-primary-base transition-colors">
                AIBE Workshop 2024
              </h3>
            </Link>
          </div>
        </section>
      </main>

      {/* CTA Section */}
      <div className="mt-[260px] mobile:mt-[180px]">
        <CTA />
      </div>
    </div>
  );
}
