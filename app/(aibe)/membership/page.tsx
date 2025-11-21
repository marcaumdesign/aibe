import { getMeUser } from '@/utilities/getMeUser';
import { PLAN_INFO } from '@/lib/stripe';
import { MembershipContent } from './MembershipContent';
import { FAQ } from './FAQ';
import Image from 'next/image';

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

  // Prepare membership data
  const plans = [
    {
      planId: 'free' as const,
      ...PLAN_INFO.free,
      features: [...PLAN_INFO.free.features], // Convert readonly to mutable
    },
    {
      planId: 'premium' as const,
      ...PLAN_INFO.premium,
      features: [...PLAN_INFO.premium.features], // Convert readonly to mutable
    },
  ];

  return (
    <div className="bg-white">
      {/* Pricing Section */}
      <MembershipContent user={user} plans={plans} />

      {/* Membership Benefits */}
      <section className="py-16 mobile:py-12 bg-white px-8 mobile:px-4">
        <div className="mx-auto max-w-7xl w-full">
          <div className="flex flex-col gap-12 mobile:gap-8">
            <div className="text-center">
              <p className="text-gray-400 font-medium tracking-wider uppercase mb-4" style={{ fontSize: '12px', lineHeight: '16px' }}>
                MEMBER BENEFITS
              </p>
              <h2 className="text-title-h2 text-black mb-4">
                Membership Benefits
              </h2>
              <p className="text-paragraph-lg text-gray-600 max-w-2xl mx-auto">
                Join our community and unlock exclusive benefits designed for researchers and professionals
              </p>
            </div>

            <div className="grid grid-cols-3 mobile:grid-cols-1 gap-6 mobile:gap-6">
              {membershipBenefits.map((benefit, index) => {
                return (
                  <div key={index} className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col gap-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary-base rounded-lg">
                        <Image
                          src={benefit.icon}
                          alt={benefit.title}
                          width={24}
                          height={24}
                          className="w-6 h-6 brightness-0 invert"
                        />
                      </div>
                      <h3 className="text-title-h5 text-black">
                        {benefit.title}
                      </h3>
                      <p className="text-paragraph-md text-gray-600">
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
      {/* <CTA /> */}

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}
