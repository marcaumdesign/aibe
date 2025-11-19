"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { RiArrowLeftLine, RiArrowRightLine, RiCloseLine } from "@remixicon/react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryClientProps {
  images: GalleryImage[];
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  // Navegar para a imagem anterior
  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1
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
          setSelectedImageIndex((selectedImageIndex + 1) % images.length);
        }
      } else if (e.key === "ArrowLeft") {
        if (selectedImageIndex !== null) {
          setSelectedImageIndex(
            selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, selectedImageIndex, images.length]);

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="relative w-full h-80">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Image
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
            aria-label="Close gallery"
          >
            <RiCloseLine className="w-10 h-10" />
          </button>

          {/* Contador de imagens */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[110] text-white text-lg">
            {selectedImageIndex + 1} / {images.length}
          </div>

          {/* Botão Anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 z-[110] text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
            aria-label="Previous image"
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
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Botão Próximo */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 z-[110] text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70"
            aria-label="Next image"
          >
            <RiArrowRightLine className="w-8 h-8" />
          </button>
        </div>
      )}
    </>
  );
}

