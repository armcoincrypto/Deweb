import { makeCostGuidePage } from "@/lib/cost-guides/create-page";

const page = makeCostGuidePage("landing-page-cost");
export const generateMetadata = page.generateMetadata;
export default page.default;
