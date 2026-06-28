"use client";

import dynamic from "next/dynamic";
import { PinnedServiceExperience } from "./PinnedServiceExperience";
import { SocialProof } from "@/components/home/SocialProof";
import { HomePortfolio } from "@/components/home/HomePortfolio";
import type { PinnedHomeSlide } from "@/lib/home-pinned-services-data";
import { pinnedHomeSlides } from "@/lib/home-pinned-services-data";

const TicTacToeFloating = dynamic(
  () => import("@/components/home/TicTacToeFloating").then((m) => ({ default: m.TicTacToeFloating })),
  { ssr: false }
);

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
