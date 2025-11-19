'use client';

import { useState } from 'react';

const faqData = [
  {
    id: 1,
    question: 'Quanto custa se tornar membro?',
    answer:
      'Oferecemos diferentes planos: Gratuito (acesso limitado), Premium (R$ 29,90/mês) com acesso a conteúdo exclusivo, e Founders (R$ 99,90/mês) com experiência VIP completa.',
  },
  {
    id: 2,
    question: 'Como posso pagar minha assinatura?',
    answer:
      'Você pode pagar através do nosso sistema seguro de pagamento com cartão de crédito, processado pelo Stripe. Os pagamentos são seguros e criptografados.',
  },
  {
    id: 3,
    question: 'Recebo comprovante de assinatura?',
    answer:
      'Sim, você receberá um email de confirmação e pode acessar suas faturas através do portal de cobrança a qualquer momento.',
  },
  {
    id: 4,
    question: 'Quais benefícios os membros recebem?',
    answer:
      'Membros Premium e Founders têm acesso a conteúdo exclusivo, workshops, comunidade privada, networking e muito mais. Founders também recebem consultoria 1:1 e acesso VIP a eventos.',
  },
  {
    id: 5,
    question: 'A assinatura é renovada automaticamente?',
    answer:
      'Sim, as assinaturas são renovadas mensalmente de forma automática. Você pode cancelar a qualquer momento através do portal de cobrança.',
  },
  {
    id: 6,
    question: 'Quem pode se tornar membro?',
    answer:
      'Qualquer pessoa interessada em pesquisa econômica Brasil-Itália e cooperação acadêmica pode se tornar membro.',
  },
  {
    id: 7,
    question: 'Posso cancelar minha assinatura a qualquer momento?',
    answer:
      'Sim! Você pode cancelar sua assinatura a qualquer momento através do portal de cobrança. Seu acesso permanecerá ativo até o final do período pago.',
  },
  {
    id: 8,
    question: 'Posso mudar de plano depois?',
    answer:
      'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento através do portal de cobrança. As mudanças são aplicadas imediatamente ou no próximo ciclo.',
  },
];

export function FAQ() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section className="py-16 mobile:py-12 bg-white px-4">
      <div className="mx-auto max-w-[1200px] w-full">
        <div className="flex flex-row mobile:flex-col gap-16 mobile:gap-8">
          {/* Left Column - Title */}
          <div className="w-1/2 mobile:w-full">
            <h2 className="text-title-h2 text-black">
              Perguntas <br /> Frequentes
            </h2>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="w-1/2 mobile:w-full">
            {faqData.map((faq) => (
              <div key={faq.id} className="border-b border-gray-200">
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
  );
}

