"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiArrowLeftLine, RiArrowRightLine, RiCloseLine } from "@remixicon/react";
import { Root as Button } from "@/components/ui/button";

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Fotos reais (sem repetições diretas) + novas do print
  const galleryImages = [
    { src: "/images/1%20AIBE%20WORKSHOP.jpeg", alt: "Opening talk" },
    { src: "/images/1ST%20CARTAZ%20AIBE%20WORKSHOP%20.jpeg", alt: "Welcome banner" },
    { src: "/images/WORKSHOP%20FOTO%2011.jpeg", alt: "Workshop photo 11" },
    { src: "/images/WORKSHOP%20FOTO%2010.jpeg", alt: "Workshop photo 10" },
    { src: "/images/WORKSHOP%20FOTO%209.jpeg", alt: "Workshop photo 9" },
    { src: "/images/WORKSHOP%20FOTO%208.jpeg", alt: "Workshop photo 8" },
    { src: "/images/WORKSHOP%20FOTO%207.jpeg", alt: "Workshop photo 7" },
    { src: "/images/WORKSHOP%20FOTO%206.jpeg", alt: "Workshop photo 6" },
    { src: "/images/WORKHOP%20FOTO%205.jpeg", alt: "Workshop photo 5" },
    { src: "/images/WORKSHOP%20FOTO%204.jpeg", alt: "Workshop photo 4" },
    // repete alguns para completar a grade até 15
    { src: "/images/1%20AIBE%20WORKSHOP.jpeg", alt: "Opening talk (b)" },
    { src: "/images/WORKSHOP%20FOTO%206.jpeg", alt: "Workshop photo 6 (b)" },
    { src: "/images/WORKSHOP%20FOTO%209.jpeg", alt: "Workshop photo 9 (b)" },
    { src: "/images/WORKSHOP%20FOTO%207.jpeg", alt: "Workshop photo 7 (b)" },
    { src: "/images/1ST%20CARTAZ%20AIBE%20WORKSHOP%20.jpeg", alt: "Welcome banner (b)" },
  ];

  // Abrir lightbox
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  // Fechar lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImageIndex(null);
  };

  // Navegar para a próxima imagem
  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  // Navegar para a imagem anterior
  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? galleryImages.length - 1 : selectedImageIndex - 1
      );
    }
  };

  // Bloquear scroll quando lightbox está aberto
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  // Navegar com teclado
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        if (selectedImageIndex !== null) {
          setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
        }
      } else if (e.key === "ArrowLeft") {
        if (selectedImageIndex !== null) {
          setSelectedImageIndex(
            selectedImageIndex === 0 ? galleryImages.length - 1 : selectedImageIndex - 1
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, selectedImageIndex, galleryImages.length]);

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

        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative w-full h-80">
                <Image
                  src={image.src}
                  alt="AIBE Workshop"
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  AIBE Workshop
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Carrossel */}
        {isLightboxOpen && selectedImageIndex !== null && (
          <div
            className="fixed inset-0 z-[100] bg-black bg-opacity-95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Botão Fechar */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-[110] text-white hover:text-gray-300 transition-colors"
            >
              <RiCloseLine className="w-10 h-10" />
            </button>

            {/* Contador de imagens */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[110] text-white text-lg">
              {selectedImageIndex + 1} / {galleryImages.length}
            </div>

            {/* Botão Anterior */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 z-[110] text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
            >
              <RiArrowLeftLine className="w-8 h-8" />
            </button>

            {/* Imagem */}
            <div
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center px-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={galleryImages[selectedImageIndex].src}
                  alt="AIBE Workshop"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              {/* Legenda */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg">
                <p className="text-center">AIBE Workshop</p>
              </div>
            </div>

            {/* Botão Próximo */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 z-[110] text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
            >
              <RiArrowRightLine className="w-8 h-8" />
            </button>
          </div>
        )}

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

