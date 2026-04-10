"use client";

import Container from "../ui/container";
import FeatureGrid from "../ui/FeatureGrid";

export default function ProductSection() {
  const features = [
    {
      title: "Custom Business Software",
      desc: "Operational platforms designed end-to-end for your workflows.",
    },
    {
      title: "Mobile App Creation (Apple/Android)",
      desc: "Native-like experiences with offline resilience and secure data flows.",
    },
    {
      title: "Website & E-commerce Stores",
      desc: "High-converting marketing sites and storefronts with enterprise-grade stability.",
    },
  ];

  return (
    <section id="products" className="relative py-6 md:py-8 bg-gray-1 overflow-hidden">

      {/* top separator */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <Container>
        <div className="relative rounded-3xl border border-gray-200 bg-white shadow-xl p-8 md:p-12">

          <FeatureGrid
            label="DIGITAL PRODUCTS & APPS"
            heading="The Right Tool, Built the Right Way"
            features={features}
          />

        </div>
      </Container>
    </section>
  );
}