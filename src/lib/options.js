export const MODES = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
];

export const COUNTS = [1, 2, 3, 4];

export const ASPECT_RATIOS = [
  { value: "1:1", label: "1:1", detail: "Square" },
  { value: "4:5", label: "4:5", detail: "Portrait" },
  { value: "3:4", label: "3:4", detail: "Classic portrait" },
  { value: "16:9", label: "16:9", detail: "Widescreen" },
  { value: "9:16", label: "9:16", detail: "Stories and reels" },
];

export const MODELS = {
  image: [
    { value: "fomi-image-2", label: "Fomi Image 2", detail: "Best all-round quality" },
    { value: "fomi-photoreal", label: "Fomi Photoreal", detail: "Lifelike portraits and products" },
    { value: "fomi-anime", label: "Fomi Anime", detail: "Illustration and anime styles" },
  ],
  video: [
    { value: "fomi-video-1", label: "Fomi Video 1", detail: "Smooth 5 second clips" },
    { value: "fomi-motion", label: "Fomi Motion", detail: "Stronger camera movement" },
  ],
};

export const DEFAULT_SETTINGS = {
  mode: "image",
  count: 1,
  aspectRatio: "1:1",
  model: MODELS.image[0].value,
};

export const PROMPT_LIMIT = 1000;

export function ratioToNumber(aspectRatio) {
  const [width, height] = aspectRatio.split(":").map(Number);
  return width / height;
}

export function modelLabel(mode, value) {
  return MODELS[mode]?.find((model) => model.value === value)?.label ?? value;
}
