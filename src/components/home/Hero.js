import showcase from "@/data/showcase.json";
import { getMedia } from "@/lib/media";
import { ShowcaseCard } from "./ShowcaseCard";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="mx-auto max-w-[1680px] px-4 pt-5 sm:px-6 lg:px-8">
      <h1 id="hero-heading" className="text-center text-display font-normal tracking-tight">
        Figment of My Imagination
      </h1>
      <p className="sr-only">Generate images and videos, edit and upscale them, and keep characters consistent.</p>
      <div className={styles.stage}>
        {showcase.cards.map((card, index) => (
          <ShowcaseCard key={card.id} card={card} media={getMedia(card.media)} index={index} />
        ))}
      </div>
    </section>
  );
}
