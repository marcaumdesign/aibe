import { RiLinkedinFill, RiTwitterXFill, RiBlueskyFill } from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-primary-base box-border flex flex-col gap-[50px] mobile:gap-8 items-center justify-start px-[32px] mobile:px-4 py-[32px] mobile:py-8 relative shrink-0 w-full">
      <div className="flex gap-[64px] mobile:gap-8 mobile:flex-col items-start justify-start max-w-[1200px] relative shrink-0 w-full">
        {/* Logo and Social Media */}
        <div className="flex flex-col -gap-2 items-start mobile:items-center justify-center relative shrink-0 w-[300px] mobile:w-full">
          <div className="flex items-center justify-start mobile:justify-center leading-[0] relative shrink-0">
            <div className="relative h-[62px] mobile:h-[50px] w-[150px]">
              <Image alt="AIBE Logo" fill className="object-contain" src="/images/logo branca.svg" />
            </div>
          </div>
          <div className="flex gap-[8px] items-start mobile:items-center justify-start mobile:justify-center relative shrink-0">
            <a href="https://linkedin.com/company/aibe" target="_blank" rel="noopener noreferrer" className="box-border flex gap-[2px] items-center justify-center overflow-clip p-[2px] relative rounded-[6px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative shrink-0 size-[20px]">
                <RiLinkedinFill className="w-full h-full text-white" />
              </div>
            </a>
            <a href="https://x.com/aibe" target="_blank" rel="noopener noreferrer" className="box-border flex gap-[2px] items-center justify-center overflow-clip p-[2px] relative rounded-[6px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative shrink-0 size-[20px]">
                <RiTwitterXFill className="w-full h-full text-white" />
              </div>
            </a>
            <a href="https://bsky.app/profile/aibe" target="_blank" rel="noopener noreferrer" className="box-border flex gap-[2px] items-center justify-center overflow-clip p-[2px] relative rounded-[6px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative shrink-0 size-[20px]">
                <RiBlueskyFill className="w-full h-full text-white" />
              </div>
            </a>
          </div>
          <a href="mailto:aibe@aibe.website" className="text-text-white-0 text-paragraph-md hover:text-gray-400 transition-colors mobile:text-center mt-3">
            aibe@aibe.website
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-[32px] flex-wrap items-start justify-start">
          {/* Home Column */}
          <div className="flex flex-col gap-[16px] items-start w-fit">
            <p className="text-text-soft-400 text-subheading-xs uppercase">Home</p>
            <div className="flex flex-col gap-[4px] items-start">
              <Link href="/#features" className="hover:text-gray-400 transition-colors">
                <p className="text-text-white-0 text-paragraph-md">Features</p>
              </Link>
              <Link href="/about" className="hover:text-gray-400 transition-colors">
                <p className="text-text-white-0 text-paragraph-md">About Us</p>
              </Link>
              <Link href="/events" className="hover:text-gray-400 transition-colors">
                <p className="text-text-white-0 text-paragraph-md">AIBE Workshop</p>
              </Link>
              <Link href="/events#giorgio-mortara" className="hover:text-gray-400 transition-colors">
                <p className="text-text-white-0 text-paragraph-md">Giorgio Mortara</p>
              </Link>
              <Link href="/blog/" className="hover:text-gray-400 transition-colors">
                <p className="text-text-white-0 text-paragraph-md">Blog</p>
              </Link>
            </div>
          </div>

          {/* About Us Column */}
          <div className="flex flex-col gap-[16px] items-start w-fit">
            <p className="text-text-soft-400 text-subheading-xs uppercase">about us</p>
            <div className="flex flex-col gap-[4px] items-start">
              <Link href="/about" className="hover:text-gray-400 transition-colors">
                <p className="text-text-white-0 text-paragraph-md">About AIBE</p>
              </Link>
              <Link href="/about#context" className="hover:text-gray-400 transition-colors">
                <p className="text-text-white-0 text-paragraph-md">AIBE in Context</p>
              </Link>
              <Link href="/about/team" className="hover:text-gray-400 transition-colors">
                <p className="text-text-white-0 text-paragraph-md">Team</p>
              </Link>
            </div>
          </div>

          {/* Events & Prizes Column */}
          <div className="flex flex-col gap-[16px] items-start w-fit">
            <p className="text-text-soft-400 text-subheading-xs uppercase">Events & prizes</p>
            <div className="flex flex-col gap-[4px] items-start">
              <Link href="/events" className="hover:text-gray-400 transition-colors">
                <p className="text-text-white-0 text-paragraph-md">AIBE Workshop</p>
              </Link>
              <Link href="/events#giorgio-mortara" className="hover:text-gray-400 transition-colors">
                <p className="text-text-white-0 text-paragraph-md">Giorgio Mortara</p>
              </Link>
            </div>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col gap-[16px] items-start w-fit">
            <p className="text-text-soft-400 text-subheading-xs uppercase">resources</p>
            <div className="flex flex-col gap-[4px] items-start">
              <Link href="/blog/" className="hover:text-gray-400 transition-colors">
                <p className="text-text-white-0 text-paragraph-md">Blog</p>
              </Link>
            </div>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-[16px] items-start w-fit">
            <p className="text-text-soft-400 text-subheading-xs uppercase">Contact</p>
            <div className="flex flex-col gap-[4px] items-start">
              <Link href="/membership" className="hover:text-gray-400 transition-colors">
                <p className="text-text-white-0 text-paragraph-md">Membership</p>
              </Link>
              <Link href="/contact" className="hover:text-gray-400 transition-colors">
                <p className="text-text-white-0 text-paragraph-md">Offices</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex items-center justify-between mobile:flex-col mobile:gap-4 max-w-[1200px] relative shrink-0 w-full">
        <p className="text-center text-white">Copyright @2024 AIBE. All Rights Reserved | Codice Fiscale: 97970970154</p>
        <div className="flex gap-4 items-center">
          <a href="https://www.iubenda.com/privacy-policy/33428132/cookie-policy" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
            Cookie Policy
          </a>
          <span className="text-white">|</span>
          <a href="https://www.iubenda.com/privacy-policy/33428132" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
            Privacy
          </a>
        </div>
      </div>
    </div>
  )
}