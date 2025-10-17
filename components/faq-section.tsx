'use client';
import {
  Root as AccordionRoot,
  Item as AccordionItem,
  Header as AccordionHeader,
  Trigger as AccordionTrigger,
  Content as AccordionContent,
} from '@/components/ui/accordion';

const faqData = [
  {
    id: "item-1",
    question: "How much does it cost to become a member?",
    answer: "Membership requires a minimum annual contribution of €2, which is considered a symbolic fee."
  },
  {
    id: "item-2",
    question: "How can I pay for my membership?",
    answer: "You can pay for your membership through our secure online payment system or bank transfer. Details will be provided after registration."
  },
  {
    id: "item-3",
    question: "Do I receive proof of membership?",
    answer: "Yes, you will receive a digital membership certificate and can request a physical certificate if needed."
  },
  {
    id: "item-4",
    question: "What benefits do members receive?",
    answer: "Members receive exclusive access to events, voting rights, newsletters, and networking opportunities within the AIBE community."
  },
  {
    id: "item-5",
    question: "Is membership automatically renewed?",
    answer: "No, membership is valid until December 31st of each year and must be renewed annually."
  },
  {
    id: "item-6",
    question: "Who can become a member?",
    answer: "Anyone with an interest in Brazilian-Italian economic research and academic cooperation can become a member."
  }
];

export default function FAQSection() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-[1200px] w-full px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left Column - Title */}
          <div className="w-full md:w-1/2">
            <h2 className="font-semibold text-[40px] text-black">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Right Column - Accordions */}
          <div className="w-full md:w-1/2">
            <AccordionRoot type="single" collapsible className="w-full">
              {faqData.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-200 py-3">
                  <AccordionHeader>
                    <AccordionTrigger className="flex items-start gap-4 w-full text-left hover:opacity-70 transition-opacity group">
                      <span className="text-xl font-semibold text-black flex-shrink-0 transition-transform group-data-[state=open]:rotate-45">
                        +
                      </span>
                      <span className="font-semibold text-xl text-black flex-1">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent className="pl-9 pt-2">
                    <p className="text-gray-500 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </AccordionRoot>
          </div>
        </div>
      </div>
    </section>
  );
}

