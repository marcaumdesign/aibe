"use client";

import { RiFundsBoxLine, RiFundsLine, RiGlobalLine, RiTeamLine, RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Root as Button } from "@/components/ui/button";
import CTA from "@/components/cta";

// Tipo para os membros do board
interface BoardMember {
  id: number;
  name: string;
  position: string;
  image: string;
  affiliation?: string;
  bio?: string;
}

// Dados das pessoas do board of directors
const boardMembers: BoardMember[] = [
  {
    id: 1,
    name: "Fernando L. Aiube",
    position: "Associate Professor",
    image: "/images/Fernando.png",
    affiliation: "State University of Rio de Janeiro (UERJ) & Institute of Pure and Applied Mathematics (IMPA)",
    bio: "Fernando Aiube is a financial economist specializing in corporate finance, derivatives, econometrics, energy markets, and real options. His previous experience includes roles as an oil engineer at Petrobras, in both the Exploration & Production Department, and the Financial Department. During his academic career, Fernando has also worked with Italian co-authors."
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
  const [selectedDirector, setSelectedDirector] = useState<BoardMember | null>(null);

  // Estados para os contadores
  const [researchers, setResearchers] = useState(0);
  const [institutions, setInstitutions] = useState(0);
  const [students, setStudents] = useState(0);

  // Hook para detectar quando a seção entra na viewport
  const { ref: statsRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '0px 0px 0px 0px',
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % boardMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? boardMembers.length - 1 : prev - 1
    );
  };

  // Criar array com os 4 diretores a serem exibidos
  const slidesToShow = [];
  for (let i = 0; i < 4; i++) {
    slidesToShow.push(boardMembers[(currentIndex + i) % boardMembers.length]);
  }

  // Função de easing ease-in-out
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Animar contadores quando a seção entra na viewport
  useEffect(() => {
    if (!isIntersecting) return;

    const duration = 4000; // 4 segundos
    const targetResearchers = 279;
    const targetInstitutions = 63;
    const targetStudents = 34;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      setResearchers(Math.floor(easedProgress * targetResearchers));
      setInstitutions(Math.floor(easedProgress * targetInstitutions));
      setStudents(Math.floor(easedProgress * targetStudents));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isIntersecting]);

  const openDirectorModal = (director: BoardMember) => {
    setSelectedDirector(director);
  };

  const closeDirectorModal = () => {
    setSelectedDirector(null);
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

      {/* About AIBE Section */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col gap-16 items-center justify-start max-w-[1200px] p-8 mobile:p-4 w-full">
          <div className="flex flex-row mobile:flex-col gap-8 items-start justify-start overflow-clip relative  w-full">
            <div className="flex flex-col gap-8 max-w-[600px] items-start justify-start">
              <div className="flex flex-col gap-4 items-start justify-start not-italic w-full">
                <h2 className="text-title-h4 text-black w-full">
                  About AIBE
                </h2>
                <div className="font-normal leading-[24px] text-[#525866] text-[18px] text-justify tracking-[-0.36px] w-full">
                  <p className="mb-0">
                    The Italian-Brazilian Association of Economics (AIBE) is a bilateral, non-profit
                    institution registered in Italy, dedicated to fostering scientific collaboration
                    between Brazilian and Italian economists. Beyond encouraging academic exchange,
                    AIBE also strengthens connections between academia, policy-makers, and industry,
                    building a shared space for dialogue and cooperation.
                  </p>
                  <p className="mb-0">&nbsp;</p>
                  <p>
                    Among its key initiatives, the association organizes an annual economics
                    workshop, alternately hosted in Brazil or Italy; awards the Giorgio Mortara
                    Prize, which recognizes outstanding research by young scholars; and promotes the
                    dissemination of knowledge and funding opportunities, supporting the growth of
                    international research networks.
                  </p>
                </div>
                <h2 className="text-title-h4 text-black w-full">
                  Governance
                </h2>
                <div className="text-paragraph-lg text-text-sub-600 w-full">
                  <p className="leading-[24px]">
                    AIBE is governed by a Board of Directors elected every three years by the
                    Members' Assembly, ensuring transparency and shared leadership in its
                    activities.
                  </p>
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

      {/* Statistics Section */}
      <div
        ref={statsRef as React.RefObject<HTMLDivElement>}
        className="flex flex-col  items-center justify-center w-full"
      >
        <div className="flex flex-row mobile:flex-col gap-8 items-center justify-start max-w-[1200px] w-full p-4">

          <div className="flex flex-row mobile:flex-col gap-4 items-center justify-center flex-1">
            <div className="flex flex-col gap-3 items-center justify-start not-italic p-4 relative w-full">

              <p className="text-title-h0 text-center text-primary-base">{researchers}</p>

              <h3 className="text-title-h4 text-black text-center min-w-full">
                Participating Researchers
              </h3>
              <div className="font-normal min-w-full text-[#525866] text-[18px] text-center tracking-[-0.36px]">
                <p className="leading-[24px]">567 researchers have already taken part in AIBE meetings.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row mobile:flex-col gap-4 items-center justify-center flex-1">
            <div className="flex flex-col gap-3 items-center justify-start relative w-full">

              <p className="text-title-h0 text-center text-primary-base">{institutions}</p>

              <h3 className="text-title-h4 text-black text-center min-w-full">
                Institutions Involved
              </h3>
              <div className="font-normal min-w-full text-[#525866] text-[18px] text-center tracking-[-0.36px]">
                <p className="leading-[24px]">Partnership with more than XX universities and research centers in Brazil and Italy.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row mobile:flex-col gap-4 items-center justify-center flex-1">
            <div className="flex flex-col gap-3 items-center justify-start not-italic relative w-full">

              <p className="text-title-h0 text-center text-primary-base">{students}</p>

              <h3 className="text-title-h4 text-black text-center min-w-full">
                Students Supported
              </h3>
              <div className="font-normal min-w-full text-[#525866] text-[18px] text-center tracking-[-0.36px]">
                <p className="leading-[24px]">XX students and researchers supported in exchange programs.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* AIBE in Context Section */}
      <div className="flex flex-col gap-[77px] items-center justify-center w-full">
        <div className="bg-[#f3f8ff] flex flex-col gap-[64px] items-center justify-start max-w-[1200px] px-[64px] mobile:px-4 py-[64px] mobile:py-4 w-full">
          <div className="flex gap-8 items-start justify-start w-full">
            <div className="flex flex-col gap-8 items-start justify-start w-full max-w-full">
              <div className="flex flex-col gap-4 items-start justify-start not-italic w-full">
                <h2 className="text-title-h4 text-black w-full">
                  AIBE in context
                </h2>
                <div className="text-paragraph-lg text-text-sub-600 w-full overflow-visible">
                  <p className="leading-[24px] break-words">AIBE operates in a context of strong cooperation between Brazil and Italy, rooted in historical, cultural, and academic ties. This environment has been reinforced by the Bilateral Agreement on Scientific and Technological Cooperation, in force since 1998, which has enabled joint research projects, funding calls, and greater institutional integration. In recent years, there has also been a significant growth in the presence of Brazilian scholars within the Italian academic system, as well as a steady increase in co-authored publications, consolidating the importance of this international partnership.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start justify-start w-full">
                <div className="flex-shrink-0">
                  <RiGlobalLine className="w-[56px] h-[56px] text-[#122368]" />
                </div>
                <div className="flex flex-col gap-[8px] items-start justify-start flex-1">
                  <p className="text-title-h5">Historical and Institutional Ties</p>
                  <div className="text-paragraph-lg text-text-sub-600 w-full">
                    <p className="leading-[24px]">Enduring relations between Brazil and Italy, supported by a bilateral science and technology agreement since 1998.</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start justify-start w-full">
                <div className="flex-shrink-0">
                  <RiFundsLine className="w-[56px] h-[56px] text-[#122368]" />
                </div>
                <div className="flex flex-col gap-[8px] items-start justify-start flex-1">
                  <p className="text-title-h5">Research Opportunities</p>
                  <div className="text-paragraph-lg text-text-sub-600 w-full">
                    <p className="leading-[24px]">Joint funding calls and collaborative projects connecting universities and research centers.</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start justify-start w-full">
                <div className="flex-shrink-0">
                  <RiTeamLine className="w-[56px] h-[56px] text-[#122368]" />
                </div>
                <div className="flex flex-col gap-[8px] items-start justify-start flex-1">
                  <p className="text-title-h5">Expanding Academic Community</p>
                  <div className="text-paragraph-lg text-text-sub-600 w-full">
                    <p className="leading-[24px]">A growing number of Brazilian scholars in Italian institutions and co-authored publications between researchers of both countries.</p>
                  </div>
                </div>
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
                  <div
                    key={`${member.id}-${currentIndex}-${index}`}
                    className={`flex-1 flex flex-col items-center text-center ${member.id === 1 ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                    onClick={() => member.id === 1 && openDirectorModal(member)}
                  >
                    <div className="w-full h-[295px] bg-[#f3f3f3]  overflow-hidden mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={246}
                        height={295}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <h3 className="text-title-h5 text-black mb-2">
                      {member.name}
                    </h3>
                    <p className="font-normal text-[#525866] text-[18px] tracking-[-0.36px]">
                      {member.position}
                    </p>
                  </div>
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
                      className={`w-full flex-shrink-0 flex flex-col items-center text-center px-4 ${member.id === 1 ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                      onClick={() => member.id === 1 && openDirectorModal(member)}
                    >
                      <div className="w-[200px] h-[240px] bg-[#f3f3f3] overflow-hidden mb-4">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={200}
                          height={240}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <h3 className="text-title-h6 text-black mb-2">
                        {member.name}
                      </h3>
                      <p className="font-normal text-[#525866] text-[16px] tracking-[-0.32px]">
                        {member.position}
                      </p>
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
      {selectedDirector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={closeDirectorModal}
              className="absolute top-4 left-4 bg-[#122368] text-white w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <span className="text-lg font-bold">×</span>
            </button>

            {/* Modal Content */}
            <div className="p-8 pt-16 pb-20">
              <div className="flex flex-col items-start text-left">
                {/* Profile Image */}
                <div className="w-48 h-48 bg-[#f3f3f3] overflow-hidden mb-6">
                  <Image
                    src={selectedDirector.image}
                    alt={selectedDirector.name}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Name and Title */}
                <h2 className="text-[32px] leading-[40px] tracking-[-1.28px] text-black mb-2">
                  {selectedDirector.name}
                </h2>
                <h3 className="text-title-h5 text-black mb-4">
                  {selectedDirector.position}
                </h3>

                {/* Affiliation */}
                <p className="font-normal text-[#525866] text-[18px] tracking-[-0.36px] mb-6 text-left">
                  {selectedDirector.affiliation}
                </p>

                {/* Biography */}
                <p className="font-normal text-[#525866] text-[18px] tracking-[-0.36px] text-left leading-relaxed mb-8 w-full">
                  {selectedDirector.bio}
                </p>

                {/* Explore Profile Button */}
                <button className="bg-[#122368] text-white px-6 py-3 hover:opacity-80 transition-opacity">
                  Explore Profile
                </button>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <button className="bg-[#122368] text-white w-10 h-10 rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                <RiArrowLeftLine className="w-5 h-5" />
              </button>
              <button className="bg-[#122368] text-white w-10 h-10 rounded flex items-center justify-center hover:opacity-80 transition-opacity">
                <RiArrowRightLine className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
