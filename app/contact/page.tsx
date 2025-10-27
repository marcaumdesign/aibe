"use client";

import {
  RiLinkedinFill,
  RiTwitterXFill,
} from "@remixicon/react";
import { useState } from "react";
import Image from "next/image";
import CTA from "@/components/cta";

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
            <div className="space-y-3">
              <div className="space-y-10">
                <p className="text-gray-400 font-medium tracking-wider uppercase pl-2" style={{ fontSize: '12px', lineHeight: '16px' }}>
                  CONTACT US
                </p>
                <h1 className="text-title-h1 text-black">
                  Stay Connected!
                </h1>
              </div>
              <p className="text-gray-700 text-base leading-relaxed max-w-md">
                Reach out to us for questions about events, research opportunities, or becoming a member.
              </p>
            </div>

            {/* Right side - Contact Form */}
            <div className="bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 mobile:grid-cols-1 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 text-lg focus:border-blue-900 focus:ring-0 focus:outline-none"
                    />
                    <label className="text-sm text-gray-500 mt-1 block">First Name</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 text-lg focus:border-blue-900 focus:ring-0 focus:outline-none"
                    />
                    <label className="text-sm text-gray-500 mt-1 block">Last Name</label>
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@aibe.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 text-lg focus:border-blue-900 focus:ring-0 focus:outline-none"
                  />
                  <label className="text-sm text-gray-500 mt-1 block">Email</label>
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 text-lg focus:border-blue-900 focus:ring-0 focus:outline-none"
                  />
                  <label className="text-sm text-gray-500 mt-1 block">Phone Number</label>
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Leave us a message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border-0 border-b-2 border-gray-200 rounded-none px-0 py-3 text-lg focus:border-blue-900 focus:ring-0 resize-none focus:outline-none"
                  />
                  <label className="text-sm text-gray-500 mt-1 block">Message</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.privacyPolicy}
                    onChange={(e) => handleCheckboxChange(e.target.checked)}
                    className="border-gray-300"
                  />
                  <label className="text-sm text-gray-600">
                    You agree to our friendly privacy policy.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-base hover:bg-blue-800 text-white text-lg font-medium rounded-none" style={{ width: '149px', height: '44px' }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 pb-44 px-8 mobile:px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-title-h2 text-black mb-12 text-left">
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
              <h3 className="text-title-h4 text-black mb-2 text-left">Get in touch</h3>
              <p className="text-gray-600 text-left">aibe@aibe.website</p>
            </div>

            {/* Newsletter Submissions card */}
            <div className="p-6 bg-gray-100 border-0 shadow-none">
              <div className="flex justify-start mb-4">
                <Image
                  src="/images/news-line.png"
                  alt="Newsletter icon"
                  width={32}
                  height={32}
                  className="w-6 h-6"
                />
              </div>
              <h3 className="text-title-h4 text-black mb-2 text-left whitespace-nowrap">
                Newsletter Submissions
              </h3>
              <p className="text-gray-600 text-left" style={{ fontSize: '18px', lineHeight: '24px' }}>
                To suggest items for the bi-annual newsletter, write to: aibe@aibe.website
              </p>
            </div>

            {/* Follow Us card */}
            <div className="p-6 bg-gray-100 border-0 shadow-none">
              <div className="flex justify-start mb-4">
                <Image
                  src="/images/smartphone-line.png"
                  alt="Smartphone icon"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-title-h4 text-black mb-2 text-left">
                Follow Us
              </h3>
              <div className="flex justify-start space-x-4">
                <a href="https://linkedin.com/company/aibe" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <RiLinkedinFill className="w-8 h-8 text-gray-600" />
                </a>
                <a href="https://twitter.com/aibe" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <RiTwitterXFill className="w-8 h-8 text-gray-600" />
                </a>
                <a href="https://aibe.website" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <Image
                    src="/images/bluesky-fill.png"
                    alt="Website icon"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative mt-24">
        <CTA />
      </div>

    </div>
  );
} 