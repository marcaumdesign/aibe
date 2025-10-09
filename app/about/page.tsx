"use client";

import { RiFundsLine, RiGlobalLine, RiTeamLine, RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

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
    <div className="content-stretch flex flex-col gap-[64px] items-center justify-start relative size-full">
      {/* Hero Section */}
      <div className="box-border content-stretch flex flex-col gap-[53px] items-center justify-start p-[32px] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[53px] items-center justify-start max-w-[1200px] relative shrink-0 w-full">
          {/* Hero Content */}
          <div id="about-aibe" className="bg-white box-border content-stretch flex flex-col gap-[10px] items-start justify-start overflow-clip pb-0 pt-[64px] px-0 relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[32px] items-center justify-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[16px] items-center justify-start relative shrink-0 w-full">
                <div className="box-border content-stretch flex gap-[2px] items-center justify-center overflow-clip px-[8px] py-[2px] relative  shrink-0">
                  <div className="font-medium leading-[0] not-italic relative shrink-0 text-[#99a0ae] text-[12px] text-nowrap tracking-[0.48px] uppercase">
                    <p className="leading-[16px] whitespace-pre">About AIBE</p>
                  </div>
                </div>
                <div className="font-semibold leading-[0] not-italic relative shrink-0 text-[56px] text-black text-center tracking-[-3.92px] w-[648px]">
                  <p className="leading-[64px]">Science across borders, excellence in cooperation</p>
                </div>
              </div>
              <div
                className="bg-center bg-cover bg-no-repeat h-[447px]  shrink-0 w-full"
                style={{ backgroundImage: `url('/images/hero.png')` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* About AIBE Section */}
      <div className="content-stretch flex flex-col gap-[77px] items-center justify-center relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-[64px] items-center justify-start max-w-[1200px] px-0 py-[32px] relative shrink-0 w-full">
          <div className="content-stretch flex gap-[32px] items-start justify-start overflow-clip relative  w-full">
            <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start justify-start min-h-px min-w-px relative shrink-0">
              <div className="content-stretch flex flex-col gap-[16px] items-start justify-start leading-[0] not-italic relative shrink-0 w-full">
                <div className="font-semibold relative shrink-0 text-[29.226px] text-black tracking-[-1.4613px] w-full">
                  <p className="leading-[34.097px]">About AIBE</p>
                </div>
                <div className="font-normal leading-[24px] relative shrink-0 text-[#525866] text-[18px] text-justify tracking-[-0.36px] w-full">
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
                <div className="font-semibold relative shrink-0 text-[29.226px] text-black tracking-[-1.4613px] w-full">
                  <p className="leading-[34.097px]">Governance</p>
                </div>
                <div className="font-normal relative shrink-0 text-[#525866] text-[18px] text-justify tracking-[-0.36px] w-full">
                  <p className="leading-[24px]">
                    AIBE is governed by a Board of Directors elected every three years by the
                    Members&apos; Assembly, ensuring transparency and shared leadership in its
                    activities.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative w-[500px] h-[500px]">
              <Image
                src='/images/brasil-italia.png'
                alt='Brasil e Italia'
                fill
                className='object-contain'
              />
            </div>


          </div>
          <div className="bg-[#122368] box-border content-stretch flex gap-[4px] items-center justify-center overflow-clip p-[10px] relative shrink-0">
            <div className="box-border content-stretch flex items-center justify-center px-[4px] py-0 relative shrink-0">
              <div className="font-medium leading-[0] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white tracking-[-0.54px]">
                <p className="leading-[24px] whitespace-pre">Download the AIBE Constitution</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div
        ref={statsRef as React.RefObject<HTMLDivElement>}
        className="content-stretch flex flex-col gap-[77px] items-center justify-center relative shrink-0 w-full"
      >
        <div className="box-border content-stretch flex flex-col gap-[64px] items-center justify-start max-w-[1200px] px-0 py-[32px] relative shrink-0 w-full">
          <div className="content-stretch flex items-center justify-start overflow-clip relative shrink-0 w-full">
            <div className="basis-0 content-stretch flex gap-[16px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
              <div className="basis-0 box-border content-stretch flex flex-col gap-[12.011px] grow items-center justify-start leading-[0] min-h-px min-w-px not-italic p-[16px] relative  shrink-0">
                <div className="font-semibold relative shrink-0 text-[#122368] text-[96px] text-nowrap tracking-[-6.72px]">
                  <p className="leading-[64px] whitespace-pre">{researchers}</p>
                </div>
                <div className="font-semibold min-w-full relative shrink-0 text-[29.226px] text-black text-center tracking-[-1.4613px]">
                  <p className="leading-[34.097px]">Participating Researchers</p>
                </div>
                <div className="font-normal min-w-full relative shrink-0 text-[#525866] text-[18px] text-center tracking-[-0.36px]">
                  <p className="leading-[24px]">567 researchers have already taken part in AIBE meetings.</p>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex gap-[16px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
              <div className="basis-0 box-border content-stretch flex flex-col gap-[12.011px] grow items-center justify-start leading-[0] min-h-px min-w-px not-italic p-[16px] relative  shrink-0">
                <div className="font-semibold relative shrink-0 text-[#122368] text-[96px] text-nowrap tracking-[-6.72px]">
                  <p className="leading-[64px] whitespace-pre">{institutions}</p>
                </div>
                <div className="font-semibold min-w-full relative shrink-0 text-[29.226px] text-black text-center tracking-[-1.4613px]">
                  <p className="leading-[34.097px]">Institutions Involved</p>
                </div>
                <div className="font-normal min-w-full relative shrink-0 text-[#525866] text-[18px] text-center tracking-[-0.36px]">
                  <p className="leading-[24px]">Partnership with more than XX universities and research centers in Brazil and Italy.</p>
                </div>
              </div>
            </div>
            <div className="basis-0 content-stretch flex gap-[16px] grow items-center justify-center min-h-px min-w-px relative shrink-0">
              <div className="basis-0 box-border content-stretch flex flex-col gap-[12.011px] grow items-center justify-start leading-[0] min-h-px min-w-px not-italic p-[16px] relative  shrink-0">
                <div className="font-semibold relative shrink-0 text-[#122368] text-[96px] text-nowrap tracking-[-6.72px]">
                  <p className="leading-[64px] whitespace-pre">{students}</p>
                </div>
                <div className="font-semibold min-w-full relative shrink-0 text-[29.226px] text-black text-center tracking-[-1.4613px]">
                  <p className="leading-[34.097px]">Students Supported</p>
                </div>
                <div className="font-normal min-w-full relative shrink-0 text-[#525866] text-[18px] text-center tracking-[-0.36px]">
                  <p className="leading-[24px]">XX students and researchers supported in exchange programs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AIBE in Context Section */}
      <div className="content-stretch flex flex-col gap-[77px] items-center justify-center relative shrink-0 w-full">
        <div className="bg-[#f3f8ff] box-border content-stretch flex flex-col gap-[64px] items-center justify-start max-w-[1200px] p-[64px] relative shrink-0 w-full">
          <div className="content-stretch flex gap-[32px] items-start justify-start overflow-clip relative shrink-0 w-full">
            <div className="basis-0 content-stretch flex flex-col gap-[32px] grow items-start justify-start min-h-px min-w-px relative shrink-0">
              <div className="content-stretch flex flex-col gap-[16px] items-start justify-start leading-[0] not-italic relative shrink-0 w-full">
                <div className="font-semibold relative shrink-0 text-[29.226px] text-black tracking-[-1.4613px] w-full">
                  <p className="leading-[34.097px]">AIBE in context</p>
                </div>
                <div className="font-normal relative shrink-0 text-[#525866] text-[18px] text-justify tracking-[-0.36px] w-full">
                  <p className="leading-[24px]">AIBE operates in a context of strong cooperation between Brazil and Italy, rooted in historical, cultural, and academic ties. This environment has been reinforced by the Bilateral Agreement on Scientific and Technological Cooperation, in force since 1998, which has enabled joint research projects, funding calls, and greater institutional integration. In recent years, there has also been a significant growth in the presence of Brazilian scholars within the Italian academic system, as well as a steady increase in co-authored publications, consolidating the importance of this international partnership.</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[16px] items-start justify-start relative shrink-0 w-full">
                <div className="overflow-clip relative shrink-0 size-[56px]">
                  <RiGlobalLine className="w-[56px] h-[56px]" />
                </div>
                <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0">
                  <div className="flex flex-col font-semibold h-[23.94px] justify-center relative shrink-0 text-[24px] text-black tracking-[-1.2px] w-full">
                    <p className="leading-[34.097px]">Historical and Institutional Ties</p>
                  </div>
                  <div className="font-normal relative shrink-0 text-[#525866] text-[18px] text-justify tracking-[-0.36px] w-full">
                    <p className="leading-[24px]">Enduring relations between Brazil and Italy, supported by a bilateral science and technology agreement since 1998.</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[16px] items-start justify-start relative shrink-0 w-full">
                <div className="overflow-clip relative shrink-0 size-[56px]">
                  <RiFundsLine className="w-[56px] h-[56px]" />
                </div>
                <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0">
                  <div className="flex flex-col font-semibold h-[23.94px] justify-center relative shrink-0 text-[24px] text-black tracking-[-1.2px] w-full">
                    <p className="leading-[34.097px]">Research Opportunities</p>
                  </div>
                  <div className="font-normal relative shrink-0 text-[#525866] text-[18px] text-justify tracking-[-0.36px] w-full">
                    <p className="leading-[24px]">Joint funding calls and collaborative projects connecting universities and research centers.</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[16px] items-start justify-start relative shrink-0 w-full">
                <div className="overflow-clip relative shrink-0 size-[56px]">
                  <RiTeamLine className="w-[56px] h-[56px]" />
                </div>
                <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0">
                  <div className="flex flex-col font-semibold h-[23.94px] justify-center relative shrink-0 text-[24px] text-black tracking-[-1.2px] w-full">
                    <p className="leading-[34.097px]">Expanding Academic Community</p>
                  </div>
                  <div className="font-normal relative shrink-0 text-[#525866] text-[18px] text-justify tracking-[-0.36px] w-full">
                    <p className="leading-[24px]">A growing number of Brazilian scholars in Italian institutions and co-authored publications between researchers of both countries.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Board of Directors Carousel Section */}
      <div className="content-stretch flex flex-col gap-[77px] items-center justify-center relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start justify-start max-w-[1200px] p-[32px] relative shrink-0 w-full">
          <div className="content-stretch flex gap-[16px] items-end justify-between max-w-[1200px] relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[16px] items-start justify-start relative shrink-0 ml-[64px]">
              <div className="box-border content-stretch flex items-center justify-center overflow-clip pl-[2px] pr-[8px] py-[2px] relative  shrink-0 gap-[6px]">
                <div className="relative shrink-0 size-[4px]">
                  <div className="bg-[#99a0ae] rounded-full size-full"></div>
                </div>
                <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#99a0ae] text-[10px] text-nowrap tracking-[0.48px] uppercase">
                  <p className="leading-[14px] whitespace-pre">Team</p>
                </div>
              </div>
              <div className="font-semibold leading-[0] not-italic relative shrink-0 text-[48px] text-black tracking-[-1.44px]">
                <p className="leading-[56px]">Board of directors</p>
              </div>
            </div>
            <div className="bg-[#122368] box-border content-stretch flex gap-[4px] items-center justify-center overflow-clip p-[10px] relative shrink-0">
              <div className="box-border content-stretch flex items-center justify-center px-[4px] py-0 relative shrink-0">
                <div className="font-medium leading-[0] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white tracking-[-0.27px]">
                  <p className="leading-[24px] whitespace-pre">View All</p>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Container - SIMPLES */}
          <div className="flex gap-[32px] items-center justify-center w-full">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="flex-shrink-0 w-[24px] h-[24px] hover:opacity-70 transition-opacity"
            >
              <RiArrowLeftLine className="w-full h-full text-[#525866]" />
            </button>

            {/* Carousel Content */}
            <div className="flex-1">
              <div className="flex gap-[16px] px-[8px]">
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
                    <h3 className="font-semibold text-[24px] text-black tracking-[-0.96px] mb-2">
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
        </div>
      </div>

      {/* CTA + Footer Section */}
      <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full mt-[192px]">
        <div className="bg-[#122368] content-stretch flex flex-col items-center justify-start relative shrink-0 w-full">
          {/* CTA Content */}
          <div className="box-border content-stretch flex flex-col gap-[32px] items-start justify-start max-w-[1200px] pb-[64px] pt-[98px] px-[32px] relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[32px] items-center justify-start max-w-[1200px] relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[16px] items-center justify-start leading-[0] not-italic relative shrink-0 text-center w-full">
                <div className="font-semibold relative shrink-0 text-[48px] text-white tracking-[-3.36px] w-[588.985px]">
                  <p className="leading-[56px]">Join AIBE and Strengthen Academic Cooperation</p>
                </div>
                <div className="font-normal relative shrink-0 text-[#cacfd8] text-[18px] tracking-[-0.36px] w-[661.628px]">
                  <p className="leading-[24px]">By joining AIBE, you will engage with researchers, access unique opportunities, and support initiatives that unite Brazil and Italy in economic research.</p>
                </div>
              </div>
              <div className="bg-white box-border content-stretch flex gap-[4px] items-center justify-center overflow-clip p-[10px] relative shrink-0">
                <div className="box-border content-stretch flex items-center justify-center px-[4px] py-0 relative shrink-0">
                  <div className="font-medium leading-[0] not-italic relative shrink-0 text-[#0e121b] text-[18px] text-center text-nowrap tracking-[-0.27px]">
                    <p className="leading-[24px] whitespace-pre">Become a Member</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-[-54.15%_30.74%_83.33%_35.88%]">
              <Image alt="" className="block max-w-none size-full" src="/images/bandeira cta.svg" fill />
            </div>
          </div>
        </div>
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
                <h2 className="font-semibold text-[32px] text-black tracking-[-1.28px] mb-2">
                  {selectedDirector.name}
                </h2>
                <h3 className="font-semibold text-[24px] text-black tracking-[-0.96px] mb-4">
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
