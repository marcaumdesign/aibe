"use client";

import Image from "next/image";
import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import { Root as Button } from "@/components/ui/button";

export default function GalleryPage() {
  // Array com as 15 fotos (repetindo as 3 imagens disponíveis)
  const galleryImages = [
    { src: "/images/image 141.png", alt: "Palestra no AIBE Workshop 1" },
    { src: "/images/image 142.png", alt: "Grupo de participantes 1" },
    { src: "/images/image 143.png", alt: "Mesa de discussão 1" },
    { src: "/images/image 141.png", alt: "Palestra no AIBE Workshop 2" },
    { src: "/images/image 142.png", alt: "Grupo de participantes 2" },
    { src: "/images/image 143.png", alt: "Mesa de discussão 2" },
    { src: "/images/image 141.png", alt: "Palestra no AIBE Workshop 3" },
    { src: "/images/image 142.png", alt: "Grupo de participantes 3" },
    { src: "/images/image 143.png", alt: "Mesa de discussão 3" },
    { src: "/images/image 141.png", alt: "Palestra no AIBE Workshop 4" },
    { src: "/images/image 142.png", alt: "Grupo de participantes 4" },
    { src: "/images/image 143.png", alt: "Mesa de discussão 4" },
    { src: "/images/image 141.png", alt: "Palestra no AIBE Workshop 5" },
    { src: "/images/image 142.png", alt: "Grupo de participantes 5" },
    { src: "/images/image 143.png", alt: "Mesa de discussão 5" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Spacer */}
      <div className="h-20"></div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/events/workshop2024">
            <Button variant="neutral" mode="stroke" size="medium" className="gap-2">
              <RiArrowLeftLine className="w-5 h-5" />
              Back to Workshop
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <p className="text-text-soft-400 font-medium tracking-wider uppercase mb-2 text-subheading-xs">
            Past Congresses
          </p>
          <h1 className="text-text-strong-950 text-title-h1 mobile:text-title-h2 mb-4">
            Gallery
          </h1>
          <p className="text-text-sub-600 text-paragraph-lg max-w-3xl">
            Explore moments from our past AIBE workshops and events. These images capture the spirit of collaboration, learning, and networking that define our community.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-80">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary-base mb-2">15+</p>
              <p className="text-text-sub-600 text-paragraph-md">Photos</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-base mb-2">3</p>
              <p className="text-text-sub-600 text-paragraph-md">Workshops</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-base mb-2">100+</p>
              <p className="text-text-sub-600 text-paragraph-md">Participants</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-title-h3 text-black mb-4">
            Want to be part of the next event?
          </h2>
          <p className="text-paragraph-lg text-text-sub-600 mb-6 max-w-2xl mx-auto">
            Join us at our upcoming workshops and become part of the AIBE community.
          </p>
          <Link href="/workshop">
            <Button variant="primary" size="medium">
              View Upcoming Events
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

