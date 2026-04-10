"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { createLead } from "@/lib/api/lead.api";

export default function RequirementForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    requirement: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };


const handleSubmit = async () => {
  try {
    setLoading(true);

    const data = await createLead(form);

    if (!data.success) {
      throw new Error("Failed to create lead");
    }

    localStorage.setItem("lead_id", data.id);
    router.push("/demo-call-config");

  } catch (error) {
    console.error(error);
    alert("Failed to submit requirement");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 p-6 md:p-8 text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold">
          AI Agent Demo
        </h2>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* FORM */}
      <div className="mt-6 space-y-4">

        <input
          placeholder="Enter your full name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full p-3 rounded-lg text-black"
        />

        <input
          placeholder="Your company name"
          value={form.company}
          onChange={(e) => handleChange("company", e.target.value)}
          className="w-full p-3 rounded-lg text-black"
        />

        <input
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full p-3 rounded-lg text-black"
        />

        <input
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full p-3 rounded-lg text-black"
        />

        <textarea
          placeholder="Tell us about your project..."
          rows={4}
          value={form.requirement}
          onChange={(e) => handleChange("requirement", e.target.value)}
          className="w-full p-3 rounded-lg text-black"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-white text-black font-medium py-3 rounded-full hover:opacity-90 transition"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        

      </div>
    </div>
  );
}