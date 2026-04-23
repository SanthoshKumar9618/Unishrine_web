"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-section style-three">

      {/* ❌ removed divider */}
      

      <div className="container pt-80 pb-60">
        <div className="row g-5 justify-content-between">

          {/* LEFT */}
          <div className="col-12 col-md-6 col-lg-5">
            <div className="footer-card">

              <Link href="/" className="footer-logo mb-4 d-flex align-items-center">
                <Image
                  src="/assets/img/core-img/logo.svg"
                  alt="Unishrine"
                  width={40}
                  height={40}
                />
                <span className="fw-bold text-white ms-1" style={{ fontSize: "18px" }}>
                  UNISHRINE
                </span>
              </Link>

              <p>
                Building intelligent digital products powered by AI.
              </p>
              <ul className="footer-contact-list">

                              <li>📍 India</li>
                              <li>📞 +91 95351 05602</li>
                              <li>✉️ hello@unishrine.com</li>
                            </ul>


            </div>
          </div>

          {/* RIGHT (SOCIAL + CTA) */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="footer-card">

              <h4 className="mb-4 text-white">Get In Touch</h4>

              <p className="mb-4 fz-16">
                Let’s build something amazing together.
              </p>

              <div className="social-nav style-three">
                <a href="#"><i className="ti ti-brand-facebook"></i></a>
                <a href="#"><i className="ti ti-brand-linkedin"></i></a>
                <a href="#"><i className="ti ti-brand-x"></i></a>
                <a href="#"><i className="ti ti-brand-instagram"></i></a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ❌ removed divider */}

      {/* COPYRIGHT */}
      <div className="copyright-section">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

            <p className="mb-0 copyright style-two">
              © {new Date().getFullYear()} UNISHRINE. All rights reserved.
            </p>

            <ul className="copyright-nav list-unstyled d-flex gap-3">
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>

          </div>
        </div>
      </div>

    </footer>
  );
}