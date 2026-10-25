import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Fomi · Figment of My Imagination",
    template: "%s · Fomi",
  },
  description: "Generate images and videos, edit photos and start from ready-made templates.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#131211" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <a
            href="#main"
            className="fixed top-2 left-2 z-50 -translate-y-16 rounded-control bg-ink px-4 py-2 text-sm font-medium text-canvas transition-transform focus-visible:translate-y-0"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
