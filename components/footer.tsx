import { RiLinkedinFill, RiTwitterXFill, RiBlueskyFill } from "@remixicon/react";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="relative overflow-visible bg-primary-base w-full mt-0 mobile:mt-0">
      {/* Top solid blue overlay to cover the previous section edge */}

      <div className="max-w-[1200px] mx-auto px-8 mobile:px-4 pt-0 mobile:pt-0 pb-16 mobile:pb-8">
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
              <p className="text-text-white-0 text-paragraph-md max-w-sm">
                Associazione Italo-Brasiliana di Economia
              </p>
              <p className="text-text-white-0 text-paragraph-md max-w-sm">
                Associação Italo-Brasileira de Economia
              </p>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 items-center">
              <Link
                href="https://www.linkedin.com/in/associazione-italo-brasiliana-di-economia-aibe-6700b3356/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-10 rounded-lg border border-white/20 hover:border-white hover:bg-white/10 transition-all group"
              >
                <RiLinkedinFill className="size-5 text-text-white-0 transition-colors" />
              </Link>
              <Link
                href="https://x.com/econ_aibe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-10 rounded-lg border border-white/20 hover:border-white hover:bg-white/10 transition-all group"
              >
                <RiTwitterXFill className="size-5 text-text-white-0 transition-colors" />
              </Link>
              <Link
                href="https://bsky.app/profile/econaibe.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center size-10 rounded-lg border border-white/20 hover:border-white hover:bg-white/10 transition-all group"
              >
                <RiBlueskyFill className="size-5 text-text-white-0 transition-colors" />
              </Link>
            </div>


          </div>

          {/* Navigation Links - 3 columns on desktop */}
          {/* About Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-text-white-0 text-title-h6 font-semibold">About</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/about" className="text-text-white-0 text-paragraph-md hover:opacity-80 transition-opacity">
                About AIBE
              </Link>

              <Link href="/people" className="text-text-white-0 text-paragraph-md hover:opacity-80 transition-opacity">
                People
              </Link>
            </nav>
          </div>

          {/* Events & Prizes Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-text-white-0 text-title-h6 font-semibold">Events & Prizes</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/workshops" className="text-text-white-0 text-paragraph-md hover:opacity-80 transition-opacity">
                Workshops
              </Link>
              <Link href="/prizes" className="text-text-white-0 text-paragraph-md hover:opacity-80 transition-opacity">
                Prizes
              </Link>

            </nav>
          </div>

          {/* Resources & Contact Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-text-white-0 text-title-h6 font-semibold">Resources</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/posts" className="text-text-white-0 text-paragraph-md hover:opacity-80 transition-opacity">
                Blog
              </Link>
              <Link href="/create-account" className="text-text-white-0 text-paragraph-md hover:opacity-80 transition-opacity">
                Membership
              </Link>
              <Link href="/contact" className="text-text-white-0 text-paragraph-md hover:opacity-80 transition-opacity">
                Contact & Offices
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-white-0 text-paragraph-xs text-center md:text-left">
            © {new Date().getFullYear()} AIBE. All Rights Reserved | Codice Fiscale: 97970970154 | <a
              href="mailto:aibe@aibe.website"
              className="text-text-white-0 hover:opacity-80 transition-opacity text-paragraph-xs font-medium"
            >
              aibe@aibe.website
            </a>
          </p>

          <div className="flex gap-2 items-center text-paragraph-xs">
            <Link
              href="https://drive.google.com/file/d/1gLCkT2krsT5EV0zpgf9zJbqKC9s9BOde/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-white-0 hover:opacity-80 transition-opacity text-paragraph-xs"
            >
              Privacy Policy
            </Link>
            <span className="text-text-white-0 text-paragraph-xs">|</span>
            <Link
              href="https://drive.google.com/file/d/1WJCNNvmG12FIoG5XB-6ESONO47ubd27B/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-white-0 hover:opacity-80 transition-opacity text-paragraph-xs"
            >
              Cookie Policy
            </Link>
            <span className="text-text-white-0 text-paragraph-xs">|</span>
            <Link
              href="https://mainnet.design"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-white-0 hover:opacity-80 transition-opacity text-paragraph-xs"
            >
              Powered by Mainnet™
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}