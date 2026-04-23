"use client";

import Link from "next/link";
import Image from "next/image";

export default function FooterOne() {
  return (
    <footer className="footer-section">

      {/* TOP DIVIDER (KEEP THEME) */}
      <div className="divider"></div>

      <div className="container">
        <div className="row g-5 g-md-4 g-xl-5 justify-content-between">

          {/* LEFT (YOUR CONTENT) */}
          <div className="col-12 col-sm-6 col-md-6 col-xl-5">
            <div className="footer-card me-lg-5">

              <Link href="/" className="footer-logo mb-4 d-flex align-items-center">
                <Image
                  src="/assets/img/core-img/logo.svg"
                  alt="Unishrine"
                  width={40}
                  height={40}
                />
                <span className="fw-bold ms-1" style={{ fontSize: "18px" }}>
                  UNISHRINE
                </span>
              </Link>

              <p>
                Building intelligent digital products powered by AI.
              </p>

              <ul className="list-unstyled footer-nav-two mt-3">
                <li>📍 India</li>
                <li>📞 +91 95351 05602</li>
                <li>✉️ hello@unishrine.com</li>
              </ul>

             

            </div>
          </div>

          {/* RIGHT (CONTACT CTA BLOCK) */}
          <div className="col-12 col-sm-6 col-md-6 col-xl-4">
                <div className="footer-card">

                  <h5 className="mb-3">Get In Touch</h5>

                  <p className="mb-3">
                    Let’s build something amazing together.
                  </p>

                  {/* SOCIAL (compact) */}
                  <div className="social-nav">
                    <a href="#"><i className="ti ti-brand-facebook"></i></a>
                    <a href="#"><i className="ti ti-brand-linkedin"></i></a>
                    <a href="#"><i className="ti ti-brand-x"></i></a>
                    <a href="#"><i className="ti ti-brand-instagram"></i></a>
                  </div>

                </div>
              </div>
        </div>
      </div>

      {/* BOTTOM DIVIDER (KEEP THEME) */}
      

      {/* COPYRIGHT (THEME STYLE + YOUR CONTENT) */}
      <div className="container">
        <div className="copyright-section d-flex flex-wrap justify-content-between align-items-center">

          <p className="mb-0 copyright">
            © {new Date().getFullYear()} UNISHRINE. All rights reserved.
          </p>

          <div className="d-flex gap-3">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>

        </div>
      </div>

    </footer>
  );
}