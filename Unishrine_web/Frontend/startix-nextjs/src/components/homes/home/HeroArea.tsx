"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "BUILD SMARTER",
    subtitle: "GROW FASTER",
    desc: "We design AI-powered systems that scale your business and automate workflows.",
  },
  {
    title: "AUTOMATE BUSINESS",
    subtitle: "WITH AI",
    desc: "Transform operations with intelligent automation and real-time insights.",
  },
  {
    title: "CREATE DIGITAL",
    subtitle: "EXPERIENCES",
    desc: "We build scalable apps, platforms, and AI-driven products.",
  },
];

export default function HeroArea() {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="preview-hero-wrap"
      style={{ backgroundImage: "url(/assets/img/core-img/shape6.png)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-lg-9">

            <div className="hero-content text-center">

              {/* TITLE */}
              <h2 className="text-white mb-4 heading-word">
                {slides[index].title} <br />
                {slides[index].subtitle}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-white mb-5 px-lg-5">
                {slides[index].desc}
              </p>
      

              {/* DOTS */}
              <div className="mt-4 d-flex justify-content-center gap-2">
                {slides.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setIndex(i)}
                    style={{
                      width: i === index ? "20px" : "8px",
                      height: "8px",
                      borderRadius: "10px",
                      background: "white",
                      opacity: i === index ? 1 : 0.4,
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* HERO IMAGES (UNCHANGED UI) */}

        <div className="container">
            {/* your text */}
          </div>

          <div className="hero-img-group pt-lg-5">
            <Image
              className="w-100 h-auto"
              src="/assets/img/demo-img/hero1_image.png"
              alt=""
              width={1920}
              height={1080}
              priority
            />
          </div>

        {/* BACKGROUND SHAPES */}
        <Image className="bg-shape1 w-auto h-auto" src="/assets/img/core-img/curved-arrow2.png" alt="" width={1920} height={1080} priority/>
        <Image className="bg-shape2 w-auto h-auto" src="/assets/img/core-img/logo-star.png" alt="" width={1920} height={1080} priority/>
        <Image className="bg-shape3 w-auto h-auto" src="/assets/img/core-img/curved-arrow.png" alt="" width={1920} height={1080} priority/>
      </div>
    </div>
  );
}