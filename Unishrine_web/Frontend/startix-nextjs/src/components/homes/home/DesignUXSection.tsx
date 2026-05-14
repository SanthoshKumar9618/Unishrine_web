import Image from "next/image";

export default function DesignUXSection() {
  return (
    <div className="feature-area pt-120 pb-60">
      <div className="container">

        {/* SECTION HEADER */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-7">
            <div className="section-heading text-center mb-60">
              <h2>Design & User Experience</h2>
              <p>
                Every interaction is designed with purpose — delivering clarity,
                usability, and brand consistency.
              </p>
            </div>
          </div>
        </div>

        {/* FIRST ROW */}
        <div className="row g-4 justify-content-center">

          <div className="col-12 col-md-6 col-lg-4">
            <div className="feature-card custom-feature-card text-center p-4 h-100">
              <div className="mb-3">
                <i className="ti ti-layout-dashboard fs-1"></i>
              </div>
              <h5>Design That Works for You</h5>
              <p>
                Every interaction is mapped to user intent—ensuring clarity and
                structured user journeys.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="feature-card custom-feature-card text-center p-4 h-100">
              <div className="mb-3">
                <i className="ti ti-click fs-1"></i>
              </div>
              <h5>Easy-to-Use Design</h5>
              <p>
                Usability-first flows keep users and stakeholders moving with
                confidence.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="feature-card custom-feature-card text-center p-4 h-100">
              <div className="mb-3">
                <i className="ti ti-palette fs-1"></i>
              </div>
              <h5>Visual Brand Experience</h5>
              <p>
                Cohesive typography, color, and motion create a professional
                and trustworthy experience.
              </p>
            </div>
          </div>

        </div>

        {/* SECOND ROW */}
        <div className="row g-4 mt-2">

          <div className="col-12 col-md-6">
            <div className="feature-card custom-feature-card text-center p-4 h-100">
              <div className="mb-3">
                <i className="ti ti-briefcase fs-1"></i>
              </div>
              <h5>More Than A Vendor</h5>
              <p>
                We act as your long-term technology partner, helping you scale
                and evolve your systems.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="feature-card custom-feature-card text-center p-4 h-100">
              <div className="mb-3">
                <i className="ti ti-settings fs-1"></i>
              </div>
              <h5>Technology Roadmap & Support</h5>
              <p>
                Strategic planning, continuous monitoring, and maintenance
                ensure your product stays competitive.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}