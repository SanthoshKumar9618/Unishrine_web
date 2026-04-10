"use client";

import { motion } from "framer-motion";
import { Cpu, Bot, Workflow } from "lucide-react";
import Container from "../ui/container";

/* Stagger animation */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

export default function FeaturesSection() {
  const features = [
    {
      icon: Workflow,
      title: "Business Task Automation",
      desc: "Automate workflows and remove repetitive operations to increase productivity.",
    },
    {
      icon: Cpu,
      title: "Custom AI Intelligence",
      desc: "Build intelligent systems that learn from data and optimize decisions.",
    },
    {
      icon: Bot,
      title: "Smart Assistants",
      desc: "Deploy AI assistants that handle operations and customer interactions.",
    },
  ];

  return (
    <section id="features" className="py-12 md:py-14 bg-white">
      <Container>
        <div>

          {/* 🔹 Soft separator (fix for your issue) */}
          <div className="flex justify-center mb-10">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          {/* HEADER */}
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs tracking-widest text-gray-500 uppercase">
              OUR CORE FOCUS
            </p>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
              We Solve Your Toughest Business Problems
            </h2>

            <p className="mt-4 text-gray-600">
              We design intelligent systems that automate workflows, enhance
              decision-making, and scale your business efficiently.
            </p>
          </div>

          {/* CARDS */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-14 grid md:grid-cols-3 gap-6"
          >
            {features.map((f, i) => {
              const Icon = f.icon;

              return (
                <motion.div
                  key={i}
                  variants={item}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative p-6 rounded-2xl 
                  bg-blue-100 border border-gray-200 shadow-md 
                  hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative z-10">

                    {/* ICON */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl 
                    bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
                      <Icon size={22} className="text-white" />
                    </div>

                    {/* TITLE */}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {f.title}
                    </h3>

                    {/* DESC */}
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                      {f.desc}
                    </p>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </Container>
    </section>
  );
}