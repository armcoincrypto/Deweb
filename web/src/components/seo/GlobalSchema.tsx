import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

export function GlobalSchema() {
  return <JsonLd data={[organizationSchema(), websiteSchema()]} />;
}
