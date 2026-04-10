"use client";

import { useState } from "react";
import Container from "../ui/container";
import { Mail, Phone, Globe, MapPin } from "lucide-react";
import Modal from "../ui/model";
import RequirementForm from "../ui/requirment";

type ContactItem = {
  label: string;
  value: string;
  type: "link" | "email" | "phone" | "text";
  icon: any;
};

export default function ContactSection() {
  const [open, setOpen] = useState(false);
  const contacts: ContactItem[] = [
    {
      label: "Website",
      value: "https://www.unishrine.com",
      type: "link",
      icon: Globe,
    },
    {
      label: "Mobile",
      value: "+91 95351 05602",
      type: "phone",
      icon: Phone,
    },
    {
      label: "Founder",
      value: "ganesh@unishrine.com",
      type: "email",
      icon: Mail,
    },
    {
      label: "Email",
      value: "hello@unishrine.com",
      type: "email",
      icon: Mail,
    },
    {
      label: "Office",
      value:
        "HBR Layout, Bengaluru, India",
      type: "text",
      icon: MapPin,
    },
  ];

  const handleClick = (item: ContactItem) => {
    switch (item.type) {
      case "link":
        window.open(item.value, "_blank");
        break;
      case "email":
        window.location.href = `mailto:${item.value}`;
        break;
      case "phone":
        window.location.href = `tel:${item.value}`;
        break;
      default:
        navigator.clipboard.writeText(item.value);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Container>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="max-w-xl">

            <p className="text-xs tracking-widest text-blue-800 uppercase">
              CONTACT
            </p>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
              Let’s Build Something Intelligent Together
            </h2>

            <p className="mt-4 text-gray-600">
              Reach out for project scoping, AI advisory, or rapid prototyping.
              We respond within one business day.
            </p>

            {/* CTA */}
            <div className="mt-8 flex gap-4 flex-wrap">
              <button
                onClick={() => setOpen(true)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition">
              
                Get Started
              </button>

              <button className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                Schedule Call
              </button>
            </div>

          </div>

          {/* RIGHT SIDE (CONTACT PANEL) */}
          <div className="relative rounded-3xl border border-gray-200 bg-white shadow-xl p-6 md:p-8">

            {/* subtle highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

            <div className="divide-y divide-gray-200">

              {contacts.map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    onClick={() => handleClick(item)}
                    className="flex items-center justify-between py-4 gap-4 cursor-pointer group"
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 group-hover:bg-blue-50 transition">
                        <Icon size={16} className="text-gray-600 group-hover:text-blue-600" />
                      </div>
                      <span>{item.label}</span>
                    </div>

                    {/* RIGHT */}
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">
                      {item.type === "link"
                        ? item.value.replace("https://", "")
                        : item.value}
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
                <RequirementForm onClose={() => setOpen(false)} />
              </Modal>

      </Container>
    </section>
  );
}