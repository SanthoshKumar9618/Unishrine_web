import Link from "next/link";
import Image from "next/image";

export default function AboutStory() {
  return (
    <section className="story-section">
      <div className="divider"></div>

      <div className="container">
        <div className="row g-4 align-items-start">

          {/* LEFT CONTENT */}
          <div className="col-12 col-lg-8 col-xxl-9">
            <div className="section-heading">
              <h2 className="mb-3">Our Story</h2>

              <p className="mb-4">
                At UNISHRINE, we exist to bridge the gap between ideas and execution.
                In many organizations, innovation is never the problem—execution is.
                Internal teams are often overloaded, priorities compete, and progress slows down.
                That’s where we come in.
              </p>

              <p className="mb-4">
                We act as a technology partner, helping businesses move faster with clarity and precision.
                From custom software systems to intelligent automation and scalable digital platforms,
                we build solutions that simplify complexity and deliver real business outcomes.
              </p>

              <p className="mb-5">
                Our approach combines enterprise-grade reliability with startup agility—ensuring that
                every product we build is not only powerful, but also intuitive, efficient, and designed
                for long-term growth.
              </p>
            </div>

            {/* FEATURES */}
            <div className="row g-4 align-items-start">
              <div className="col-12 col-md-6">
                <ul className="about-list list-unstyled">
                  <li>
                    <svg width="20" height="20">
                      <use href="#checkIcon3"></use>
                    </svg>
                    Faster execution with startup agility
                  </li>

                  <li>
                    <svg width="20" height="20">
                      <use href="#checkIcon3"></use>
                    </svg>
                    Simplifying complex systems with clarity
                  </li>

                  <li>
                    <svg width="20" height="20">
                      <use href="#checkIcon3"></use>
                    </svg>
                    Intelligent automation for efficiency
                  </li>

                  <li>
                    <svg width="20" height="20">
                      <use href="#checkIcon3"></use>
                    </svg>
                    Scalable solutions built for long-term growth
                  </li>
                </ul>

                <div className="divider-sm"></div>

                <Link href="/contact" className="btn btn-dark">
                  <span>
                    Work With Us <i className="ti ti-arrow-up-right"></i>
                  </span>
                  <span>
                    Work With Us <i className="ti ti-arrow-up-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE IMAGES */}
          <div className="col-12 col-lg-4 col-xxl-3">
            <div className="story-images-wrapper">
              <div className="story-images">
                <Image
                  src="/assets/img/bg-img/ourStrory1.png"
                  alt="About visual"
                  width={400}
                  height={300}
                  className="story-img"
                  priority
                />

                <Image
                  src="/assets/img/bg-img/ourStory2.png"
                  alt="About visual"
                  width={400}
                  height={300}
                  className="story-img"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="divider"></div>
      </div>
    </section>
  );
}