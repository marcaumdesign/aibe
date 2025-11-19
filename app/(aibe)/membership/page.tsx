import { getMeUser } from '@/utilities/getMeUser';
import { PLAN_INFO } from '@/lib/stripe';
import { MembershipContent } from './MembershipContent';
import { FAQ } from './FAQ';
import Image from 'next/image';
import CTA from '@/components/cta';

const membershipBenefits = [
  {
    icon: "/images/map-pin-line.png",
    title: "Two newsletters per year",
    description: "Receive two editions per year with updates, news, and academic opportunities."
  },
  {
    icon: "/images/trophy-line.png",
    title: "Access to Members’ Events",
    description: "Attend workshops, seminars, and activities reserved for members only."
  },
  {
    icon: "/images/send-plane-line.png",
    title: "Voting Rights",
    description: "Take part in the Annual Members’ Assembly and contribute to AIBE’s decisions."
  }
];

export default async function Membership() {
  // Buscar usuário logado (não redireciona se não estiver logado)
  let user = null;
  try {
    const meUser = await getMeUser();
    user = meUser.user;
  } catch {
    // Usuário não logado
  }

  // Preparar dados dos planos
  const plans = [
    {
      planId: 'free' as const,
      ...PLAN_INFO.free,
      features: [...PLAN_INFO.free.features], // Converter readonly para mutável
    },
    {
      planId: 'premium' as const,
      ...PLAN_INFO.premium,
      features: [...PLAN_INFO.premium.features], // Converter readonly para mutável
    },
    {
      planId: 'founders' as const,
      ...PLAN_INFO.founders,
      features: [...PLAN_INFO.founders.features], // Converter readonly para mutável
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}

      {/* Pricing Section */}
      <MembershipContent user={user} plans={plans} />

      {/* Membership Benefits */}
      <section className="py-16 mobile:py-12 bg-white px-4">
        <div className="mx-auto max-w-[1200px] w-full ">
          <div className="flex flex-col gap-12 mobile:gap-8">
            <div className="text-center">
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

      {/* Mobile CTA padronizado (Home) */}
      <CTA />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}
