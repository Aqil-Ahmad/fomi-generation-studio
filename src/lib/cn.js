import { extendTailwindMerge } from "tailwind-merge";

const merge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["2xs", "xs", "sm", "base", "md", "lg", "xl", "2xl", "section", "display"],
      radius: ["tiny", "chip", "control", "card", "panel"],
      shadow: ["card", "float", "bar"],
    },
  },
});

export function cn(...classes) {
  return merge(classes.filter(Boolean).join(" "));
}
