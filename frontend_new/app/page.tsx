import Footer from "@/components/layout/footer";
import ContactSection from "@/components/sections/ContactSection";
import DesignSection from "@/components/sections/DesignSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Hero from "@/components/sections/hero";
import ProductSection from "@/components/sections/ProductSection";
import SupportSection from "@/components/sections/SupportSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <ProductSection />
      <DesignSection />
      <SupportSection />
      <ContactSection />
      
      <Footer />
    </>
  );
}