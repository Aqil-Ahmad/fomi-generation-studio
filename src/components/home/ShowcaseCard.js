import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ShowcaseVideo } from "./ShowcaseVideo";
import styles from "./Hero.module.css";

export function ShowcaseCard({ card, media, index }) {
  const isVideo = media.type === "video";
  const href = isVideo ? "/?mode=video#create" : "/?mode=image#create";

  return (
    <Link
      href={href}
      className={cn(styles.card, card.size === "large" && styles.large, card.effect && styles[card.effect])}
      style={{ "--x": card.x, "--y": card.y, "--w": card.w, "--ratio": card.ratio, "--i": index }}
    >
      {isVideo ? (
        <ShowcaseVideo media={media} autoplay={card.autoplay} className={styles.media} />
      ) : (
        <Image
          src={media.src}
          alt=""
          fill
          sizes={card.size === "large" ? "(min-width: 1024px) 38vw, 80vw" : "(min-width: 1024px) 18vw, 45vw"}
          priority={card.size === "large" || index < 2}
          placeholder="blur"
          blurDataURL={media.blurDataURL}
          className={styles.media}
        />
      )}
      {card.effect === "compare" && (
        <span aria-hidden="true" className={styles.compareOverlay}>
          <span className={styles.knob} />
        </span>
      )}
      <span className={styles.label}>{card.label}</span>
    </Link>
  );
}
