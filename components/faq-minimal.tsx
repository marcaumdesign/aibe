'use client';
import { useState } from 'react';

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

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        {faqData.map((faq) => (
          <div
            key={faq.id}
            className="border-b border-gray-200 py-4"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="flex items-center gap-3 w-full text-left"
            >
              <span
                className={`text-xl font-semibold text-black transition-transform duration-300 ${openId === faq.id ? 'rotate-45' : ''
                  }`}
              >
                +
              </span>
              <h3 className="font-semibold text-lg md:text-xl text-black flex-1">
                {faq.question}
              </h3>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <p className="text-gray-500 text-base leading-relaxed mt-1 pl-9">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

