import { makeCostGuidePage } from "@/lib/cost-guides/create-page";

const page = makeCostGuidePage("cost-to-build-marketplace-website");
export const generateMetadata = page.generateMetadata;
export default page.default;
