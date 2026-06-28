import { makeCostGuidePage } from "@/lib/cost-guides/create-page";

const page = makeCostGuidePage("custom-web-app-development-cost");
export const generateMetadata = page.generateMetadata;
export default page.default;
