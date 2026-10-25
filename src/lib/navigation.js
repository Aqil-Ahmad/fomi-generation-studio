import { ChipIcon, HomeIcon, ImageIcon, SparkleIcon, VideoIcon } from "@/components/layout/NavIcons";

export const PRIMARY_NAV = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/?mode=image#create", label: "Image", icon: ImageIcon },
  { href: "/?mode=video#create", label: "Video", icon: VideoIcon },
  { href: "/#templates", label: "Apps", icon: SparkleIcon },
  { href: "/#create", label: "Models", icon: ChipIcon },
  { href: "/#creations", label: "Gallery", icon: ImageIcon },
];

export const FOOTER_COLUMNS = [
  { title: "Fomi", links: ["About", "Login", "Pricing", "Contact", "Blogs"] },
  { title: "Image", links: ["Text to image", "Image to image", "Consistent characters", "Enhance image", "Edit image"] },
  { title: "Video", links: ["Video studio", "Text to video", "Image to video", "Upscale video", "Motion transfer"] },
  { title: "Apps", links: ["Music generation", "Lip sync", "Insta dump", "Templates"] },
];
