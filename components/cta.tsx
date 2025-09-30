import Image from "next/image"
import * as Button from "@/components/ui/button"

export default function CTA() {
  return (

    <section className='mt-28 relative overflow-visible bg-primary-base flex justify-center pb-8 items-end h-[534px]'>
      <div className='relative z-10 mx-auto max-w-[1200px] p-16 w-full'>
        <div className='gap-8 flex flex-col text-center items-center relative'>
          <Image
            src='/images/bandeira cta.svg'
            alt='Brazilian and Italian flags'
            width={402}
            height={294}
            className='absolute left-1/2 transform -translate-x-1/2 top-[-330px] w-auto h-[300px] z-20'
          />

          <div className='text-center gap-4 flex max-w-[700px] flex-col mx-auto'>
            <h2 className='text-title-h2 text-white'>
              Join AIBE and Strengthen Academic Cooperation
            </h2>
            <p className='text-paragraph-lg text-white'>
              By joining AIBE, you will engage with researchers, access unique
              opportunities, and support initiatives that unite Brazil and Italy
              in economic research.
            </p>
          </div>

          <Button.Root className="w-fit text-text-strong-900 bg-neutral-50 hover:bg-neutral-200">
            Become a Member
          </Button.Root>
        </div>
      </div>

    </section>

  )
}

