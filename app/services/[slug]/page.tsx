import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OfferView } from '@/components/services/OfferView';
import { Footer } from '@/components/sections/Footer';
import { getOffering, offeringSlugs } from '@/lib/offerings';

type ServicePageProps = {
  params: { slug: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return offeringSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const offering = getOffering(params.slug);
  if (!offering) return {};
  return {
    title: offering.title,
    description: offering.lede,
    alternates: { canonical: `/services/${offering.slug}` },
    openGraph: {
      title: offering.title,
      description: offering.lede,
      images: [{ url: offering.image, alt: offering.imageAlt }],
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const offering = getOffering(params.slug);
  if (!offering) notFound();

  return (
    <>
      <main id="content" tabIndex={-1}>
        <OfferView offering={offering} />
      </main>
      <Footer />
    </>
  );
}
