"use client";

import { RiCheckLine, RiTrophyLine, RiTeamLine, RiMapPinLine, RiSendPlaneLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
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
          About Us
        </h1>
      </div>

      {/* Main Content Section - Two Columns */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col gap-16 items-center justify-start max-w-[1200px] p-8 mobile:p-4 pt-[64px] mobile:pt-8 w-full">
          <div className="flex flex-row mobile:flex-col gap-8 items-center justify-start w-full">
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
                  <p>We are governed by a <Link href="/people" className="text-primary-base underline hover:opacity-80">Board of Directors</Link>, who are elected for three years by the Members&apos; Assembly.</p>
                </div>
              </div>

              {/* In context Section */}
              {/* <div className="flex flex-col gap-6 mobile:gap-4 items-start justify-start w-full">
                <h2 className="text-title-h4 mobile:text-title-h5 text-black w-full font-bold">
                  In context
                </h2>


                <div className="flex flex-col gap-6 mobile:gap-4 w-full">
 
                  <div className="flex gap-4 mobile:gap-3 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-black" />
                    </div>
                    <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                      <p>Strong commercial, historical and cultural links between Italy and Brazil.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mobile:gap-3 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-black" />
                    </div>
                    <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                      <p>A bilateral Agreement on Scientific and Technological Cooperation in force since December 1998.</p>
                    </div>
                  </div>

                
                  <div className="flex gap-4 mobile:gap-3 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-black" />
                    </div>
                    <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                      <p>Joint calls for project funding.</p>
                    </div>
                  </div>

              
                  <div className="flex gap-4 mobile:gap-3 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-black" />
                    </div>
                    <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                      <p>Fast-growing community of Brazilians in the Italian academic system.</p>
                    </div>
                  </div>

                
                  <div className="flex gap-4 mobile:gap-3 items-start">
                    <div className="flex-shrink-0 mt-1">
                      <RiCheckLine className="w-6 h-6 mobile:w-5 mobile:h-5 text-black" />
                    </div>
                    <div className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                      <p>Growing number of co-authorships between Brazilian and Italian economists.</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Right Column - Image */}
            <div className="sticky top-[100px] w-full flex-1 min-w-[300px] h-[400px] mobile:h-[350px]">
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

          {/* Our Main Initiatives Section */}
          <div className="flex flex-col gap-8 items-start w-full mt-16 mobile:mt-12">
            <div className="flex flex-col gap-6 mobile:gap-4 items-start justify-start w-full">
              <div className="flex gap-[2px] items-center justify-start overflow-clip px-[8px] py-[2px]">
                <div className="font-medium not-italic text-[#99a0ae] text-[12px] text-nowrap tracking-[0.48px] uppercase">
                  <p className="leading-4 whitespace-pre">Features</p>
                </div>
              </div>
              <h2 className="text-title-h2 mobile:text-title-h4 text-black">
                Our Main Initiatives
              </h2>
            </div>

            {/* Three Cards */}
            <div className="flex flex-row mobile:flex-col gap-4 items-stretch justify-center w-full">
              {/* Card 1 - Academic Mobility */}
              <div className="flex-1 bg-[#f3f3f3] border border-stroke-soft-200 flex flex-col gap-4 p-8 mobile:p-6">
                <div className="flex-shrink-0">
                  <RiMapPinLine className="w-8 h-8 mobile:w-7 mobile:h-7 text-primary-base" />
                </div>
                <h3 className="text-title-h4 mobile:text-title-h5 text-black">
                  Academic Mobility
                </h3>
                <p className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                  Encouraging the exchange of researchers, faculty, and students between Brazil and Italy.
                </p>
              </div>

              {/* Card 2 - Events and Awards */}
              <div className="flex-1 bg-[#f3f3f3] border border-stroke-soft-200 flex flex-col gap-4 p-8 mobile:p-6">
                <div className="flex-shrink-0">
                  <RiTrophyLine className="w-8 h-8 mobile:w-7 mobile:h-7 text-primary-base" />
                </div>
                <h3 className="text-title-h4 mobile:text-title-h5 text-black">
                  Events and Awards
                </h3>
                <p className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                  Annual workshops and the Giorgio Mortara Prize strengthen scientific cooperation.
                </p>
              </div>

              {/* Card 3 - Research Sharing */}
              <div className="flex-1 bg-[#f3f3f3] border border-stroke-soft-200 flex flex-col gap-4 p-8 mobile:p-6">
                <div className="flex-shrink-0">
                  <RiSendPlaneLine className="w-8 h-8 mobile:w-7 mobile:h-7 text-primary-base" />
                </div>
                <h3 className="text-title-h4 mobile:text-title-h5 text-black">
                  Research Sharing
                </h3>
                <p className="text-paragraph-lg mobile:text-paragraph-md text-text-sub-600">
                  Newsletters, publications, and research opportunities for the academic community.
                </p>
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


    </div>
  );
}
