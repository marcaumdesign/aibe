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
        <div className=" flex flex-col gap-16 items-center justify-start pt-[64px] mobile:pt-8 w-full">
          <div className="flex max-w-[1200px] px-8 mobile:px-4 flex-row mobile:flex-col gap-8 items-center justify-start w-full">
            {/* Left Column - Text Content */}
            <div className="flex flex-col gap-8 mobile:gap-6 items-start justify-start flex-1">
              {/* About AIBE Section */}
              <div className="flex flex-col gap-6 mobile:gap-4 items-start justify-start w-full">

                <h2 className="text-text-strong-950 text-title-h1 mobile:text-title-h3 w-full">
                  About AIBE
                </h2>
                <div className="text-text-sub-600 text-paragraph-lg mobile:text-paragraph-md">
                  <p>We are a bilateral, non-profit association registered in Italy. We facilitate research collaboration between Brazilian and Italian economists. We also promote links between academia, policy-makers and industry.</p>
                </div>
                <div className="text-text-sub-600 text-paragraph-lg mobile:text-paragraph-md">
                  <p>We are governed by a <Link href="/people" className="text-primary-base underline hover:opacity-80">Board of Directors</Link>, who are elected for three years by the Members&apos; Assembly.</p>
                </div>

                <Button.Root
                  asChild
                  variant="primary"
                  mode="filled"
                  size="medium"
                  className="mt-8"
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

              {/* In context Section */}

            </div>

            {/* Right Column - Image */}
            <div className="sticky top-[100px] w-full flex-1 min-w-[300px] h-[400px] mobile:h-[350px]">
              <Image
                src='/images/about-hero.png'
                alt='Brasil e Italia'
                fill
                className='object-cover'
              />
            </div>
          </div>

          {/* Download Button */}


          {/* Our Main Initiatives Section */}
          <div className="flex max-w-[1200px] flex-col gap-8 items-start w-full px-8 mobile:px-4">
            <div className="flex flex-col gap-6 mobile:gap-4 items-start justify-start w-full">
              <Badge variant='with-dot' size='medium'>
                Features
              </Badge>
              <h2 className="text-text-strong-950 text-title-h2 mobile:text-title-h4">
                AIBE Activities              </h2>
            </div>

            {/* Three Cards */}
            <div className="flex flex-row mobile:flex-col gap-4 items-stretch justify-center w-full">
              {/* Card 1 */}
              <div className="flex-1 bg-[#f3f3f3] border border-stroke-soft-200 flex flex-col gap-4 p-8 mobile:p-6">
                <div className="flex-shrink-0">
                  <RiGroup3Line className="w-8 h-8 mobile:w-7 mobile:h-7 text-primary-base" />
                </div>
                <h3 className="text-text-strong-950 text-title-h6 mobile:text-title-h6">
                  Organize an annual economics workshop.
                </h3>
              </div>

              {/* Card 2 */}
              <div className="flex-1 bg-[#f3f3f3] border border-stroke-soft-200 flex flex-col gap-4 p-8 mobile:p-6">
                <div className="flex-shrink-0">
                  <RiTrophyLine className="w-8 h-8 mobile:w-7 mobile:h-7 text-primary-base" />
                </div>
                <h3 className="text-text-strong-950 text-title-h6 mobile:text-title-h5">
                  Award an annual prize.
                </h3>
              </div>

              {/* Card 3 */}
              <div className="flex-1 bg-[#f3f3f3] border border-stroke-soft-200 flex flex-col gap-4 p-8 mobile:p-6">
                <div className="flex-shrink-0">
                  <RiMenuSearchLine className="w-8 h-8 mobile:w-7 mobile:h-7 text-primary-base" />
                </div>
                <h3 className="text-text-strong-950 text-title-h6 mobile:text-title-h5">
                  Disseminate information on joint research and funding opportunities.
                </h3>
              </div>
            </div>
          </div>

          {/* In context Section */}
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            {/* Container */}
            <div className="max-w-[1200px] bg-primary-alpha-10 p-8 mobile:p-4 w-full flex flex-col gap-4 items-center justify-center">


              <div className="flex flex-col items-start justify-center w-full  mobile:pt-4 gap-4">
                <Badge variant='with-dot' size='medium' color='gray'>
                  About AIBE
                </Badge>
                <h1 className="text-primary-base text-title-h1 mobile:text-title-h3 text-center">
                  In context
                </h1>
              </div>
              <div className="flex gap-8 items-center justify-center">



                <div className="flex flex-col gap-6 mobile:gap-4 items-start justify-start w-full">

                  <div className="flex flex-col gap-6 mobile:gap-4 w-full">

                    <div className="flex gap-4 mobile:gap-3 items-start">
                      <div className="flex-shrink-0 mt-1">
                        <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-text-strong-950" />
                      </div>
                      <div className="text-text-strong-950 text-paragraph-lg mobile:text-paragraph-md">
                        <p>Strong commercial, historical and cultural links between Italy and Brazil.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 mobile:gap-3 items-start">
                      <div className="flex-shrink-0 mt-1">
                        <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-text-strong-950" />
                      </div>
                      <div className="text-text-strong-950 text-paragraph-lg mobile:text-paragraph-md">
                        <p>A bilateral Agreement on Scientific and Technological Cooperation in force since December 1998.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 mobile:gap-3 items-start">
                      <div className="flex-shrink-0 mt-1">
                        <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-text-strong-950" />
                      </div>
                      <div className="text-text-strong-950 text-paragraph-lg mobile:text-paragraph-md">
                        <p>Joint calls for project funding.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 mobile:gap-3 items-start">
                      <div className="flex-shrink-0 mt-1">
                        <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-text-strong-950" />
                      </div>
                      <div className="text-text-strong-950 text-paragraph-lg mobile:text-paragraph-md">
                        <p>Fast-growing community of Brazilians in the Italian academic system.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 mobile:gap-3 items-start">
                      <div className="flex-shrink-0 mt-1">
                        <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-text-strong-950" />
                      </div>
                      <div className="text-text-strong-950 text-paragraph-lg mobile:text-paragraph-md">
                        <p>Growing number of co-authorships between Brazilian and Italian economists.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative w-[400px]  aspect-square mobile:w-[200px]  flex-shrink-0">
                  <Image
                    src='/images/brasil-italia-branco.png'
                    alt='AIBE Logo'
                    fill
                    className='object-contain'
                  />
                </div>


              </div>
            </div>
          </div>
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
