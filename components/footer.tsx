import { RiLinkedinFill, RiTwitterXFill, RiBlueskyFill } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-primary-base box-border content-stretch flex flex-col gap-[50px] items-center justify-start  px-[32px] py-[32px] relative shrink-0 w-full">
      <div className="content-stretch flex gap-[64px] items-start justify-start max-w-[1200px] relative shrink-0 w-full">
        {/* Logo and Social Media */}
        <div className="content-stretch flex flex-col -gap-2 items-start justify-center relative shrink-0 w-[300px]">
          <div className="content-stretch flex items-center justify-start leading-[0] relative shrink-0">
            <div className="relative h-[62px] w-[113px]">
              <Image alt="AIBE Logo" fill className="object-contain" src="/images/logo branca.svg" />
            </div>
          </div>
          <div className="content-stretch flex gap-[8px] items-start justify-start relative shrink-0">
            <a href="https://linkedin.com/company/aibe" target="_blank" rel="noopener noreferrer" className="box-border content-stretch flex gap-[2px] items-center justify-center overflow-clip p-[2px] relative rounded-[6px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative shrink-0 size-[20px]">
                <RiLinkedinFill className="w-full h-full text-white" />
              </div>
            </a>
            <a href="https://x.com/aibe" target="_blank" rel="noopener noreferrer" className="box-border content-stretch flex gap-[2px] items-center justify-center overflow-clip p-[2px] relative rounded-[6px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative shrink-0 size-[20px]">
                <RiTwitterXFill className="w-full h-full text-white" />
              </div>
            </a>
            <a href="https://bsky.app/profile/aibe" target="_blank" rel="noopener noreferrer" className="box-border content-stretch flex gap-[2px] items-center justify-center overflow-clip p-[2px] relative rounded-[6px] shrink-0 hover:bg-white/10 transition-colors">
              <div className="overflow-clip relative shrink-0 size-[20px]">
                <RiBlueskyFill className="w-full h-full text-white" />
              </div>
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="basis-0 content-stretch flex gap-[32px] grow items-start justify-end min-h-px min-w-px relative shrink-0">
          {/* Home Column */}
          <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0">
            <div className="font-medium leading-[0] not-italic relative shrink-0 text-[#cacfd8] text-[12px] tracking-[0.48px] uppercase w-full">
              <p className="leading-[16px]">Home</p>
            </div>
            <div className="content-stretch flex flex-col font-normal gap-[4px] items-start justify-start leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.32px] w-full">
              <Link href="/#features" className="relative shrink-0 hover:text-[#cacfd8] transition-colors">
                <p className="leading-[24px] text-nowrap whitespace-pre">Features</p>
              </Link>
              <Link href="/about" className="relative shrink-0 hover:text-[#cacfd8] transition-colors">
                <p className="leading-[24px] text-nowrap whitespace-pre">About Us</p>
              </Link>
              <Link href="/events" className="relative shrink-0 hover:text-[#cacfd8] transition-colors">
                <p className="leading-[24px] text-nowrap whitespace-pre">AIBE Workshop</p>
              </Link>
              <Link href="/events#giorgio-mortara" className="relative shrink-0 hover:text-[#cacfd8] transition-colors">
                <p className="leading-[24px] text-nowrap whitespace-pre">Giorgio Mortara</p>
              </Link>
              <Link href="/blog" className="relative shrink-0 hover:text-[#cacfd8] transition-colors">
                <p className="leading-[24px] text-nowrap whitespace-pre">Blog</p>
              </Link>
            </div>
          </div>

          {/* About Us Column */}
          <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0">
            <div className="font-medium leading-[0] min-w-full not-italic relative shrink-0 text-[#cacfd8] text-[12px] tracking-[0.48px] uppercase">
              <p className="leading-[16px]">about us</p>
            </div>
            <div className="content-stretch flex flex-col font-normal gap-[4px] h-[136px] items-start justify-start leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.32px]">
              <Link href="/about" className="relative shrink-0 hover:text-[#cacfd8] transition-colors">
                <p className="leading-[24px] text-nowrap whitespace-pre">About AIBE</p>
              </Link>
              <Link href="/about#context" className="relative shrink-0 hover:text-[#cacfd8] transition-colors">
                <p className="leading-[24px] text-nowrap whitespace-pre">AIBE in Context</p>
              </Link>
              <Link href="/about/team" className="relative shrink-0 hover:text-[#cacfd8] transition-colors">
                <p className="leading-[24px] text-nowrap whitespace-pre">Team</p>
              </Link>
            </div>
          </div>

          {/* Events & Prizes Column */}
          <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0">
            <div className="font-medium leading-[0] not-italic relative shrink-0 text-[#cacfd8] text-[12px] text-nowrap tracking-[0.48px] uppercase">
              <p className="leading-[16px] whitespace-pre">{`Events & prizes`}</p>
            </div>
            <div className="content-stretch flex flex-col font-normal gap-[4px] items-start justify-start leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.32px] w-full">
              <Link href="/events" className="relative shrink-0 hover:text-[#cacfd8] transition-colors">
                <p className="leading-[24px] text-nowrap whitespace-pre">AIBE Workshop</p>
              </Link>
              <Link href="/events#giorgio-mortara" className="relative shrink-0 hover:text-[#cacfd8] transition-colors">
                <p className="leading-[24px] text-nowrap whitespace-pre">Giorgio Mortara</p>
              </Link>
            </div>
          </div>

          {/* Resources Column */}
          <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0">
            <div className="font-medium leading-[0] not-italic relative shrink-0 text-[#cacfd8] text-[12px] tracking-[0.48px] uppercase w-full">
              <p className="leading-[16px]">resources</p>
            </div>
            <div className="content-stretch flex flex-col gap-[4px] h-[134px] items-start justify-start relative shrink-0 w-full">
              <Link href="/blog" className="font-normal leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.32px] hover:text-[#cacfd8] transition-colors">
                <p className="leading-[24px] whitespace-pre">Blog</p>
              </Link>
            </div>
          </div>

          {/* Contact Column */}
          <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0">
            <div className="font-medium leading-[0] not-italic relative shrink-0 text-[#cacfd8] text-[12px] tracking-[0.48px] uppercase w-full">
              <p className="leading-[16px]">Contact</p>
            </div>
            <div className="content-stretch flex flex-col font-normal gap-[4px] h-[134px] items-start justify-start leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.32px] w-full">
              <Link href="/membership" className="relative shrink-0 hover:text-[#cacfd8] transition-colors">
                <p className="leading-[24px] text-nowrap whitespace-pre">Membership</p>
              </Link>
              <Link href="/contact" className="relative shrink-0 hover:text-[#cacfd8] transition-colors">
                <p className="leading-[24px] text-nowrap whitespace-pre">Offices</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="content-stretch flex items-center justify-between max-w-[1200px] relative shrink-0 w-full">
        <div className="basis-0 font-medium grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white tracking-[-0.32px]">
          <p className="leading-[24px]">Copyright @2024 AIBE. All Rights Reserved</p>
        </div>
      </div>
    </div>
  )
}