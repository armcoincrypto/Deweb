import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { getServiceById, serviceCategories } from "@/lib/services-data";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return serviceCategories.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const service = getServiceById(slug);
  if (!service) return {};
  return buildPageMetadata({
    title: service.title,
    description: service.overview || service.desc,
    path: `/services/${slug}`,
    locale,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceById(slug);
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
