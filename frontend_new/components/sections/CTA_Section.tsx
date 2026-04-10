"use client";

import Container from "../ui/container";
import AnimatedSection from "../ui/AnimatedSection";

export default function CTASection() {
  return (
    <Container>
      <AnimatedSection>
        <section className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Build Something Powerful?
          </h2>

          <p className="mt-4 text-white/70">
            Let’s transform your ideas into scalable products.
          </p>

          <button className="mt-6 px-6 py-3 bg-white text-black rounded-full hover:scale-105 transition">
            Get Started
          </button>
        </section>
      </AnimatedSection>
    </Container>
  );
}