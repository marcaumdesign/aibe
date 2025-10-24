"use client";

import { RiCheckLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { Root as Button } from "@/components/ui/button";
import CTA from "@/components/cta";

export default function About() {

  return (
    <div className="flex flex-col gap-[64px] items-center justify-start relative size-full">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-start w-full">
        {/* Hero Text Content */}
        <div className="flex flex-col gap-8 items-center p-8 mobile:p-4 justify-start max-w-[1200px] w-full pt-[32px] mobile:pt-4">
          <div className="flex flex-col gap-4 items-center justify-start w-full">
            <div className="flex gap-[2px] items-center justify-center overflow-clip px-[8px] py-[2px] relative shrink-0">
              <div className="font-medium not-italic text-[#99a0ae] text-[12px] text-nowrap tracking-[0.48px] uppercase">
                <p className="leading-4 whitespace-pre">About</p>
              </div>
            </div>
            <h1 className="text-title-h1 text-black text-center max-w-[648px]">
              Science across borders, excellence in cooperation
            </h1>
          </div>
        </div>

        {/* Hero Image - Full Width */}
        <div
          className="bg-center bg-cover bg-no-repeat h-[350px] mobile:h-[250px] shrink-0 w-full"
          style={{ backgroundImage: `url('/images/brazil-italy.png')` }}
        />
      </div>

      {/* At a glance Section */}
      <div className="flex flex-col items-center justify-center w-full bg-[#f3f8ff]">
        <div className="flex flex-col gap-16 items-center justify-start max-w-[1200px] p-8 mobile:p-4 w-full">
          <h2 className="text-title-h2 mobile:text-title-h4 text-black text-center w-full">
            At a glance
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
              <div className="flex flex-col gap-6 mobile:gap-4 w-full">
                {/* Item 1 */}
                <div className="flex gap-4 mobile:gap-3 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-black" />
                  </div>
                  <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                    <p>Organize an annual economics workshop.</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-4 mobile:gap-3 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-black" />
                  </div>
                  <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                    <p>Award an annual prize.</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-4 mobile:gap-3 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-black" />
                  </div>
                  <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                    <p>Disseminate information on joint research and funding opportunities.</p>
                  </div>
                </div>
              </div>

              {/* Parágrafo de governança */}
              <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                <p>We are governed by a <Link href="/people" className="text-primary-base underline hover:opacity-80">Board of Directors</Link>, who are elected for three years by the Members' Assembly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* In context Section */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col gap-16 items-center justify-start max-w-[1200px] p-8 mobile:p-4 w-full">
          <div className="flex flex-row mobile:flex-col gap-8 items-start justify-start overflow-clip relative  w-full">
            <div className="flex flex-col gap-8 max-w-[600px] items-start justify-start">
              <div className="flex flex-col gap-6 mobile:gap-4 items-start justify-start not-italic w-full">
                <h2 className="text-title-h4 mobile:text-title-h5 text-black w-full">
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
            <div className="relative w-full min-w-[300px] h-[500px]">
              <Image
                src='/images/brasil-italia.png'
                alt='Brasil e Italia'
                fill
                className='object-contain'
              />
            </div>


          </div>
          <a
            href="https://drive.google.com/file/d/1fAfZF52xDH3jCs1h3CNd3xD5t9mafUTo/view"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#122368] flex gap-[4px] items-center justify-center overflow-clip p-[10px] relative shrink-0 hover:opacity-80 transition-opacity cursor-pointer mobile:mt-[-40px] mobile:mb-[40px]"
          >
            <div className="flex items-center justify-center px-[4px] py-0 relative shrink-0">
              <div className="font-medium not-italic text-[18px] text-center text-nowrap text-white tracking-[-0.54px]">
                <p className="leading-[24px] whitespace-pre">Download the Constitution</p>
              </div>
            </div>
          </a>
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
                  Join and Strengthen Academic Cooperation
                </h2>
                <div className="font-normal text-[#cacfd8] text-[18px] tracking-[-0.36px] w-[661.628px]">
                  <p className="leading-[24px]">By joining, you will engage with researchers, access unique opportunities, and support initiatives that unite Brazil and Italy in economic research.</p>
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

    </div>
  );
}
