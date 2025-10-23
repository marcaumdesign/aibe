"use client";

import { RiArrowLeftLine, RiArrowRightLine, RiCheckLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Root as Button } from "@/components/ui/button";
import CTA from "@/components/cta";
import type { Director } from "@/lib/strapi";
import DirectorCard from "@/components/director-card";
import DirectorModal from "@/components/director-modal";

// Tipo para os membros do board
interface BoardMember {
  id: number;
  name: string;
  position: string;
  image: string;
}

// Dados das pessoas do board of directors - fallback local
const boardMembersFallback: BoardMember[] = [
  {
    id: 1,
    name: "Fernando L. Aiube",
    position: "Associate Professor",
    image: "/images/Fernando.png",
  },
  {
    id: 2,
    name: "Raphael Corbi",
    position: "Full Professor",
    image: "/images/Raphael.png"
  },
  {
    id: 3,
    name: "Tito Cordella",
    position: "Full Professor",
    image: "/images/titocordella.png"
  },
  {
    id: 4,
    name: "Chiara Falco",
    position: "Assistant Professor",
    image: "/images/chiarafalco.png"
  },
  {
    id: 5,
    name: "Alan de Gennaro",
    position: "Associate Professor",
    image: "/images/alandegennaro.png"
  },
  {
    id: 6,
    name: "Rafael F. Schiozer",
    position: "Full Professor",
    image: "/images/rafaelfschozer.png"
  },
  {
    id: 7,
    name: "Luca J. Uberti",
    position: "Assistant Professor",
    image: "/images/Luca.png"
  },
  {
    id: 8,
    name: "Andrea Ugolini",
    position: "Assistant Professor",
    image: "/images/Andrea.png"
  }
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);
  const [directors, setDirectors] = useState<Director[]>([]);

  // Carregar diretores via API proxy
  useEffect(() => {
    async function loadDirectors() {
      try {
        console.log('📡 Buscando diretores via API proxy...');
        const res = await fetch('/api/directors', {
          cache: 'no-store',
        });

        if (!res.ok) {
          console.error('❌ Erro na API proxy:', res.status);
          setDirectors([]);
          return;
        }

        const json = await res.json();
        const data = json.directors || [];
        console.log('📥 Diretores carregados via API:', data.length);
        setDirectors(data);
      } catch (error) {
        console.error('❌ Erro ao buscar diretores:', error);
        setDirectors([]);
      }
    }
    loadDirectors();
  }, []);

  // Debug: monitorar quando selectedDirector muda
  useEffect(() => {
    console.log('🔄 selectedDirector mudou:', selectedDirector);
  }, [selectedDirector]);

  // Deriva dados do Strapi no shape do carrossel (recalcula quando directors mudar)
  const boardMembers = useMemo(() => {
    if (directors.length === 0) {
      console.log('⚠️ Usando fallback local (directors vazio)');
      return boardMembersFallback;
    }

    console.log('✅ Usando dados do Strapi para carrossel:', directors.length, 'diretores');
    return directors.map((d) => ({
      id: d.id,
      name: d.Name,
      position: d.Role,
      image: d.Avatar?.url || '',
    }));
  }, [directors]);

  const nextSlide = () => {
    if (boardMembers.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % boardMembers.length);
  };

  const prevSlide = () => {
    if (boardMembers.length === 0) return;
    setCurrentIndex((prev) =>
      prev === 0 ? boardMembers.length - 1 : prev - 1
    );
  };

  // Criar array com os 4 diretores a serem exibidos
  const slidesToShow = [];
  for (let i = 0; i < Math.min(4, boardMembers.length); i++) {
    slidesToShow.push(boardMembers[(currentIndex + i) % boardMembers.length]);
  }

  const openDirectorModal = (memberName: string) => {
    console.log('🎯 Tentando abrir modal para:', memberName);
    console.log('📋 Diretores disponíveis do Strapi:', directors.map(d => d.Name));

    if (directors.length === 0) {
      console.warn('⚠️ Array de diretores ainda vazio. Aguarde o carregamento do Strapi.');
      return;
    }

    // Buscar o diretor correspondente do Strapi pelo NOME (busca flexível)
    const directorFromStrapi = directors.find(d => {
      const strapiName = d.Name?.trim().toLowerCase() || '';
      const searchName = memberName.trim().toLowerCase();

      // Tenta match exato primeiro
      if (strapiName === searchName) return true;

      // Tenta match parcial (caso tenha diferenças mínimas)
      if (strapiName.includes(searchName) || searchName.includes(strapiName)) return true;

      return false;
    });

    console.log('✅ Diretor encontrado:', directorFromStrapi);

    if (directorFromStrapi) {
      setSelectedDirector(directorFromStrapi);
      console.log('✨ Modal deve abrir agora!');
    } else {
      console.error('❌ Diretor não encontrado no Strapi para:', memberName);
      console.error('💡 Nomes disponíveis:', directors.map(d => d.Name));
    }
  };

  const closeDirectorModal = () => {
    setSelectedDirector(null);
  };

  const navigateDirector = (direction: 'prev' | 'next') => {
    if (!selectedDirector || directors.length === 0) return;

    const currentDirectorIndex = directors.findIndex(d => d.id === selectedDirector.id);
    if (currentDirectorIndex === -1) return;

    let newIndex: number;
    if (direction === 'prev') {
      newIndex = currentDirectorIndex === 0 ? directors.length - 1 : currentDirectorIndex - 1;
    } else {
      newIndex = currentDirectorIndex === directors.length - 1 ? 0 : currentDirectorIndex + 1;
    }

    setSelectedDirector(directors[newIndex]);
  };

  return (
    <div className="flex flex-col gap-[64px] items-center justify-start relative size-full">
      {/* Hero Section */}
      <div className="flex flex-col gap-[53px] items-center justify-start w-full">
        <div className="flex flex-col gap-[53px] items-center p-8 mobile:p-4 justify-start max-w-[1200px] w-full">
          {/* Hero Content */}
          <div id="about-aibe" className="bg-white flex flex-col gap-[10px] items-start justify-start overflow-clip pb-0 pt-[32px] mobile:pt-4 px-0 w-full">
            <div className="flex flex-col gap-8 items-center justify-start w-full">
              <div className="flex flex-col gap-4 items-center justify-start w-full">
                <div className="flex gap-[2px] items-center justify-center overflow-clip px-[8px] py-[2px] relative  shrink-0">
                  <div className="font-medium not-italic text-[#99a0ae] text-[12px] text-nowrap tracking-[0.48px] uppercase">
                    <p className="leading-4 whitespace-pre">About AIBE</p>
                  </div>
                </div>
                <h1 className="text-title-h1 text-black text-center max-w-[648px]">
                  Science across borders, excellence in cooperation
                </h1>
              </div>
              <div
                className="bg-center bg-cover bg-no-repeat h-[447px]  shrink-0 w-full"
                style={{ backgroundImage: `url('/images/brazil-italy.png')` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* AIBE at a glance Section */}
      <div className="flex flex-col items-center justify-center w-full bg-[#f3f8ff]">
        <div className="flex flex-col gap-16 items-center justify-start max-w-[1200px] p-8 mobile:p-4 w-full">
          <h2 className="text-title-h3 mobile:text-title-h4 text-black text-center w-full">
            AIBE at a glance
          </h2>
          <div className="flex flex-row mobile:flex-col gap-8 items-center justify-between w-full">
            {/* Imagem à esquerda */}
            <div className="relative w-full max-w-[500px] mobile:max-w-full h-[450px] mobile:h-[350px] flex-shrink-0">
              <Image
                src='/images/suits-flag.png'
                alt='AIBE Representative with Brazil and Italy flags'
                fill
                className='object-cover'
              />
            </div>

            {/* Conteúdo à direita */}
            <div className="flex flex-col gap-6 mobile:gap-4 items-start justify-start w-full">
              <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                <p>We are a bilateral, non-profit association registered in Italy. We facilitate research collaboration between Brazilian and Italian economists. We also promote links between academia, policy-makers and industry. In particular, we:</p>
              </div>

              {/* Lista com checkmarks */}
              <div className="flex flex-col gap-4 mobile:gap-3 w-full">
                {/* Item 1 */}
                <div className="flex gap-3 mobile:gap-2 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <RiCheckLine className="w-5 h-5 mobile:w-4 mobile:h-4 text-black" />
                  </div>
                  <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                    <p>Organize an annual economics workshop.</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-3 mobile:gap-2 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <RiCheckLine className="w-5 h-5 mobile:w-4 mobile:h-4 text-black" />
                  </div>
                  <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                    <p>Award an annual prize.</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-3 mobile:gap-2 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <RiCheckLine className="w-5 h-5 mobile:w-4 mobile:h-4 text-black" />
                  </div>
                  <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                    <p>Disseminate information on joint research and funding opportunities.</p>
                  </div>
                </div>
              </div>

              {/* Parágrafo de governança */}
              <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                <p>AIBE is governed by a <Link href="/about/team" className="text-primary-base underline hover:opacity-80">Board of Directors</Link>, who are elected for three years by the Members' Assembly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AIBE in context Section */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col gap-16 items-center justify-start max-w-[1200px] p-8 mobile:p-4 w-full">
          <div className="flex flex-row mobile:flex-col gap-8 items-start justify-start overflow-clip relative  w-full">
            <div className="flex flex-col gap-8 max-w-[600px] items-start justify-start">
              <div className="flex flex-col gap-6 mobile:gap-4 items-start justify-start not-italic w-full">
                <h2 className="text-title-h4 mobile:text-title-h5 text-black w-full">
                  AIBE in context
                </h2>

                {/* Lista com checkmarks */}
                <div className="flex flex-col gap-6 mobile:gap-4 w-full">
                  {/* Item 1 */}
                  <div className="flex gap-4 mobile:gap-3 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-black" />
                    </div>
                    <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                      <p>Strong commercial, historical and cultural links between Italy and Brazil.</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex gap-4 mobile:gap-3 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-black" />
                    </div>
                    <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                      <p>A bilateral Agreement on Scientific and Technological Cooperation in force since December 1998.</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex gap-4 mobile:gap-3 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-black" />
                    </div>
                    <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                      <p>Joint calls for project funding.</p>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex gap-4 mobile:gap-3 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-black" />
                    </div>
                    <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                      <p>Fast-growing community of Brazilians in the Italian academic system.</p>
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="flex gap-4 mobile:gap-3 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-black" />
                    </div>
                    <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                      <p>Growing number of co-authorships between Brazilian and Italian economists.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full min-w-[300px] h-[500px]">
              <Image
                src='/images/brasil-italia.png'
                alt='Brasil e Italia'
                fill
                className='object-contain'
              />
            </div>


          </div>
          <div className="bg-[#122368] flex gap-[4px] items-center justify-center overflow-clip p-[10px] relative shrink-0">
            <div className="flex items-center justify-center px-[4px] py-0 relative shrink-0">
              <div className="font-medium not-italic text-[18px] text-center text-nowrap text-white tracking-[-0.54px]">
                <p className="leading-[24px] whitespace-pre">Download the AIBE Constitution</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Board of Directors Carousel Section */}
      <div className="flex flex-col gap-[77px] items-center justify-center w-full mobile:mb-[160px]">
        <div className="flex flex-col gap-8 items-start justify-start max-w-[1200px] p-[32px] mobile:p-4 w-full">
          <div className="flex flex-row mobile:flex-col gap-4 items-end mobile:items-start justify-between max-w-[1200px] w-full">
            <div className="flex flex-col gap-4 items-start w-auto mobile:w-full">
              {/* Tag "Team" - centralizada no mobile */}
              <div className="flex items-center justify-start mobile:justify-center overflow-clip pl-[2px] pr-[8px] py-[2px] relative shrink-0 gap-[6px] w-auto mobile:w-full">
                <div className="size-[4px]">
                  <div className="bg-[#99a0ae] rounded-full size-full"></div>
                </div>
                <div className="font-normal not-italic text-[#99a0ae] text-[10px] text-nowrap tracking-[0.48px] uppercase">
                  <p className="leading-[14px] whitespace-pre">Team</p>
                </div>
              </div>
              {/* Título - centralizado no mobile */}
              <h2 className="text-title-h3 text-center w-full">
                Board of directors
              </h2>
            </div>
            {/* Botão View All - visível apenas no desktop */}
            <Link href="/about/team" className="block mobile:hidden">
              <div className="bg-[#122368] flex gap-[4px] items-center justify-center overflow-clip p-[10px] relative shrink-0 w-fit cursor-pointer hover:opacity-80 transition-opacity">
                <div className="flex items-center justify-center px-[4px] py-0 relative shrink-0">
                  <div className="font-medium not-italic text-[18px] text-center text-nowrap text-white tracking-[-0.27px]">
                    <p className="leading-[24px] whitespace-pre">View All</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Carousel Container - DESKTOP */}
          <div className="flex mobile:hidden gap-8 items-center justify-center w-full">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="flex-shrink-0 w-[24px] h-[24px] hover:opacity-70 transition-opacity"
            >
              <RiArrowLeftLine className="w-full h-full text-[#525866]" />
            </button>

            {/* Carousel Content */}
            <div className="flex-1">
              <div className="flex gap-4 px-[8px]">
                {slidesToShow.map((member, index) => (
                  <DirectorCard
                    key={`${member.id}-${currentIndex}-${index}`}
                    id={member.id}
                    name={member.name}
                    role={member.position}
                    image={member.image}
                    imageAlt={member.name}
                    clickable={true}
                    onClick={() => openDirectorModal(member.name)}
                  />
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="flex-shrink-0 w-[24px] h-[24px] hover:opacity-70 transition-opacity"
            >
              <RiArrowRightLine className="w-full h-full text-[#525866]" />
            </button>
          </div>

          {/*Mobile Layout - Carousel horizontal */}
          <div className="hidden mobile:flex flex-col gap-4 w-full">
            <div className="flex gap-4 items-center justify-center w-full">
              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                className="flex-shrink-0 w-[32px] h-[32px] hover:opacity-70 transition-opacity"
              >
                <RiArrowLeftLine className="w-full h-full text-[#525866]" />
              </button>

              {/* Carousel Content - Mobile */}
              <div className="flex-1 overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {boardMembers.map((member) => (
                    <div
                      key={member.id}
                      className="w-full flex-shrink-0 flex justify-center px-4"
                    >
                      <DirectorCard
                        id={member.id}
                        name={member.name}
                        role={member.position}
                        image={member.image}
                        imageAlt={member.name}
                        clickable={true}
                        onClick={() => openDirectorModal(member.name)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                className="flex-shrink-0 w-[32px] h-[32px] hover:opacity-70 transition-opacity"
              >
                <RiArrowRightLine className="w-full h-full text-[#525866]" />
              </button>
            </div>

            {/* Indicadores de posição (bolinhas) */}
            <div className="flex gap-2 items-center justify-center">
              {boardMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${index === currentIndex
                    ? 'bg-[#122368] w-6'
                    : 'bg-[#d1d5db] w-2'
                    }`}
                />
              ))}
            </div>

            {/* Botão View All - visível apenas no mobile, após o carrossel */}
            <Link href="/about/team" className="hidden mobile:flex w-full justify-center mt-4">
              <div className="bg-[#122368] flex gap-[4px] items-center justify-center overflow-clip p-[10px] relative shrink-0 w-fit cursor-pointer hover:opacity-80 transition-opacity">
                <div className="flex items-center justify-center px-[4px] py-0 relative shrink-0">
                  <div className="font-medium not-italic text-[18px] text-center text-nowrap text-white tracking-[-0.27px]">
                    <p className="leading-[24px] whitespace-pre">View All</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA + Footer Section */}
      {/* Desktop/Tablet CTA original */}
      <div className="flex flex-col items-start justify-start w-full mt-[192px] mobile:hidden">
        <div className="bg-[#122368] flex flex-col items-center justify-start w-full relative overflow-visible">
          {/* CTA Content */}
          <div className="flex flex-col gap-8 items-start justify-start max-w-[1200px] pb-[64px] pt-[98px] px-[32px] w-full relative">
            <Image
              src='/images/bandeira cta.svg'
              alt='Brazilian and Italian flags'
              width={402}
              height={294}
              className='absolute left-1/2 transform -translate-x-1/2 top-[-200px] w-auto h-[300px] z-20'
            />

            <div className="flex flex-col gap-8 items-center justify-start max-w-[1200px] w-full">
              <div className="flex flex-col gap-4 items-center justify-start not-italic text-center w-full">
                <h2 className="text-title-h2 text-white max-w-[588.985px]">
                  Join AIBE and Strengthen Academic Cooperation
                </h2>
                <div className="font-normal text-[#cacfd8] text-[18px] tracking-[-0.36px] w-[661.628px]">
                  <p className="leading-[24px]">By joining AIBE, you will engage with researchers, access unique opportunities, and support initiatives that unite Brazil and Italy in economic research.</p>
                </div>
              </div>
              <Link href="/membership">
                <Button variant='neutral' mode='lighter' size='medium' className='h-hug w-fit'>
                  Become a Member
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA padronizado (Home) */}
      <div className="hidden mobile:block w-full">
        <CTA />
      </div>

      {/* Director Modal */}
      <DirectorModal
        director={selectedDirector}
        onClose={closeDirectorModal}
        onNavigate={navigateDirector}
        showNavigation={true}
      />

    </div>
  );
}
