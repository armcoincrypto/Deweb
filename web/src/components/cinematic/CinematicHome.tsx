"use client";

import { PinnedServiceExperience } from "./PinnedServiceExperience";
import { SocialProof } from "@/components/home/SocialProof";
import { HomePortfolio } from "@/components/home/HomePortfolio";
import { TicTacToeFloating } from "@/components/home/TicTacToeFloating";
import type { PinnedHomeSlide } from "@/lib/home-pinned-services-data";
import { pinnedHomeSlides } from "@/lib/home-pinned-services-data";

type CinematicHomeProps = {
  pinnedSlides?: PinnedHomeSlide[];
};

/** Homepage — hero + services scroll story, trust, and portfolio only */
export function CinematicHome({ pinnedSlides = pinnedHomeSlides }: CinematicHomeProps) {
  return (
    <div className="cinematic-home">
      <TicTacToeFloating />
      <PinnedServiceExperience slides={pinnedSlides} />
      <SocialProof />
      <HomePortfolio />
    </div>
  );
}
