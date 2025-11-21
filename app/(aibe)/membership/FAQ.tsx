'use client';

import { useState } from 'react';

const faqData = [
  {
    id: 1,
    question: 'How much does it cost to become a member?',
    answer:
      'We offer two membership options: Non-member (free with limited access to public content), and Member ($29.90/month) with full access to exclusive academic content and events.',
  },
  {
    id: 2,
    question: 'How can I pay for my membership?',
    answer:
      'You can pay through our secure credit card payment system, processed by Stripe. Payments are secure and encrypted.',
  },
  {
    id: 3,
    question: 'Do I receive a membership receipt?',
    answer:
      'Yes, you will receive a confirmation email and can access your invoices through the billing portal at any time.',
  },
  {
    id: 4,
    question: 'What benefits do members receive?',
    answer:
      'Members have access to exclusive academic content, workshops, private community, networking opportunities, and full access to all our resources and events.',
  },
  {
    id: 5,
    question: 'Is the membership renewed automatically?',
    answer:
      'Yes, memberships are renewed automatically on a monthly basis. You can cancel at any time through the billing portal.',
  },
  {
    id: 6,
    question: 'Who can become a member?',
    answer:
      'Anyone interested in Brazil-Italy economic research and academic cooperation can become a member.',
  },
  {
    id: 7,
    question: 'Can I cancel my membership at any time?',
    answer:
      'Yes! You can cancel your membership at any time through the billing portal. Your access will remain active until the end of the paid period.',
  },
  {
    id: 8,
    question: 'Can I change membership later?',
    answer:
      'Yes, you can upgrade or downgrade your membership at any time through the billing portal. Changes are applied immediately or in the next billing cycle.',
  },
];

export function FAQ() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="p-8 mobile:p-4 bg-white">
      <div className="mx-auto max-w-[1200px] w-full">
        <div className="flex flex-row mobile:flex-col gap-16 mobile:gap-8">
          {/* Left Column - Title */}
          <div className="w-1/2 mobile:w-full">
            <p className="text-gray-400 font-medium tracking-wider uppercase mb-4" style={{ fontSize: '12px', lineHeight: '16px' }}>
              FAQ
            </p>
            <h2 className="text-title-h2 text-black">
              Frequently <br /> Asked Questions
            </h2>
            <p className="text-paragraph-md text-gray-600 mt-4">
              Find answers to the most common questions about our membership
            </p>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="w-1/2 mobile:w-full">
            {faqData.map((faq) => (
              <div key={faq.id} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full py-6 text-left flex items-start gap-4 focus:outline-none hover:text-primary-base transition-colors group"
                  aria-expanded={openFaqId === faq.id}
                >
                  <span
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-xl font-light text-gray-600 group-hover:text-primary-base transition-all duration-200 ${
                      openFaqId === faq.id ? 'rotate-45 text-primary-base' : ''
                    }`}
                  >
                    +
                  </span>
                  <span className="text-text-strong-950 text-title-h6 flex-1">{faq.question}</span>
                </button>
                {openFaqId === faq.id && (
                  <div className="pb-6 pl-10 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="text-paragraph-md text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

