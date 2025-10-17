import Image from "next/image"
import Link from "next/link"
import { Root as Button } from "@/components/ui/button"

export default function CTA({ hideFlagOnMobile = false }: { hideFlagOnMobile?: boolean }) {
  return (
    <section className='relative overflow-visible bg-primary-base flex justify-center pb-8 items-end h-[534px] mobile:h-auto mobile:py-16'>
      <div className='relative z-20 mx-auto max-w-[1200px] p-16 mobile:p-8 w-full'>
        <div className='gap-8 mobile:gap-6 flex flex-col text-center relative'>
          <Image
            src='/images/bandeira cta.svg'
            alt='Brazilian and Italian flags'
            width={402}
            height={294}
            className={`absolute left-1/2 transform -translate-x-1/2 top-[-330px] mobile:top-[-200px] w-auto h-[300px] mobile:h-[200px] z-20 ${hideFlagOnMobile ? 'mobile:hidden' : ''}`}
          />

          <div className='text-center gap-4 mobile:gap-3 flex max-w-[700px] flex-col mx-auto'>
            <h2 className='text-title-h2 mobile:text-title-h3 text-white'>
              Join AIBE and Strengthen Academic Cooperation
            </h2>
            <p className='text-paragraph-lg mobile:text-paragraph-md text-white'>
              By joining AIBE, you will engage with researchers, access unique
              opportunities, and support initiatives that unite Brazil and Italy
              in economic research.
            </p>
          </div>

          <Link href="/membership">
            <Button variant='neutral' mode='lighter' size='medium' className='h-hug w-fit mobile:w-full self-center'>
              Become a Member
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

