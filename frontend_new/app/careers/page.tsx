"use client";

import Container from "@/components/ui/container";
import Link from "next/link";
import Image from "next/image";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HERO */}
      <section className="relative pt-22 pb-14 overflow-hidden">
  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

  <Container>
    <div className="relative grid md:grid-cols-2 gap-12 items-center">

      {/* LEFT → TEXT */}
      <div className="max-w-2xl">
        <span className="inline-block mb-4 text-sm text-gray-500 border border-gray-200 px-3 py-1 rounded-full">
          Careers
        </span>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
          Build the Future with{" "}
          <span className="text-black">UNISHRINE</span>
        </h1>

        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
          We’re designing intelligent systems that scale businesses and
          automate complex workflows. Join us in building high-impact,
          AI-driven products.
        </p>
      </div>

      {/* RIGHT → IMAGE */}
      <div className="relative w-full h-[300px] md:h-[420px]">
        <Image
          src="/images/job_img.jpg" // 👈 put your image here
          alt="Careers illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

    </div>
  </Container>
</section>
      

      {/* EMPTY STATE CARD */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto">

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-10 text-center">

              {/* ICON */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl">
                  🚫
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-semibold">
                No Open Positions Right Now
              </h2>

              <p className="mt-4 text-gray-600 leading-relaxed max-w-xl mx-auto">
                We’re not actively hiring at the moment, but we’re always looking
                for exceptional engineers, designers, and product thinkers to
                join our journey.
              </p>

              {/* CTA */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

                <a
                  href="mailto:careers@unishrine.com"
                  className="px-6 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-900 transition shadow-sm"
                >
                  Send Your Resume
                </a>

                <Link
                  href="/"
                  className="px-6 py-3 rounded-xl border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
                >
                  Back to Home
                </Link>

              </div>

            </div>
          </div>
        </Container>
      </section>

      {/* TALENT POOL SECTION */}
      <section className="py-20 border-t border-gray-100 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">

            <h3 className="text-2xl md:text-3xl font-semibold">
              Join Our Talent Network
            </h3>

            <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We’ll soon be hiring across backend engineering, AI infrastructure,
              and product development. Share your profile and we’ll reach out
              when a relevant opportunity opens.
            </p>

            {/* FUTURE INPUT (optional later) */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-xl border border-gray-300 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <button className="px-6 py-3 rounded-xl bg-black text-white text-sm hover:bg-gray-900 transition">
                Notify Me
              </button>
            </div>

          </div>
        </Container>
      </section>

    </main>
  );
}