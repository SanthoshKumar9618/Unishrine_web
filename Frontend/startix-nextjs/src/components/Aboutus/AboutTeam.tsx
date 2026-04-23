"use client";

import { useState } from "react";
import Image from "next/image";

const teamData = [
  { name: "Miler Michel", role: "Front end Developer", img: "/assets/img/bg-img/112.jpg" },
  { name: "Brooklyn Simmons", role: "Founder & CCO", img: "/assets/img/bg-img/113.jpg" },
  { name: "Harry Brush", role: "Web Developer", img: "/assets/img/bg-img/114.jpg" },
  { name: "Mariana mia", role: "Founder & CCO", img: "/assets/img/bg-img/115.jpg" },
];

export default function AboutTeam() { 
  const [activeCards, setActiveCards] = useState<boolean[]>(teamData.map(() => false));

  const toggleCard = (index: number) => {
    setActiveCards(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <section className="team-section bg-secondary">
      <div className="divider"></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7 col-xxl-6">
            <div className="section-heading text-center">
              <span className="subtitle">Our Team</span>
              <h2 className="mb-0">Our Expert Team is Always Ready to Help You</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="divider-sm"></div>

      <div className="container">
        <div className="row g-4 justify-content-center">
          {teamData.map((member, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
              <div className="team-card-three bg-white">
                <div className="team-img">
                  <Image className="w-auto h-auto" src={member.img} alt={member.name} width={1920} height={1080} priority/>
                  
                  {/* Social Nav Trigger */}
                  <button
                    className={`social-nav-trigger ${activeCards[index] ? "active" : ""}`}
                    onClick={() => toggleCard(index)}
                  >
                    <i className="ti ti-plus"></i>
                    <i className="ti ti-minus"></i>
                  </button>

                  {/* Social Nav */}
                  <div className="social-nav social-nav-three">
                    {["linkedin", "x", "instagram"].map((platform, i, arr) => (
                      <a
                        key={platform}
                        href="#"
                        className={activeCards[index] ? "show" : ""}
                        style={{ transitionDelay: activeCards[index] ? `${(arr.length - 1 - i) * 200}ms` : "0ms" }}
                      >
                        <i className={`ti ti-brand-${platform}`}></i>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="team-body">
                  <h5>{member.name}</h5>
                  <p className="mb-0">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider"></div>
    </section>
  );
}
