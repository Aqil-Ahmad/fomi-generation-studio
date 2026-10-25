import images from "@/data/images.json";
import videos from "@/data/videos.json";

const byId = new Map([...images.images, ...videos.videos].map((item) => [item.id, item]));

export function getMedia(id) {
  const item = byId.get(id);
  if (!item) throw new Error(`Unknown media: ${id}`);
  return item;
}

export function mediaPool(mode) {
  return mode === "video" ? videos.videos : images.images;
}

export function allMedia() {
  return [...byId.values()];
}
