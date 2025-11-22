"use client";

import {
  RiLinkedinFill,
  RiNewsLine,
  RiSmartphoneLine,
  RiTwitterXFill,
} from "@remixicon/react";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as Label from "@/components/ui/label";
import { Root as Checkbox } from "@/components/ui/checkbox";
import { Root as Button } from "@/components/ui/button";
import { Root as Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Badge } from '@/components/ui/badge';
export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    privacyPolicy: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      privacyPolicy: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Stay Connected Section */}
      <section className="py-16 px-8 mobile:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-12 items-start">
            {/* Left side - Content */}
            <div className="space-y-3 sticky top-24 mobile:static">
              <div className="space-y-10">
                <Badge variant='with-dot' size='medium'>
                  CONTACT US
                </Badge>
                <h1 className="text-primary-base text-title-h1">
                  Stay Connected!
                </h1>
              </div>
              <p className="text-text-sub-600 text-paragraph-md max-w-md">
                Reach out to us for questions about events, research opportunities, or becoming a member.
              </p>
            </div>

            {/* Right side - Contact Form */}
            <div className="w-full max-w-md">
              <Card className="w-full shadow-lg border-0">
                <form onSubmit={handleSubmit}>
                  <CardContent className="grid gap-6 mobile:gap-4 pt-6">
                    <div className="grid grid-cols-2 mobile:grid-cols-1 gap-4">
                      <div className="grid gap-2">
                        <Label.Root htmlFor="firstName" className="text-label-sm text-text-strong-950">
                          First Name
                        </Label.Root>
                        <Input
                          id="firstName"
                          type="text"
                          name="firstName"
                          placeholder="Jane"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="h-12 mobile:h-10 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label.Root htmlFor="lastName" className="text-label-sm text-text-strong-950">
                          Last Name
                        </Label.Root>
                        <Input
                          id="lastName"
                          type="text"
                          name="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="h-12 mobile:h-10 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label.Root htmlFor="email" className="text-label-sm text-text-strong-950">
                        Email
                      </Label.Root>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@aibe.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-12 mobile:h-10 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label.Root htmlFor="phone" className="text-label-sm text-text-strong-950">
                        Phone Number
                      </Label.Root>
                      <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="h-12 mobile:h-10 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label.Root htmlFor="message" className="text-label-sm text-text-strong-950">
                        Message
                      </Label.Root>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Leave us a message..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        simple
                        className="min-h-28 border border-gray-200 rounded-lg focus:border-primary-base focus:ring-2 focus:ring-primary-base/20 transition-all px-4 py-3"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="privacyPolicy"
                        checked={formData.privacyPolicy}
                        onCheckedChange={(value) => handleCheckboxChange(Boolean(value))}
                      />
                      <Label.Root htmlFor="privacyPolicy" className="text-paragraph-sm text-text-sub-600 cursor-pointer">
                        You agree to our friendly privacy policy.
                      </Label.Root>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 pt-0">
                    <Button
                      type="submit"
                      variant="primary"
                      size="medium"
                      className="w-full h-12 mobile:h-10 rounded-none"
                    >
                      Send Message
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 pb-44 px-8 mobile:px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-primary-base text-title-h2 mb-12 text-left">
            Contact Us
          </h2>

          <div className="grid grid-cols-3 mobile:grid-cols-1 gap-6">
            {/* Get in touch card */}
            <div className="p-6 bg-gray-100 border-0 shadow-none">
              <div className="flex justify-start mb-4">
                <Image
                  src="/images/mail-line.png"
                  alt="Email icon"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <h4 className="text-primary-base text-title-h4 mb-2 text-left">Get in touch</h4>
              <p className="text-text-sub-600 text-paragraph-md text-left">aibe@aibe.website</p>
            </div>

            {/* Newsletter Submissions card */}
            <div className="p-6 bg-gray-100 border-0 shadow-none">
              <div className="flex justify-start mb-4">
                <RiNewsLine className="w-8 h-8 text-primary-base" />
              </div>
              <h4 className="text-primary-base text-title-h4 mb-2 text-left whitespace-nowrap">
                Newsletter Submissions
              </h4>
              <p className="text-text-sub-600 text-paragraph-md text-left">
                To suggest items for the bi-annual newsletter, write to: aibe@aibe.website
              </p>
            </div>

            {/* Follow Us card */}
            <div className="p-6 bg-gray-100 border-0 shadow-none">
              <div className="flex justify-start mb-4">
                <RiSmartphoneLine className="w-8 h-8 text-primary-base" />
              </div>
              <h4 className="text-primary-base text-title-h4 mb-2 text-left">
                Follow Us
              </h4>
              <div className="flex justify-start space-x-4">
                <Link href="https://www.linkedin.com/in/associazione-italo-brasiliana-di-economia-aibe-6700b3356/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <RiLinkedinFill className="w-8 h-8 text-text-sub-600" />
                </Link>
                <Link href="https://x.com/econ_aibe" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <RiTwitterXFill className="w-8 h-8 text-text-sub-600" />
                </Link>
                <Link href="https://bsky.app/profile/econaibe.bsky.social" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <Image
                    src="/images/bluesky-fill.png"
                    alt="Website icon"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FGC Sponsor Section */}
      <section className="w-full py-8 px-8 mobile:px-4 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-8 items-center py-6">
            {/* Left side - Text */}
            <div>
              <p className="text-title-h5 text-text-strong-950">
                This site was developed thanks to the generous support of the Fundo Garantidor de Créditos (FGC)
              </p>
            </div>

            {/* Right side - Logo */}
            <div className="flex justify-center mobile:justify-start">
              <Image
                src="/images/fgc-logo.png"
                alt="Fundo Garantidor de Créditos (FGC)"
                width={300}
                height={150}
                className="w-auto h-24 mobile:h-20 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
} 