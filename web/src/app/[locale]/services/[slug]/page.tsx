import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { getServiceById } from "@/lib/services-data";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceById(slug);
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
