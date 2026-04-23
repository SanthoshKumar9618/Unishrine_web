"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLead } from "@/lib/api/lead.api";
import { X } from "lucide-react";

export default function Zeva() {
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
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = await createLead(form);

      if (!data.success) {
        throw new Error("Failed to create lead");
      }

      localStorage.setItem("lead_id", data.id);
      router.push("/demo-call");
    } catch (error) {
      console.error(error);
      alert("Failed to submit requirement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          borderRadius: "20px",
          padding: "40px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2
              style={{
                color: "#111827",
                fontSize: "36px",
                fontWeight: 700,
                margin: 0,
              }}
            >
              AI Agent Demo
            </h2>

            <p
              style={{
                marginTop: "8px",
                marginBottom: 0,
                color: "#6b7280",
                fontSize: "15px",
              }}
            >
              Let’s understand your business requirements and prepare your AI
              voice assistant demo.
            </p>
          </div>

          <button
            onClick={() => router.back()}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "1px solid #e5e7eb",
              background: "#ffffff",
              color: "#111827",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="d-flex flex-column gap-3">
          <input
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Your company name"
            value={form.company}
            onChange={(e) => handleChange("company", e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="+91 00000 00000"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            style={inputStyle}
          />

          <textarea
            rows={5}
            placeholder="Tell us about your project..."
            value={form.requirement}
            onChange={(e) => handleChange("requirement", e.target.value)}
            style={{
              ...inputStyle,
              resize: "none",
              height: "140px",
              paddingTop: "18px",
            }}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              marginTop: "10px",
              height: "56px",
              border: "none",
              borderRadius: "999px",
              background:
                "linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)",
              color: "#ffffff",
              fontSize: "17px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(37,99,235,0.15)",
            }}
          >
            {loading ? "Submitting..." : "Start Demo Call"}
          </button>
        </div>
      </div>
    </section>
  );
}

const inputStyle = {
  width: "100%",
  height: "56px",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  background: "#ffffff",
  padding: "0 18px",
  fontSize: "15px",
  outline: "none",
  color: "#111827",
  boxShadow: "none",
} as const;