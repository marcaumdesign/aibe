'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Root as Button } from '@/components/ui/button';
import CTA from '@/components/cta';

const membershipBenefits = [
  {
    icon: "/images/map-pin-line.png",
    title: "Two newsletters per year",
    description: "Receive two editions per year with updates, news, and academic opportunities."
  },
  {
    icon: "/images/trophy-line.png",
    title: "Exclusive Access to Events",
    description: "Attend workshops, seminars, and activities reserved for members only."
  },
  {
    icon: "/images/send-plane-line.png",
    title: "Voting Rights",
    description: "Take part in the Annual Members' Assembly and contribute to AIBE's decisions."
  }
];

const faqData = [
  {
    id: 1,
    question: "How much does it cost to become a member?",
    answer: "Membership requires a minimum annual contribution of €2, which is considered a symbolic fee."
  },
  {
    id: 2,
    question: "How can I pay for my membership?",
    answer: "You can pay for your membership through our secure online payment system or bank transfer. Details will be provided after registration."
  },
  {
    id: 3,
    question: "Do I receive proof of membership?",
    answer: "Yes, you will receive a digital membership certificate and can request a physical certificate if needed."
  },
  {
    id: 4,
    question: "What benefits do members receive?",
    answer: "Members receive exclusive access to events, voting rights, newsletters, and networking opportunities within the AIBE community."
  },
  {
    id: 5,
    question: "Is membership automatically renewed?",
    answer: "No, membership is valid until December 31st of each year and must be renewed annually."
  },
  {
    id: 6,
    question: "Who can become a member?",
    answer: "Anyone with an interest in Brazilian-Italian economic research and academic cooperation can become a member."
  }
];

export default function Membership() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-[1200px] w-full px-4">
          <div className="flex flex-col gap-8 mobile:gap-6 text-center">
            <div className="inline-flex items-center justify-center px-2 py-0.5 bg-transparent text-slate-400 text-subheading-xs uppercase tracking-[0.48px]">
              <div className="h-1 w-1 rounded-full bg-slate-400 mr-2"></div>
              MEMBERSHIP
            </div>
            <h1 className="text-title-h1 text-black">
              Become a Member
            </h1>
            <p className="text-paragraph-lg text-slate-600 max-w-2xl mx-auto">
              Gain access to exclusive events, networking opportunities, and the right to participate in the Members&apos; Assembly.
            </p>

            {/* Flags com animação circular - posicionadas sobre a imagem (visíveis no mobile) */}
            <div className="relative mt-8 mobile:mt-4">
              {/* Animação Circular - Bandeira da Itália (esquerda) */}
              <div className="absolute z-50 left-[15%] mobile:left-[8%] -top-2.5 mobile:top-2">
                <div className="relative w-16 h-16 mobile:w-14 mobile:h-14">
                  {/* Camada 1 - Bandeira (interna) - sem animação */}
                  <div className="absolute inset-0 rounded-full overflow-hidden z-[100]">
                    <Image
                      src="/images/italy-flag.png"
                      alt="Italian flag"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Camada 2 - Anel médio - animação customizada */}
                  <div className="absolute inset-0 rounded-full bg-blue-100 scale-125 animate-pulse-custom z-40"></div>

                  {/* Camada 3 - Anel externo - animação mais lenta */}
                  <div className="absolute inset-0 rounded-full bg-blue-50 scale-150 animate-pulse-custom-slow z-30"></div>
                </div>
              </div>

              {/* Animação Circular - Bandeira do Brasil (direita) */}
              <div className="absolute z-50 right-[15%] mobile:right-[8%] -top-2.5 mobile:top-2">
                <div className="relative w-16 h-16 mobile:w-14 mobile:h-14">
                  {/* Camada 1 - Bandeira (interna) - sem animação */}
                  <div className="absolute inset-0 rounded-full overflow-hidden z-[100]">
                    <Image
                      src="/images/brazil-flag.png"
                      alt="Brazilian flag"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Camada 2 - Anel médio - animação customizada */}
                  <div className="absolute inset-0 rounded-full bg-blue-100 scale-125 animate-pulse-custom z-40"></div>

                  {/* Camada 3 - Anel externo - animação mais lenta */}
                  <div className="absolute inset-0 rounded-full bg-blue-50 scale-150 animate-pulse-custom-slow z-30"></div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mt-6 w-full -mx-4">
              <div className="relative w-full h-[651.43px] mobile:h-[400px] bg-gray-100 overflow-hidden">
                <Image
                  src="/images/reunion.png"
                  alt="Team collaboration"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-16 mobile:py-12 bg-white px-4">
        <div className="mx-auto max-w-[1200px] w-full ">
          <div className="flex flex-col gap-12 mobile:gap-8">
            <div className="text-left">
              <h2 className="text-title-h2 text-black mb-4">
                Membership Benefits
              </h2>
            </div>

            <div className="grid grid-cols-3 mobile:grid-cols-1 gap-8 mobile:gap-6">
              {membershipBenefits.map((benefit, index) => {
                return (
                  <div key={index} className="bg-[#F3F3F3] p-8 border-gray-200">
                    <div className="flex flex-col gap-4">
                      <div className="w-7 h-7 flex items-center justify-start">
                        <Image
                          src={benefit.icon}
                          alt={benefit.title}
                          width={28}
                          height={28}
                          className="w-7 h-7"
                        />
                      </div>
                      <h3 className="text-title-h5 text-black">
                        {benefit.title}
                      </h3>
                      <p className="text-paragraph-md text-slate-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main CTA Banner */}
      {/* Desktop/Tablet CTA original */}
      <section className="py-16 mobile:py-12 bg-white mobile:hidden">
        <div className="mx-auto max-w-[1200px] w-full px-4">
          <div className="bg-blue-950 py-16 px-8">
            <div className="text-center flex flex-col gap-6">
              <h2 className="text-title-h2 text-white max-w-5xl mx-auto leading-tight">
                Become a member of AIBE for 1 year by<br className="block" />
                making a free donation of at least €2!
              </h2>
              <p className="text-paragraph-lg text-white/90 px-0">
                Membership is valid until December 31 of the respective year.
              </p>
              <div className="mt-6">
                <Button
                  variant="neutral"
                  mode="lighter"
                  size="medium"
                  className="w-auto max-w-none mx-auto"
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile CTA padronizado (Home) - esconder bandeira no mobile aqui */}
      <div className="hidden mobile:block">
        <CTA hideFlagOnMobile />
      </div>

      {/* FAQ Section */}
      <section className=" py-16 mobile:py-12 bg-white px-4">
        <div className="mx-auto max-w-[1200px] w-full">
          <div className="flex flex-row mobile:flex-col gap-16 mobile:gap-8">
            {/* Left Column - Title */}
            <div className="w-1/2 mobile:w-full">
              <h2 className="text-title-h2 text-black">
                Frequently Asked <br /> Questions
              </h2>
            </div>

            {/* Right Column - FAQ Items */}
            <div className="w-1/2 mobile:w-full">
              {faqData.map((faq) => (
                <div
                  key={faq.id}
                  className="border-b border-gray-200"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full py-6 text-left flex items-center gap-4 focus:outline-none"
                  >
                    <span
                      className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${openFaqId === faq.id ? 'rotate-45' : ''
                        }`}
                    >
                      +
                    </span>
                    <span className="text-text-strong-950 text-title-h6">{faq.question}</span>
                  </button>
                  {openFaqId === faq.id && (
                    <div className="pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
