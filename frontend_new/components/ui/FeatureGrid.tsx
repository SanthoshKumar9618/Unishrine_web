"use client";

import { motion } from "framer-motion";

interface Feature {
  title: string;
  desc: string;
}

interface Props {
  label: string;
  heading: string;
  features: Feature[];
}

export default function FeatureGrid({ label, heading, features }: Props) {
  return (
    <div>

      {/* HEADER */}
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs tracking-widest text-blue-600 font-semibold">
          {label}
        </p>

        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
          {heading}
        </h2>
      </div>

      {/* GRID */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {features.map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative rounded-2xl border border-gray-200 bg-blue-100 p-6 
            shadow-sm hover:shadow-lg transition-all duration-300"
          >

            {/* SUBTLE BRAND GLOW */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300
            bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent" />

            {/* CONTENT */}
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>

          </motion.div>
        ))}

      </div>
    </div>
  );
}