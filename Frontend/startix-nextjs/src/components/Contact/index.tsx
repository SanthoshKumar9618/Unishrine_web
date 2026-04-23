import Breadcrumb from "@/common/Breadcrumb";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import ContactArea from "./ContactArea";

export default function Contact() {
  return (
     <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <ContactArea />                             
        
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  )
}