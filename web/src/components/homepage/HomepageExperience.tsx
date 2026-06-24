"use client";

import { HomepageHero } from "./HomepageHero";
import { HomepageTrustBar } from "./HomepageTrustBar";
import { HomepageServices } from "./HomepageServices";
import { HomepageWhy } from "./HomepageWhy";
import { HomepageProcess } from "./HomepageProcess";
import { HomepagePortfolio } from "./HomepagePortfolio";
import { HomepageTestimonials } from "./HomepageTestimonials";
import { HomepageAbout } from "./HomepageAbout";
import { HomepageContact } from "./HomepageContact";
import type { PinnedHomeSlide } from "@/lib/home-pinned-services-data";
import { pinnedHomeSlides } from "@/lib/home-pinned-services-data";

type Props = {
  blogSection: React.ReactNode;
  pinnedSlides?: PinnedHomeSlide[];
};

/** Premium 2026 homepage — cinematic scroll storytelling */
export function HomepageExperience({
  blogSection,
  pinnedSlides = pinnedHomeSlides,
}: Props) {
  return (
    <div className="homepage-experience">
      <HomepageHero />
      <div className="content-auto">
        <HomepageTrustBar />
      </div>
      <div className="content-auto">
        <HomepageServices slides={pinnedSlides} />
      </div>
      <div className="content-auto">
        <HomepageWhy />
      </div>
      <div className="content-auto">
        <HomepageProcess />
      </div>
      <div className="content-auto">
        <HomepagePortfolio />
      </div>
      <div className="content-auto">
        <HomepageTestimonials />
      </div>
      <div className="content-auto">
        <HomepageAbout />
      </div>
      <div className="content-auto">{blogSection}</div>
      <HomepageContact />
    </div>
  );
}
