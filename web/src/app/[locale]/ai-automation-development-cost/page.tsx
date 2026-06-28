import { makeCostGuidePage } from "@/lib/cost-guides/create-page";

const page = makeCostGuidePage("ai-automation-development-cost");
export const generateMetadata = page.generateMetadata;
export default page.default;
