"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../ui/container";
import Modal from "../ui/model";
import RequirementForm from "../ui/requirment";

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

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <Container>
<section id="hero" className="relative pt-16 pb-10 md:pt-20 md:pb-14 rounded-3xl overflow-hidden border border-white/10 shadow-xl">
        {/* Clean gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700" />

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Subtle animated glow */}
        <motion.div
          className="absolute -top-40 -left-40 w-[400px] h-[200px] bg-blue-500/20 rounded-full blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Content */}
<div className="relative z-10 px-6 py-10 md:py-12 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider text-white">
                {slides[index].title} <br />
                {slides[index].subtitle}
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-2xl mx-auto text-white/80 text-sm md:text-base">
                {slides[index].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <button
                onClick={() => setOpen(true)}
                className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
              >
                Get Started
              </button>

            
          </div>
          

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer
                  ${
                    i === index
                      ? "w-6 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={prev}
              className="ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/10 transition"
            >
              <ChevronLeft className="text-white" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={next}
              className="mr-4 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/10 transition"
            >
              <ChevronRight className="text-white" />
            </button>
          </div>

        </div>
      </section>
      <Modal open={open} onClose={() => setOpen(false)}>
        <RequirementForm onClose={() => setOpen(false)} />
      </Modal>
    </Container>
  );
}