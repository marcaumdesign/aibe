import { RiLinkedinFill, RiTwitterXFill, RiBlueskyFill } from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary-base w-full">
      <div className="max-w-[1200px] mx-auto px-8 mobile:px-4 py-16 mobile:py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mobile:gap-8 mb-12">
          {/* Logo and Social Media - Takes 2 columns on desktop */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo branca.svg"
                alt="AIBE Logo"
                width={150}
                height={56}
                className="h-14 w-auto"
              />
            </Link>

            <div className="flex flex-col gap-2">
              <p className="text-white text-base max-w-sm">
                Associazione Italo-Brasiliana di Economia
              </p>
              <p className="text-white text-base max-w-sm">
                Associação Italo-Brasileira de Economia
              </p>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 items-center">
              <a
                href="https://linkedin.com/company/aibe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-10 rounded-lg border border-white/20 hover:border-white hover:bg-white/10 transition-all group"
              >
                <RiLinkedinFill className="size-5 text-white transition-colors" />
              </a>
              <a
                href="https://x.com/aibe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-10 rounded-lg border border-white/20 hover:border-white hover:bg-white/10 transition-all group"
              >
                <RiTwitterXFill className="size-5 text-white transition-colors" />
              </a>
              <a
                href="https://bsky.app/profile/aibe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-10 rounded-lg border border-white/20 hover:border-white hover:bg-white/10 transition-all group"
              >
                <RiBlueskyFill className="size-5 text-white transition-colors" />
              </a>
            </div>

          </div>

          {/* Navigation Links - 3 columns on desktop */}
          {/* About Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-white text-lg">About</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/about" className="text-white/90 hover:text-white transition-colors text-base">
                About AIBE
              </Link>
              <Link href="/about#context" className="text-white/90 hover:text-white transition-colors text-base">
                AIBE in Context
              </Link>
              <Link href="/about/team" className="text-white/90 hover:text-white transition-colors text-base">
                Team
              </Link>
              <Link href="/people" className="text-white/90 hover:text-white transition-colors text-base">
                People
              </Link>
            </nav>
          </div>

          {/* Events & Prizes Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-white text-lg">Events & Prizes</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/workshop" className="text-white/90 hover:text-white transition-colors text-base">
                AIBE Workshop 2025
              </Link>
              <Link href="/events/workshop2024" className="text-white/90 hover:text-white transition-colors text-base">
                AIBE Workshop 2024
              </Link>
              <Link href="/events" className="text-white/90 hover:text-white transition-colors text-base">
                Last Events
              </Link>
              <Link href="/prizes" className="text-white/90 hover:text-white transition-colors text-base">
                Giorgio Mortara Prize
              </Link>
            </nav>
          </div>

          {/* Resources & Contact Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-white text-lg">Resources</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/blog" className="text-white/90 hover:text-white transition-colors text-base">
                Blog
              </Link>
              <Link href="/membership" className="text-white/90 hover:text-white transition-colors text-base">
                Membership
              </Link>
              <Link href="/contact" className="text-white/90 hover:text-white transition-colors text-base">
                Contact & Offices
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white text-sm text-center md:text-left">
            © {new Date().getFullYear()} AIBE. All Rights Reserved | Codice Fiscale: 97970970154
          </p>


          <div className="flex gap-6 items-center text-sm">
            <a
              href="mailto:aibe@aibe.website"
              className="text-white hover:text-gray-300 transition-colors text-base font-medium"
            >
              aibe@aibe.website

            </a>
            <span className="text-white/50">|</span>
            <a
              href="https://www.iubenda.com/privacy-policy/33428132/cookie-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Cookie Policy
            </a>
            <span className="text-white/50">|</span>
            <a
              href="https://www.iubenda.com/privacy-policy/33428132"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}