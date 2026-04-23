import AboutStory from "./AboutStory";
import Wrapper from "@/layouts/Wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";


export default function Aboutus() {
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <AboutStory />
          
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  )
}
