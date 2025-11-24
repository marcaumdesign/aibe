"use client";

import { RiCheckLine, RiTrophyLine, RiTeamLine, RiMapPinLine, RiSendPlaneLine, RiMenuSearchLine, RiGroup3Line } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import * as Button from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-start relative size-full">



      {/* Main Content Section - Two Columns */}
      <div className="flex flex-col items-center justify-center w-full ">
        <div className=" flex flex-col gap-16 lg:gap-16 md:gap-12 mobile:gap-8 items-center justify-start pt-[64px] md:pt-12 mobile:pt-8 w-full">
          <div className="flex max-w-[1200px] px-8 md:px-6 mobile:px-4 flex-row lg:flex-row md:flex-col mobile:flex-col gap-8 md:gap-6 items-center justify-start w-full">
            {/* Left Column - Text Content */}
            <div className="flex flex-col gap-20 mobile:gap-6 items-start justify-start flex-1 w-full">
              {/* About AIBE Section */}
              <div className="flex flex-col gap-6 md:gap-5 mobile:gap-4 items-start justify-start w-full">
                <div className="p-1 rounded-full text-label-sm text-text-white-0 bg-primary-base w-fit">Italian-Brazilian Association of Economics</div>
                <h1 className="text-text-strong-950 text-title-h1 lg:text-title-h1 md:text-title-h2 mobile:text-title-h3 w-full">
                  About AIBE
                </h1>
                <div className="text-text-sub-600 text-paragraph-lg md:text-paragraph-md mobile:text-paragraph-md">
                  <p>We are a bilateral, non-profit association registered in Italy. We facilitate research collaboration between Brazilian and Italian economists. We also promote links between academia, policy-makers and industry.</p>
                </div>
                <div className="text-text-sub-600 text-paragraph-lg md:text-paragraph-md mobile:text-paragraph-md">
                  <p>We are governed by a <Link href="/people" className="text-primary-base underline hover:opacity-80">Board of Directors</Link>, who are elected for three years by the Members&apos; Assembly.</p>
                </div>
              </div>

              {/* In context Section */}


              <Button.Root
                asChild
                variant="primary"
                mode="filled"
                size="medium"
                className="mt-8 md:mt-4 mobile:mt-4 w-full md:w-full lg:w-auto"
              >
                <Link
                  href="https://drive.google.com/file/d/1fAfZF52xDH3jCs1h3CNd3xD5t9mafUTo/view"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download the AIBE Constitution
                </Link>
              </Button.Root>
            </div>

            {/* Right Column - Image */}
            <div className="lg:sticky lg:top-[100px] w-full lg:w-[400px] lg:flex-1 lg:min-w-[400px] h-[400px] md:h-[450px] mobile:h-[300px] relative">
              <Image
                src='/images/hero-about-us-2.png'
                alt='Brasil e Italia'
                fill
                className='object-contain'
              />
              <div
                className='absolute z-10 block mobile:hidden'
                style={{
                  left: '80px',
                  top: '-20px'
                }}
              >
                <div className='relative w-16 h-16'>
                  <div className='absolute inset-0 rounded-full overflow-hidden z-[100]'>
                    <Image
                      src='/images/italy-flag.png'
                      alt='Italy Flag'
                      fill
                      className='object-cover'
                    />
                  </div>

                  <div className='absolute inset-0 rounded-full bg-blue-100 scale-125 animate-pulse-custom z-40'></div>

                  <div className='absolute inset-0 rounded-full bg-blue-50 scale-150 animate-pulse-custom-slow z-30'></div>
                </div>
              </div>


              <div
                className='absolute z-10 block mobile:hidden'
                style={{
                  right: '80px',
                  bottom: '-20px'
                }}
              >
                <div className='relative w-16 h-16'>
                  <div className='absolute inset-0 rounded-full overflow-hidden z-[100]'>
                    <Image
                      src='/images/brazil-flag.png'
                      alt='Brazil Flag'
                      fill
                      className='object-cover'
                    />
                  </div>

                  <div className='absolute inset-0 rounded-full bg-blue-100 scale-125 animate-pulse-custom z-40'></div>

                  <div className='absolute inset-0 rounded-full bg-blue-50 scale-150 animate-pulse-custom-slow z-30'></div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button */}

          <div className="w-full flex flex-col  bg-[#F3F8FF] gap-4 items-center justify-center">
            {/* Container */}
            <div className="max-w-[1200px]  p-8 md:p-6 mobile:p-4 w-full flex flex-col gap-8 items-center justify-center">


              <div className="flex flex-col items-start justify-center w-full mobile:pt-4 gap-8 md:gap-3">
                <Badge variant='with-dot' size='medium' color='gray'>
                  About AIBE
                </Badge>
                <h1 className="text-primary-base text-title-h1 lg:text-title-h1 md:text-title-h2 mobile:text-title-h3">
                  In context
                </h1>
              </div>
              <div className="flex lg:flex-row md:flex-col mobile:flex-col gap-8 md:gap-8 items-center justify-center">

                <div className="relative w-full lg:w-[300px] aspect-square flex-shrink-0">
                  <Image
                    src='/images/brasil-italia-branco.png'
                    alt='AIBE Logo'
                    fill
                    className='object-contain'
                  />
                </div>

                <div className="flex flex-col gap-6 md:gap-5 mobile:gap-4 items-start justify-start w-full">

                  <div className="flex flex-col gap-6 md:gap-5 mobile:gap-4 w-full">

                    <div className="flex gap-4 md:gap-3 mobile:gap-3 items-start">
                      <div className="flex-shrink-0 mt-1">
                        <RiCheckLine className="w-6 h-6 md:w-5 md:h-5 mobile:w-5 mobile:h-5 text-text-strong-950" />
                      </div>
                      <div className="text-text-strong-950 text-paragraph-lg md:text-paragraph-md mobile:text-paragraph-md">
                        <p>Strong commercial, historical and cultural links between Italy and Brazil.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 md:gap-3 mobile:gap-3 items-start">
                      <div className="flex-shrink-0 mt-1">
                        <RiCheckLine className="w-6 h-6 md:w-5 md:h-5 mobile:w-5 mobile:h-5 text-text-strong-950" />
                      </div>
                      <div className="text-text-strong-950 text-paragraph-lg md:text-paragraph-md mobile:text-paragraph-md">
                        <p>A bilateral Agreement on Scientific and Technological Cooperation in force since December 1998.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 md:gap-3 mobile:gap-3 items-start">
                      <div className="flex-shrink-0 mt-1">
                        <RiCheckLine className="w-6 h-6 md:w-5 md:h-5 mobile:w-5 mobile:h-5 text-text-strong-950" />
                      </div>
                      <div className="text-text-strong-950 text-paragraph-lg md:text-paragraph-md mobile:text-paragraph-md">
                        <p>Joint calls for project funding.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 md:gap-3 mobile:gap-3 items-start">
                      <div className="flex-shrink-0 mt-1">
                        <RiCheckLine className="w-6 h-6 md:w-5 md:h-5 mobile:w-5 mobile:h-5 text-text-strong-950" />
                      </div>
                      <div className="text-text-strong-950 text-paragraph-lg md:text-paragraph-md mobile:text-paragraph-md">
                        <p>Fast-growing community of Brazilians in the Italian academic system.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 md:gap-3 mobile:gap-3 items-start">
                      <div className="flex-shrink-0 mt-1">
                        <RiCheckLine className="w-6 h-6 md:w-5 md:h-5 mobile:w-5 mobile:h-5 text-text-strong-950" />
                      </div>
                      <div className="text-text-strong-950 text-paragraph-lg md:text-paragraph-md mobile:text-paragraph-md">
                        <p>Growing number of co-authorships between Brazilian and Italian economists.</p>
                      </div>
                    </div>
                  </div>
                </div>



              </div>
            </div>
          </div>

          {/* Our Main Initiatives Section */}
          <div className="flex max-w-[1200px] flex-col gap-8 md:gap-6 items-start w-full px-8 md:px-6 mobile:px-4">
            <div className="flex flex-col gap-6 md:gap-5 mobile:gap-4 items-start justify-start w-full">
              <Badge variant='with-dot' size='medium'>
                Features
              </Badge>
              <h2 className="text-primary-base text-title-h2 lg:text-title-h2 md:text-title-h3 mobile:text-title-h4">
                AIBE Activities              </h2>
            </div>

            {/* Three Cards */}
            <div className="flex flex-row lg:flex-row md:flex-col mobile:flex-col gap-4 items-stretch justify-center w-full">
              {/* Card 1 */}
              <div className="flex-1 bg-[#F3F8FF] flex flex-col gap-4 p-8 md:p-6 mobile:p-6">
                <div className="flex-shrink-0">
                  <RiGroup3Line className="w-8 h-8 md:w-7 md:h-7 mobile:w-7 mobile:h-7 text-primary-base" />
                </div>
                <h6 className="text-text-strong-950 text-title-h6 mobile:text-paragraph-lg">
                  Annual workshop
                </h6>
                <p>We organize an anual academic event held alternately in both countries.</p>
              </div>

              {/* Card 2 */}
              <div className="flex-1 bg-[#F3F8FF] flex flex-col gap-4 p-8 md:p-6 mobile:p-6">
                <div className="flex-shrink-0">
                  <RiTrophyLine className="w-8 h-8 md:w-7 md:h-7 mobile:w-7 mobile:h-7 text-primary-base" />
                </div>
                <h6 className="text-text-strong-950 text-title-h6 mobile:text-paragraph-lg">
                  Best paper prize
                </h6>
                <p>We award a prize in honor of the economist Giorgio Mortara.</p>
              </div>

              {/* Card 3 */}
              <div className="flex-1 bg-[#F3F8FF]  flex flex-col gap-4 p-8 md:p-6 mobile:p-6">
                <div className="flex-shrink-0">
                  <RiMenuSearchLine className="w-8 h-8 md:w-7 md:h-7 mobile:w-7 mobile:h-7 text-primary-base" />
                </div>
                <h6 className="text-text-strong-950 text-title-h6 mobile:text-paragraph-lg">
                  Disseminate information
                </h6>
                <p>We facilitate the spread of information and promote academic mobility.</p>
              </div>
            </div>
          </div>

          {/* In context Section */}

        </div>



        {/* <div className="flex flex-row mobile:flex-col gap-[300px] mobile:gap-8 items-center justify-center w-full mt-24 mobile:mt-16">
   
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="text-title-h0 mobile:text-title-h1 text-primary-base font-bold">
                {count9}
              </div>
              <div className="text-label-xl text-black text-center font-bold tracking-tight whitespace-nowrap">
                Board Members
              </div>
            </div>

       
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="text-title-h0 mobile:text-title-h1 text-primary-base font-bold">
                1
              </div>
              <div className="text-label-xl text-black text-center font-bold tracking-tight whitespace-nowrap">
                Workshop per Year
              </div>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="text-title-h0 mobile:text-title-h1 text-primary-base font-bold">
                {count40}+
              </div>
              <div className="text-label-xl text-black text-center font-bold tracking-tight whitespace-nowrap">
                Active Members
              </div>
            </div>
          </div> */}

      </div>
    </div>




  );
}