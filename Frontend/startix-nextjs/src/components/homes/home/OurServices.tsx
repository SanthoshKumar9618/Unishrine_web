import Link from "next/link";
import Image from "next/image";

export default function OurServices() {
  return (
    <div id="services" className="homepage-wrap">

      <div className="divider"></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7 col-xxl-6">
            <div className="section-heading text-center">

              <h2 className="mb-3">
                
                Our Solutions
              </h2>

              <p className="mb-0">
                We deliver AI-powered and scalable digital solutions to automate, optimize, and grow your business.
              </p>

            </div>
          </div>
        </div>

        <div className="divider-sm"></div>

        <div className="row g-5 justify-content-center">

          {/* 1 */}
          <div className="col-12 col-sm-6 col-xl-4">
            <div className="homepage-card">
              <Image src="/assets/img/demo-img/bussiness_imag.png" alt="" width={1920} height={1980} priority/>
              
            </div>
            <h3 className="text-center mt-4">Business Automation</h3>
          </div>

          {/* 2 */}
          <div className="col-12 col-sm-6 col-xl-4">
            <div className="homepage-card">
              <Image src="/assets/img/demo-img/chatBoot.png" alt="" width={1920} height={1080} priority/>
              
            </div>
            <h3 className="text-center mt-4">Smart Chatbots & AI Assistants</h3>
          </div>

          {/* 3 */}
          <div className="col-12 col-sm-6 col-xl-4">
            <div className="homepage-card">
              <Image src="/assets/img/demo-img/Cus_buss.png" alt="" width={1920} height={1080} priority/>
              
            </div>
            <h3 className="text-center mt-4">Custom Business Software</h3>
          </div>

          {/* 4 */}
          <div className="col-12 col-sm-6 col-xl-4">
            <div className="homepage-card">
              <Image src="/assets/img/demo-img/mobile_app.png" alt="" width={1920} height={1080} priority/>
              
            </div>
            <h3 className="text-center mt-4">
              Mobile App Creation (iOS/Android)
            </h3>
          </div>

          {/* 5 */}
          <div className="col-12 col-sm-6 col-xl-4">
            <div className="homepage-card">
              <Image src="/assets/img/demo-img/E-commerce.png" alt="" width={1920} height={1080} priority/>
              
            </div>
            <h3 className="text-center mt-4">
              Website & E-commerce Stores
            </h3>
          </div>

        </div>
      </div>

      <div className="divider"></div>
    </div>
  );
}