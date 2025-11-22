import Image from 'next/image';
import Link from 'next/link';
import * as Button from '@/components/ui/button';

interface MainItemProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  linkHref: string;
  linkText?: string;
  imageFocalPoint?: string;
}

export function MainItem({
  imageSrc,
  imageAlt,
  title,
  description,
  linkHref,
  linkText = 'See More',
  imageFocalPoint = 'center',
}: MainItemProps) {
  return (
    <div className='border gap-4 border-stroke-sub-200 bg-white p-0 flex flex-col justify-start overflow-hidden h-full group'>
      <div className='relative w-full h-[400px] md:h-[300px] mobile:h-[250px] overflow-hidden'>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
          style={{ objectPosition: imageFocalPoint }}
        />
      </div>
      <div className='p-6 md:p-5 mobile:p-4 flex flex-col gap-4 md:gap-3 flex-1'>
        <h3 className='text-title-h4 lg:text-title-h4 md:text-title-h5 mobile:text-title-h5 text-primary-base'>
          {title}
        </h3>
        <p className='text-sub-600 text-paragraph-lg md:text-paragraph-md mobile:text-paragraph-md flex-1'>
          {description}
        </p>
        <Button.Root variant='primary' size='medium' className='h-hug w-full md:w-full lg:w-fit mt-auto' asChild>
          <Link href={linkHref}>
            {linkText}
          </Link>
        </Button.Root>
      </div>
    </div>
  );
}

