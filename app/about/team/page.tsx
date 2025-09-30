'use client';

import Image from 'next/image';
import CTA from '@/components/cta';

// Dados completos dos membros do board of directors baseado no Figma
const boardMembers = [
  {
    id: 1,
    name: "Fernando L. Aiube",
    position: "Associate Professor",
    image: "/images/Fernando.png"
  },
  {
    id: 2,
    name: "Raphael Corbi",
    position: "Full Professor",
    image: "/images/Raphael.png"
  },
  {
    id: 3,
    name: "Tito Cordella",
    position: "Full Professor",
    image: "/images/titocordella.png"
  },
  {
    id: 4,
    name: "Chiara Falco",
    position: "Assistant Professor",
    image: "/images/chiarafalco.png"
  },
  {
    id: 5,
    name: "Alan de Gennaro",
    position: "Associate Professor",
    image: "/images/alandegennaro.png"
  },
  {
    id: 6,
    name: "Rafael F. Schiozer",
    position: "Full Professor",
    image: "/images/rafaelfschozer.png"
  },
  {
    id: 7,
    name: "Luca J. Uberti",
    position: "Assistant Professor",
    image: "/images/Luca.png"
  },
  {
    id: 8,
    name: "Andrea Ugolini",
    position: "Assistant Professor",
    image: "/images/Andrea.png"
  }
];

export default function Team() {
  return (
    <div className='min-h-screen bg-white'>
      {/* Header Section */}
      <section className='pt-32 pb-16'>
        <div className='mx-auto max-w-[1200px] w-full'>
          <div className='flex flex-col gap-8 text-center'>
            <div className='inline-flex items-center justify-center px-2 py-0.5 bg-transparent text-[#99a0ae] text-subheading-xs uppercase tracking-[0.48px]'>
              <div className='h-1 w-1 rounded-full bg-[#99a0ae] mr-2'></div>
              TEAM
            </div>
            <h1 className='text-title-h1 text-black'>
              Board of directors
            </h1>
          </div>
        </div>
      </section>

      {/* Board Members Grid */}
      <section className='pb-32'>
        <div className='mx-auto max-w-[1200px] w-full'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {boardMembers.map((member) => (
              <div key={member.id} className='flex flex-col gap-4 items-center text-center'>
                <div className='relative w-[246px] h-[295px] bg-[#f3f3f3] overflow-hidden'>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className='object-cover object-center'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <h3 className='text-title-h5 text-black font-semibold'>
                    {member.name}
                  </h3>
                  <p className='text-paragraph-lg text-[#525866]'>
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </div>
  );
}
