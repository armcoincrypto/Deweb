import { makeCostGuidePage } from "@/lib/cost-guides/create-page";

const page = makeCostGuidePage("hire-full-stack-developers");
export const generateMetadata = page.generateMetadata;
export default page.default;
