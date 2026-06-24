"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/animations";
import { cn } from "@/lib/utils";

export type FaqItem = { question: string; answer: string };

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
  title?: string;
  defaultOpen?: string;
};

export function FaqAccordion({ items, className, title, defaultOpen = "faq-0" }: FaqAccordionProps) {
  return (
    <ScrollReveal as="section" className={className} aria-labelledby={title ? "faq-heading" : undefined}>
      {title && (
        <h2 id="faq-heading" className="text-2xl font-bold text-white sm:text-3xl">
          {title}
        </h2>
      )}
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpen}
        className={cn("mt-6 space-y-2", title && "mt-6")}
      >
        {items.map((faq, i) => (
          <AccordionItem
            key={faq.question}
            value={`faq-${i}`}
            className="glass-panel overflow-hidden rounded-xl border border-white/10 px-5 sm:px-6"
          >
            <AccordionTrigger className="hover:no-underline">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollReveal>
  );
}
