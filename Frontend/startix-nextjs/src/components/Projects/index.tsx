"use client";

import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import ProjectsArea from "./ProjectsArea";

export default function Projects() {
  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
        
          <ProjectsArea />                           
         
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  )
}
