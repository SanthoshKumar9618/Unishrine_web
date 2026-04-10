"use client";

import { motion } from "framer-motion";
import Container from "../ui/container";
import Image from "next/image";

const items = [
  {
    title: "Easy-to-Use Design",
    desc: "Usability-first flows keep stakeholders moving with confidence.",
  },
  {
    title: "Visual Brand Experience",
    desc: "Every screen feels professional and trustworthy with cohesive typography, color, and motion.",
  },
];

export default function DesignSection() {
  return (
    <section className="relative py-24 md:py-28 overflow-hidden">

      {/* 🌐 background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

      <Container>
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">

          {/* ================= LEFT CONTENT ================= */}
          <div className="max-w-xl">

            <p className="text-xs tracking-widest text-gray-500 uppercase">
              DESIGN & USER EXPERIENCE
            </p>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
              Design That Works for You
            </h2>

            <p className="mt-4 text-gray-600">
              Every interaction is mapped to user intent—capturing clarity,
              spacing, and structure while elevating your brand presence.
            </p>

            {/* features */}
            <div className="mt-10 space-y-6">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative p-6 rounded-2xl 
                  bg-blue-100 border border-gray-200 shadow-sm 
                  hover:shadow-md transition-all duration-300"
                >
                  {/* hover gradient */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition
                  bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent" />

                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* ================= RIGHT VISUAL ================= */}
          <div className="relative h-[420px] md:h-[520px] lg:h-full min-h-[420px] rounded-3xl overflow-hidden">

            {/* base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 opacity-90 z-0" />

            {/* IMAGE FULL COVER */}
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
             <Image
              src="/images/design.png"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Design"
            />
            </motion.div>

            {/* overlay for readability */}
            <div className="absolute inset-0 bg-black/20 z-20" />

            {/* animated glow effects */}
            <motion.div
              className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-blue-400/30 blur-[100px] rounded-full z-30"
              animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
            />

            <motion.div
              className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-purple-400/30 blur-[100px] rounded-full z-30"
              animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
              transition={{ duration: 14, repeat: Infinity }}
            />

          </div>

        </div>
      </Container>
    </section>
  );
}