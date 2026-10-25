import Link from "next/link";
import { ArrowRight } from "lucide-react";
import templates from "@/data/templates.json";
import { getMedia } from "@/lib/media";
import { Carousel, CarouselItem } from "./Carousel";
import { TemplateCard } from "./TemplateCard";

export function TemplateGallery() {
  return (
    <section id="templates" aria-labelledby="templates-heading" className="scroll-mt-20">
      <h2 id="templates-heading" className="text-display font-normal tracking-tight">
        Template gallery
      </h2>
      <p className="mt-3 max-w-2xl text-md text-ink-2">
        Discover curated template groups designed to help you start faster and build with confidence.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-14">
        {templates.groups.map((group) => (
          <section key={group.id} aria-labelledby={`${group.id}-heading`}>
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 id={`${group.id}-heading`} className="text-section font-normal tracking-wide uppercase">
                {group.title}
              </h3>
              <Link href={`/?group=${group.id}#templates`} className="inline-flex items-center gap-1.5 rounded-chip text-md text-accent-ink hover:underline hover:underline-offset-4">
                See all
                <ArrowRight aria-hidden="true" size={16} />
                <span className="sr-only">{group.title.toLowerCase()}</span>
              </Link>
            </div>
            <Carousel label={group.title}>
              {group.templates.map((template) => (
                <CarouselItem key={template.id}>
                  <TemplateCard template={template} media={getMedia(template.media)} />
                </CarouselItem>
              ))}
            </Carousel>
          </section>
        ))}
      </div>
    </section>
  );
}
