'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RiAddLine, RiMapPinLine, RiSendPlaneLine } from '@remixicon/react';
import { Root as Button } from '@/components/ui/button';

// Componente Badge reutilizável
function Badge({
  children,
  variant = 'blue',
  size = 'medium',
  withDot = false,
  className,
}: {
  children: React.ReactNode;
  variant?: 'blue' | 'gray' | 'with-dot';
  size?: 'small' | 'medium';
  withDot?: boolean;
  className?: string;
}) {
  const getBaseClasses = () => {
    if (variant === 'with-dot') {
      return 'inline-flex items-center font-medium';
    }
    return 'inline-flex items-center justify-center font-medium';
  };
  const variantClasses = {
    blue: 'bg-[#122368] text-white',
    gray: 'bg-[#99a0ae] text-white',
    'with-dot': 'bg-transparent text-text-soft-400',
  };
  const sizeClasses = {
    small: 'px-2 py-0.5 text-label-xs',
    medium: 'px-2 py-0.5 text-label-sm',
  };

  const getTextSize = () => {
    if (variant === 'with-dot') {
      return 'text-subheading-xs uppercase px-0 py-0';
    }
    return sizeClasses[size];
  };

  const dotClasses = 'h-1 w-1 rounded-full bg-[#99a0ae] mr-2';

  return (
    <span
      className={`${getBaseClasses()} ${variantClasses[variant]} ${getTextSize()} ${className}`}
    >
      {(variant === 'with-dot' || withDot) && <div className={dotClasses}></div>}
      {children}
    </span>
  );
}

// Componente Accordion para FAQ
function AccordionItem({
  question,
  answer,
  isOpen,
  onClick
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 text-left flex items-center gap-4 focus:outline-none"
        onClick={onClick}
      >
        <RiAddLine
          className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''
            }`}
        />
        <span className="text-text-strong-950 text-title-h6">{question}</span>
      </button>
      {isOpen && (
        <div className="pb-6">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function MembershipPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const faqData = [
    {
      question: "How much does it cost to become a member?",
      answer: "Membership requires a minimum annual contribution of €2, which is considered a symbolic fee."
    },
    {
      question: "How can I pay for my membership?",
      answer: "You can pay for your membership through our secure online payment system or by bank transfer. Details will be provided during the registration process."
    },
    {
      question: "Do I receive proof of membership?",
      answer: "Yes, you will receive a digital certificate of membership via email upon successful registration and payment."
    },
    {
      question: "What benefits do members receive?",
      answer: "Members receive access to exclusive events, two newsletters per year, voting rights in the Annual Members' Assembly, and networking opportunities with Brazilian and Italian economists."
    },
    {
      question: "Is membership automatically renewed?",
      answer: "No, membership is valid for one year and must be renewed annually. You will receive a reminder email before your membership expires."
    },
    {
      question: "Who can become a member?",
      answer: "Anyone with an interest in Italian-Brazilian economic relations, including students, researchers, academics, and professionals in the field of economics."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Text Section */}
          <div className="text-center mb-16">
            <div className="space-y-6">
              <Badge variant="with-dot" size="medium">
                MEMBERSHIP
              </Badge>
              <h1 className="text-text-strong-950 text-title-h1">
                Become a Member
              </h1>
              <p className="text-text-sub-600 text-label-lg">
                Gain access to exclusive events, networking opportunities and the right to<span className="block"> participate in the Members&apos; Assembly.</span>
              </p>

              {/* Flag Icons */}
              <div className="flex items-center justify-center gap-32">
                {/* Italia */}
                <div
                  className='absolute z-5'
                  style={{
                    left: '200px',
                    top: '350px'
                  }}
                >
                  <div className='relative w-16 h-16'>
                    {/* Camada 1 - Bandeira (interna) - sem animação */}
                    <div className='absolute inset-0 rounded-full overflow-hidden z-[100]'>
                      <Image
                        src='/images/italy-flag.png'
                        alt='Italy Flag'
                        fill
                        className='object-cover'
                      />
                    </div>

                    {/* Camada 2 - Anel médio - animação customizada */}
                    <div className='absolute inset-0 rounded-full bg-blue-100 scale-125 animate-pulse-custom z-40'></div>

                    {/* Camada 3 - Anel externo - animação mais lenta */}
                    <div className='absolute inset-0 rounded-full bg-blue-50 scale-150 animate-pulse-custom-slow z-30'></div>
                  </div>
                </div>
                {/* Brasil */}
                <div
                  className='absolute z-50'
                  style={{
                    right: '200px',
                    top: '350px'
                  }}
                >
                  <div className='relative w-16 h-16'>
                    {/* Camada 1 - Bandeira (interna) - sem animação */}
                    <div className='absolute inset-0 rounded-full overflow-hidden z-[100]'>
                      <Image
                        src='/images/brazil-flag.png'
                        alt='Brazil Flag'
                        fill
                        className='object-cover'
                      />
                    </div>

                    {/* Camada 2 - Anel médio - animação customizada */}
                    <div className='absolute inset-0 rounded-full bg-blue-100 scale-125 animate-pulse-custom z-40'></div>

                    {/* Camada 3 - Anel externo - animação mais lenta */}
                    <div className='absolute inset-0 rounded-full bg-blue-50 scale-150 animate-pulse-custom-slow z-30'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image Section */}
          <div className="relative w-full h-[400px] lg:h-[500px]">
            <Image
              src="/images/person-image.png"
              alt="AIBE Members Meeting"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Membership Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-text-strong-950 text-title-h2 mb-12">
            Membership Benefits
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Newsletter Card */}
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="flex justify-start mb-6">
                <RiMapPinLine className="text-primary-base w-8 h-8" />
              </div>
              <h5 className="text-text-strong-950 text-title-h5 mb-4">
                Two newsletters per year
              </h5>
              <p className="text-text-sub-600 text-paragraph-lg">
                Receive two editions per year with updates, news, and academic opportunities.
              </p>
            </div>

            {/* Events Card */}
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="flex justify-start mb-6">
                <Image
                  src="/images/trophy-line.png"
                  alt="Trophy icon"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <h5 className="text-text-strong-950 text-title-h5 mb-4">
                <div>Exclusive Access to</div>
                <div>Events</div>
              </h5>
              <p className="text-text-sub-600 text-paragraph-lg">
                Attend workshops, seminars, and activities reserved for members only.
              </p>
            </div>

            {/* Voting Rights Card */}
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="flex justify-start mb-6">
                <RiSendPlaneLine className="text-primary-base w-8 h-8" />
              </div>
              <h5 className="text-text-strong-950 text-title-h5 mb-4">
                Voting Rights
              </h5>
              <p className="text-text-sub-600 text-paragraph-lg">
                Take part in the Annual Members&apos; Assembly and contribute to AIBE&apos;s decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className='flex justify-center'>
        <div className="container flex justify-center max-w-[1200px] p-16">
          <div className="w-full p-16 bg-primary-base">
            <div className="w-full flex flex-col items-center text-center">
              <h2 className="text-white text-title-h3 mb-5 max-w-[800px]">
                Become a member of AIBE for 1 year by making a free donation of at least €2!
              </h2>
              <p className="text-white/90 mb-6 text-label-lg">
                Membership is valid until December 31 of the respective year.
              </p>
              <Button variant="neutral" mode="lighter" size="medium" className="bg-white text-primary-base hover:bg-gray-100 px-8 py-3">
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Title */}
            <div className="space-y-4">
              <h2 className="text-text-strong-950 text-title-h2 max-w-[400px]">
                Frequently Asked Questions
              </h2>
            </div>

            {/* Right Column - FAQ Items */}
            <div className="space-y-0">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === index}
                  onClick={() => toggleFaq(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}