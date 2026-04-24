import Breadcrumb from "@/common/Breadcrumb";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import FaqArea from "./FaqArea";

export default function Faq() {
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Breadcrumb title="Faqs" pageLink="Faqs" />
          <FaqArea />           
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  )
}