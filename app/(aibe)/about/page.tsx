"use client";

import { RiCheckLine, RiTrophyLine, RiTeamLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Hook para animação de contagem
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Usar easing mais linear (easeOutQuad) que é mais rápido no final
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      let currentCount = Math.floor(startValue + (end - startValue) * easeOutQuad);

      // Garantir que não ultrapasse o valor final
      currentCount = Math.min(currentCount, end);

      // Se chegou perto do final (último 5%), ir direto para o final
      if (progress >= 0.95) {
        setCount(end);
        setHasAnimated(true);
        return;
      }

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
        setHasAnimated(true);
      }
    };

    // Pequeno delay para garantir que o componente está montado
    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100);

    return () => clearTimeout(timeout);
  }, [end, duration, hasAnimated]);

  return count;
}

export default function About() {
  const count9 = useCounter(9, 1500);
  const count40 = useCounter(40, 2000);

  return (
    <div className="flex flex-col items-center justify-start relative size-full">
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center w-full pt-[32px] mobile:pt-4 pb-8 gap-4">
        <div className="flex gap-[2px] items-center justify-center overflow-clip px-[8px] py-[2px] relative shrink-0">
          <div className="font-medium not-italic text-[#99a0ae] text-[12px] text-nowrap tracking-[0.48px] uppercase">
            <p className="leading-4 whitespace-pre">About AIBE</p>
          </div>
        </div>
        <h1 className="text-title-h1 mobile:text-title-h3 text-black text-center">
          At a glance
        </h1>
      </div>

      {/* Main Content Section - Two Columns */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col gap-16 items-center justify-start max-w-[1200px] p-8 mobile:p-4 pt-[64px] mobile:pt-8 w-full">
          <div className="flex flex-row mobile:flex-col gap-8 items-start justify-start w-full">
            {/* Left Column - Text Content */}
            <div className="flex flex-col gap-8 mobile:gap-6 items-start justify-start flex-1">
              {/* About AIBE Section */}
              <div className="flex flex-col gap-6 mobile:gap-4 items-start justify-start w-full">
                <h2 className="text-title-h4 mobile:text-title-h5 text-black w-full">
                  About AIBE
                </h2>
                <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                  <p>We are a bilateral, non-profit association registered in Italy. We facilitate research collaboration between Brazilian and Italian economists. We also promote links between academia, policy-makers and industry.</p>
                </div>
                <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                  <p>We are governed by a <Link href="/people" className="text-primary-base underline hover:opacity-80">Board of Directors</Link>, who are elected for three years by the Members' Assembly.</p>
                </div>
              </div>

              {/* In context Section */}
              <div className="flex flex-col gap-6 mobile:gap-4 items-start justify-start w-full">
                <h2 className="text-title-h4 mobile:text-title-h5 text-black w-full font-bold">
                  In context
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

            {/* Right Column - Image */}
            <div className="relative w-full flex-1 min-w-[300px] h-[500px] mobile:h-[350px]">
              <Image
                src='/images/brasil-italia.png'
                alt='Brasil e Italia'
                fill
                className='object-contain'
              />
            </div>
          </div>

          {/* Download Button */}
          <Link
            href="https://drive.google.com/file/d/1fAfZF52xDH3jCs1h3CNd3xD5t9mafUTo/view"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#122368] flex gap-[4px] items-center justify-center overflow-clip p-[10px] relative shrink-0 hover:opacity-80 transition-opacity cursor-pointer mt-8"
          >
            <div className="flex items-center justify-center px-[4px] py-0 relative shrink-0">
              <div className="font-medium not-italic text-[18px] text-center text-nowrap text-white tracking-[-0.54px]">
                <p className="leading-[24px] whitespace-pre">Download the AIBE Constitution</p>
              </div>
            </div>
          </Link>

          {/* Statistics Section */}
          <div className="flex flex-row mobile:flex-col gap-[300px] mobile:gap-8 items-center justify-center w-full mt-24 mobile:mt-16">
            {/* Statistic 1 */}
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="text-title-h0 mobile:text-title-h1 text-primary-base font-bold">
                {count9}
              </div>
              <div className="text-label-xl text-black text-center font-bold tracking-tight whitespace-nowrap">
                Board Members
              </div>
            </div>

            {/* Statistic 2 */}
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="text-title-h0 mobile:text-title-h1 text-primary-base font-bold">
                1
              </div>
              <div className="text-label-xl text-black text-center font-bold tracking-tight whitespace-nowrap">
                Workshop per Year
              </div>
            </div>

            {/* Statistic 3 */}
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="text-title-h0 mobile:text-title-h1 text-primary-base font-bold">
                {count40}+
              </div>
              <div className="text-label-xl text-black text-center font-bold tracking-tight whitespace-nowrap">
                Members Active
              </div>
            </div>
          </div>

          {/* AIBE Activities Section */}
          <div className="bg-[#f3f8ff] p-8 mobile:p-6 w-full mt-16 mobile:mt-12 mb-80 mobile:mb-48">
            <div className="flex flex-row mobile:flex-col gap-8 items-start w-full">
              {/* Left Content - Activities */}
              <div className="flex flex-col gap-6 mobile:gap-4 flex-1">
                <h3 className="text-title-h4 mobile:text-title-h5 text-black font-semibold">
                  AIBE Activities
                </h3>

                <div className="flex flex-col gap-6 mobile:gap-4">
                  {/* Activity 1 */}
                  <div className="flex gap-4 mobile:gap-3 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <RiTeamLine className="w-8 h-8 mobile:w-7 mobile:h-7 text-primary-base" />
                    </div>
                    <div className="text-paragraph-lg mobile:text-paragraph-md text-black font-bold">
                      <p>Organize an annual economics workshop.</p>
                    </div>
                  </div>

                  {/* Activity 2 */}
                  <div className="flex gap-4 mobile:gap-3 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <RiTrophyLine className="w-8 h-8 mobile:w-7 mobile:h-7 text-primary-base" />
                    </div>
                    <div className="text-paragraph-lg mobile:text-paragraph-md text-black font-bold">
                      <p>Award an annual prize.</p>
                    </div>
                  </div>

                  {/* Activity 3 */}
                  <div className="flex gap-4 mobile:gap-3 items-start">
                    <div className="flex-shrink-0 mt-1 relative w-8 h-8 mobile:w-7 mobile:h-7">
                      <Image
                        src='/images/menu-search-line.png'
                        alt='Search icon'
                        fill
                        className='object-contain'
                      />
                    </div>
                    <div className="text-paragraph-lg mobile:text-paragraph-md text-black font-bold">
                      <p>Disseminate information on joint research and funding<br />opportunities.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - Image */}
              <div className="flex-shrink-0 mobile:mx-auto ml-auto">
                <div className="relative w-[250px] h-[250px] mobile:w-[180px] mobile:h-[180px]">
                  <Image
                    src='/images/AIBE_corrected_bg 1.png'
                    alt='AIBE'
                    fill
                    className='object-contain'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
