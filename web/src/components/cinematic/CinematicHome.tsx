"use client";

import { PinnedServiceExperience } from "./PinnedServiceExperience";
import { SocialProof } from "@/components/home/SocialProof";
import { WhyChoose } from "@/components/home/WhyChoose";
import { HomePortfolio } from "@/components/home/HomePortfolio";
import { HomeContact } from "@/components/home/HomeContact";

type CinematicHomeProps = {
  blogSection: React.ReactNode;
};

export function CinematicHome({ blogSection }: CinematicHomeProps) {
  return (
    <div className="cinematic-home">
      <PinnedServiceExperience />

      <SocialProof />
      <WhyChoose />
      <HomePortfolio />
      {blogSection}
      <HomeContact />
    </div>
  );
}
