import Image from "next/image"

export default function CTA({ hideFlagOnMobile = false }: { hideFlagOnMobile?: boolean }) {
  return (
    <section className='relative overflow-visible z-50 bg-primary-base flex justify-center items-center pt-0 pb-0 mobile:pb-0'>
      {/* Top solid blue overlay to avoid hard cut */}
      <div className='pointer-events-none absolute inset-x-0 -top-16 h-16 bg-primary-base'></div>
      {/* Bottom solid blue overlay to ensure no white gap */}
      <div className='pointer-events-none absolute inset-x-0 -bottom-0 h-0 bg-primary-base'></div>
      <div className='relative z-20 mx-auto max-w-[1200px] px-16 mobile:px-8 w-full'>
        <div className='flex flex-col items-center justify-end pb-6 mobile:pb-4 min-h-[40px] mobile:min-h-[40px]'>
          <Image
            src='/images/bandeira cta.svg'
            alt='Brazilian and Italian flags'
            width={402}
            height={294}
            className={`w-auto h-[150px] mobile:h-[140px] z-30 mt-[-280px] mobile:mt-[-160px] ${hideFlagOnMobile ? 'mobile:hidden' : ''}`}
          />
        </div>
      </div>
    </section>
  )
}

