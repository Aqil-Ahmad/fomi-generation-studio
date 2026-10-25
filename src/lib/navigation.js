import { Cpu, House, Image, Images, Sparkles, Video } from "lucide-react";

export const PRIMARY_NAV = [
  { href: "/", label: "Home", icon: House },
  { href: "/?mode=image#create", label: "Image", icon: Image },
  { href: "/?mode=video#create", label: "Video", icon: Video },
  { href: "/#templates", label: "Apps", icon: Sparkles },
  { href: "/#create", label: "Models", icon: Cpu },
  { href: "/#creations", label: "Gallery", icon: Images },
];

export const FOOTER_COLUMNS = [
  { title: "Fomi", links: ["About", "Login", "Pricing", "Contact", "Blogs"] },
  { title: "Image", links: ["Text to image", "Image to image", "Consistent characters", "Enhance image", "Edit image"] },
  { title: "Video", links: ["Video studio", "Text to video", "Image to video", "Upscale video", "Motion transfer"] },
  { title: "Apps", links: ["Music generation", "Lip sync", "Insta dump", "Templates"] },
];
