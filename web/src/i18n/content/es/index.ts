import type { LocaleContentModule } from "@/lib/i18n/content/types";
import { legal } from "./legal";
import { homeServices } from "./home";
import { banners } from "./banners";
import { about } from "./about";
import { services } from "./services";
import { landings } from "./landings";
import { blog } from "./blog";

const content: LocaleContentModule = {
  legal,
  homeServices,
  banners,
  services,
  about,
  landings,
  blog,
};

export default content;
