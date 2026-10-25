import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import styles from "./TemplateCard.module.css";

const SIZES = "(min-width: 1024px) 240px, (min-width: 640px) 32vw, 46vw";

function Picture({ media, focus, className }) {
  return (
    <Image
      src={media.src}
      alt=""
      fill
      sizes={SIZES}
      placeholder="blur"
      blurDataURL={media.blurDataURL}
      className={cn(styles.picture, className)}
      style={focus ? { objectPosition: focus } : undefined}
    />
  );
}

export function TemplateCard({ template, media }) {
  const { effect, before, focus } = template;
  const beforeClass = before && styles[before];

  return (
    <Link href={`/?template=${template.id}#create`} className={styles.card}>
      <span className={styles.media}>
        <Picture media={media} focus={focus} />

        {effect === "split" && (
          <span aria-hidden="true" className={styles.split}>
            <Picture media={media} focus={focus} className={beforeClass} />
          </span>
        )}

        {effect === "inset" && (
          <span aria-hidden="true" className={styles.inset}>
            <Picture media={media} focus={focus} className={beforeClass} />
            {before === "watermark" && <span className={styles.watermarkText}>SAMPLE</span>}
          </span>
        )}

        {effect === "frame" && <span aria-hidden="true" className={styles.frame} />}

        {effect === "badge" && (
          <span aria-hidden="true" className={styles.badge}>
            Top
            <strong>10</strong>
          </span>
        )}
      </span>
      <span className={styles.label}>{template.title}</span>
    </Link>
  );
}
