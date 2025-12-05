'use client';

import { useState } from 'react';

type WorkshopFaqItem = {
  id?: string | null;
  question: string;
  answer: string;
};

type WorkshopFAQSectionProps = {
  items?: WorkshopFaqItem[] | null;
};

export function WorkshopFAQSection({ items }: WorkshopFAQSectionProps) {
  const validItems =
    items
      ?.map((item, index) => ({
        id: item.id ?? `faq-${index}`,
        question: item.question?.trim(),
        answer: item.answer?.trim(),
      }))
      .filter((item) => item.question && item.answer) ?? [];

  // useState must be called before any early returns
  const [openId, setOpenId] = useState<string | null>(
    validItems[0]?.id ? String(validItems[0].id) : null,
  );

  if (validItems.length === 0) return null;

  const toggleFAQ = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="mb-16 md:mb-12 mobile:mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr),minmax(0,3fr)] gap-8 md:gap-6">
        {/* Left column - Title and description */}
        <div className="flex flex-col gap-4">
          <p className="text-text-sub-600 text-paragraph-md mobile:text-paragraph-sm">
            FAQ
          </p>
          <h2 className="text-primary-base text-title-h2 lg:text-title-h2 md:text-title-h3 mobile:text-title-h4">
            Frequently Asked Questions
          </h2>
          <p className="text-text-sub-600 text-paragraph-md mobile:text-paragraph-sm max-w-xl">
            Find quick answers to the most common questions about this workshop.
          </p>
        </div>

        {/* Right column - Questions & answers list */}
        <div className="flex flex-col gap-1">
          {validItems.map((faq) => {
            const faqId = String(faq.id);
            const isOpen = openId === faqId;

            return (
              <div
                key={faqId}
                className="border-b border-gray-200 py-3"
              >
                <button
                  onClick={() => toggleFAQ(faqId)}
                  className="flex items-center gap-3 w-full text-left"
                >
                  <span
                    className={`text-xl font-semibold text-black transition-transform duration-200 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                  <h3 className="font-semibold text-lg text-black flex-1">
                    {faq.question}
                  </h3>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-500 text-sm leading-relaxed mt-1 pl-7 whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WorkshopFAQSection;


