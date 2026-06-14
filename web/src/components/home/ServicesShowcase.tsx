"use client";

import { Link } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceCategories } from "@/lib/home-services-data";

export function ServicesShowcase() {
  return (
    <section className="section-padding" aria-labelledby="services-showcase-heading">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Services"
          title="What we build for your business"
          subtitle="Websites, Shopify stores, AI chatbots, automation, and custom digital tools."
          id="services-showcase-heading"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="content-panel group rounded-2xl p-6 transition-all hover:border-deweb-cyan/30"
            >
              <span className="text-2xl">{service.icon}</span>
              <h3 className="mt-3 text-lg font-bold text-white group-hover:text-deweb-cyan">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-white/75">{service.what}</p>
              <span className="mt-4 inline-flex text-sm font-bold text-deweb-cyan">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
