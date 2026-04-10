"use client";

import Container from "../ui/container";

export default function SupportSection() {
  const items = [
    {
      title: "Technology Roadmap Consultation",
      desc: "Navigate platform decisions, AI readiness, and long-term product strategy with a trusted lead architect.",
    },
    {
      title: "Guaranteed Support & Maintenance",
      desc: "Ongoing monitoring, uptime commitments, and iteration sprints keep your solutions ahead of the market.",
    },
  ];

  return (
    <section className="py-4 md:py-6 bg-gray-50"> {/* 🔥 reduced spacing */}
      <Container>

        <div className="relative rounded-3xl border border-gray-200 bg-white shadow-xl p-8 md:p-12">

          {/* subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

          {/* ================= HEADER (CENTERED) ================= */}
          <div className="max-w-2xl mx-auto text-center"> {/* 🔥 FIX */}
            <p className="text-xs tracking-widest text-gray-500 uppercase">
              EXPERT GUIDANCE & SUPPORT
            </p>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
              More Than A Vendor. We're Your Partner.
            </h2>
          </div>

          {/* ================= CARDS ================= */}
          <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-6"> {/* 🔥 tighter */}
            {items.map((item, i) => (
              <div
                key={i}
                className="group relative p-6 md:p-8 rounded-2xl 
                bg-blue-100 border border-gray-200 shadow-sm 
                hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* hover tint */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition
                bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent" />

                <div className="relative z-10">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </Container>
    </section>
  );
}