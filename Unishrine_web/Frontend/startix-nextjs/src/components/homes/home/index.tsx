import HeaderOne from "@/layouts/headers/HeaderOne";
import HeroArea from "./HeroArea";

import Footer from "./Footer";
import Wrapper from "@/layouts/Wrapper";
import DesignUXSection from "./DesignUXSection";
import OurServices from "./OurServices";

export default function HomePreview() {
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroArea />
          <OurServices />
          <DesignUXSection />
          
          <Footer />
        </div>
      </div>
    </Wrapper>
  )
}