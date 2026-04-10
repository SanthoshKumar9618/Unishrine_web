"use client";

import Container from "../ui/container";
import Image from "next/image";
import { Mail, Phone, Globe, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black text-gray-400">

      {/* subtle top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

      <Container>
        <div className="py-16 grid md:grid-cols-4 gap-10">

          {/* ================= BRAND ================= */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={36}
                height={36}
                className="brightness-0 invert" // 🔥 makes logo visible on dark
              />
              <span className="text-white font-semibold text-lg tracking-wide">
                UNISHRINE
              </span>
            </div>

            <p className="mt-4 text-gray-500 leading-relaxed">
              Building intelligent digital products powered by AI.
            </p>
          </div>

          {/* ================= NAVIGATION ================= */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Navigation
            </h4>

            <ul className="space-y-2">
              {["Home", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Contact
            </h4>

            <ul className="space-y-3">

              <li className="flex items-center gap-3 hover:text-white transition">
                <Globe size={16} className="text-gray-500" />
                <a href="https://www.unishrine.com" target="_blank">
                  unishrine.com
                </a>
              </li>

              <li className="flex items-center gap-3 hover:text-white transition">
                <Mail size={16} className="text-gray-500" />
                <a href="mailto:hello@unishrine.com">
                  hello@unishrine.com
                </a>
              </li>

              <li className="flex items-center gap-3 hover:text-white transition">
                <Phone size={16} className="text-gray-500" />
                <a href="tel:+919535105602">
                  +91 95351 05602
                </a>
              </li>

            </ul>
          </div>

          {/* ================= SOCIAL ================= */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Follow Us
            </h4>

            <div className="flex gap-4">

              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 border border-white/10 
                hover:bg-blue-500 hover:border-blue-500 
                transition-all duration-300 group"
              >
                <Linkedin
                  size={18}
                  className="text-gray-400 group-hover:text-white"
                />
              </a>

              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 border border-white/10 
                hover:bg-blue-500 hover:border-blue-500 
                transition-all duration-300 group"
              >
                <Twitter
                  size={18}
                  className="text-gray-400 group-hover:text-white"
                />
              </a>

            </div>
          </div>

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} UNISHRINE. All rights reserved.
        </div>

      </Container>
    </footer>
  );
}