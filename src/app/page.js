import { CreateSection } from "@/components/create/CreateSection";
import { Hero } from "@/components/home/Hero";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { TemplateGallery } from "@/components/templates/TemplateGallery";
import { ToastProvider } from "@/components/ui/Toast";

export default function Home() {
  return (
    <ToastProvider>
      <Header />
      <main id="main">
        <CreateSection>
          <Hero />
        </CreateSection>
        <div className="mx-auto max-w-[1680px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <TemplateGallery />
        </div>
      </main>
      <Footer />
      <MobileNav />
    </ToastProvider>
  );
}
