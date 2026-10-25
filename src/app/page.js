import { CreateSection } from "@/components/create/CreateSection";
import { Hero } from "@/components/home/Hero";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { ToastProvider } from "@/components/ui/Toast";

export default function Home() {
  return (
    <ToastProvider>
      <Header />
      <main id="main" className="pb-16">
        <CreateSection>
          <Hero />
        </CreateSection>
      </main>
      <Footer />
      <MobileNav />
    </ToastProvider>
  );
}
