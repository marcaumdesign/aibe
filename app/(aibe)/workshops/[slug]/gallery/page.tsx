import type { Metadata } from 'next';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import configPromise from '@payload-config';
import { getPayload } from 'payload';
import { draftMode } from 'next/headers';
import React, { cache } from 'react';
import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import { Root as Button } from "@/components/ui/button";
import { getMediaUrl } from '@/utilities/getMediaUrl';
import GalleryClient from './page.client';
import { Badge } from '@/components/ui/badge';

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const workshops = await payload.find({
    collection: 'workshops',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = workshops.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
}

export default async function WorkshopGalleryPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug = '' } = await paramsPromise;
  const url = '/workshops/' + slug + '/gallery';
  const workshop = await queryWorkshopBySlug({ slug });

  if (!workshop) return <PayloadRedirects url={url} />;

  // Coletar todas as imagens da galeria do workshop
  const galleryImages: Array<{ src: string; alt: string }> = [];

  if (workshop.gallery && Array.isArray(workshop.gallery)) {
    workshop.gallery.forEach((item) => {
      if (item.image && typeof item.image === 'object') {
        galleryImages.push({
          src: getMediaUrl(item.image.url || '', item.image.updatedAt),
          alt: item.image.alt || `${workshop.title} - Gallery photo`,
        });
      }
    });
  }

  const totalPhotos = galleryImages.length;

  return (
    <div className=" bg-white">
      {/* Header Spacer */}


      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href={`/workshops/${slug}`}>
            <Button variant="neutral" mode="stroke" size="medium" className="gap-2">
              <RiArrowLeftLine className="w-5 h-5" />
              Back to Workshop
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12 flex flex-col gap-2">
          <Badge variant='with-dot' size='medium'>
            {workshop.type === 'past' ? 'Past Workshop' : 'Workshop'}
          </Badge>
          <h1 className="text-primary-base text-title-h1 mobile:text-title-h2">
            {workshop.title} - Gallery
          </h1>
          <p className="text-text-sub-600 text-paragraph-lg">
            {workshop.subject}
          </p>
        </div>

        {/* Gallery Grid Component */}
        {galleryImages.length > 0 ? (
          <GalleryClient images={galleryImages} />
        ) : (
          <div className="text-center py-12">
            <p className="text-text-sub-600 text-paragraph-lg">
              No photos available for this workshop yet.
            </p>
          </div>
        )}



        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-primary-base text-title-h3 mb-4">
            Want to see more?
          </h3>
          <p className="text-text-sub-600 text-paragraph-lg mb-6 max-w-2xl mx-auto">
            Explore other workshops and become part of the AIBE community.
          </p>
          <Link href="/workshops">
            <Button variant="primary" size="medium">
              View All Workshops
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise;
  const workshop = await queryWorkshopBySlug({ slug });

  if (!workshop) {
    return {
      title: 'Gallery | AIBE',
    };
  }

  return {
    title: `${workshop.title} - Gallery | AIBE`,
    description: `View photos from ${workshop.title} workshop`,
  };
}

const queryWorkshopBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'workshops',
    draft,
    limit: 1,
    depth: 2,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});

