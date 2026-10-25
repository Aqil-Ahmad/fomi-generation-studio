import { Hero } from "@/components/home/Hero";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="pb-16">
        <Hero />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
