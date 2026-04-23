"use client";

import Link from "next/link";
import { useJarallax } from "@/hooks/useJarallax";
import 'jarallax/dist/jarallax.css';

interface BreadcrumbProps {
  title?: string;
  pageLink?: string;
}

export default function Breadcrumb({ title, pageLink }: BreadcrumbProps) {
  const jarallaxRef = useJarallax(0.6);

  return (
    <div
      className="breadcrumb-section bg-img jarallax"
      ref={jarallaxRef}
      style={{ backgroundImage: "url(/assets/img/bg-img/86.jpg)" }}
    >
      <div className="container">
        {/* Breadcrumb Content */}
        <div className="breadcrumb-content">
          <div className="divider"></div>
          <h2>{title}</h2>
          <ul className="list-unstyled">
            <li><Link href="/home-1">Home</Link></li>
            <li>{pageLink}</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="divider"></div>
    </div>
  );
}
