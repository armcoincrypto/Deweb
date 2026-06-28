import { makeCostGuidePage } from "@/lib/cost-guides/create-page";

const page = makeCostGuidePage("shopify-vs-custom-ecommerce");
export const generateMetadata = page.generateMetadata;
export default page.default;
