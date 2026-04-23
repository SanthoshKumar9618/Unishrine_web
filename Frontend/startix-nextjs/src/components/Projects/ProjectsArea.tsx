import Image from "next/image";
import project_data from "@/data/projects-data";

export default function ProjectDetailsArea() {
  const project = project_data[0];

  return (
    <div className="project-details-section">
      <div className="divider"></div>

      {/* MAIN IMAGE */}
      <div className="custom-container imgZoomInOut mb-5">
        <Image
          className="project-details-img"
          src={project.image}
          alt={project.title}
          width={900}
          height={500}
          priority
          style={{
            width: "100%",
            maxWidth: "900px",
            height: "auto",
            margin: "0 auto",
            display: "block",
            borderRadius: "16px",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="container">
        <div className="row g-5">
          <div className="col-12">
            <div className="project-details-content">

              {/* TITLE */}
              <h2>{project.title}</h2>

              {/* DESCRIPTION */}
              {project.description.map((text, i) => (
                <p key={i}>{text}</p>
              ))}

              {/* CHALLENGE */}
              <h2 className="mt-5">Challenge & Solution</h2>
              <p>{project.challenge}</p>

              {/* RESULT */}
              <h2>Final Result</h2>
              <p>{project.result}</p>

              {/* UPCOMING PROJECTS */}
              <div className="mt-5 pt-5">
                <h2 className="mb-4">Upcoming Projects</h2>

                <div className="row g-4">

                  {/* Project 02 */}
                  <div className="col-12 col-md-6">
                    <div
                      className="p-4 rounded-4 h-100"
                      style={{
                        border: "1px solid #e5e7eb",
                        background: "#ffffff",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                        borderRadius: "16px",
                      }}
                    >
                      <h4 className="mb-3">News Summarizer App</h4>

                      <p className="mb-3">
                        A modern real-time news platform that delivers daily
                        trending news, category-based updates, breaking news
                        alerts, and personalized news feeds.
                      </p>

                      <span
                        className="px-3 py-2 rounded-pill"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          fontSize: "14px",
                          display: "inline-block",
                        }}
                      >
                        🚧 Under Construction
                      </span>
                    </div>
                  </div>

                  {/* Project 03 */}
                  <div className="col-12 col-md-6">
                    <div
                      className="p-4 rounded-4 h-100"
                      style={{
                          border: "1px solid #e5e7eb",
                          background: "#ffffff",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                          borderRadius: "16px",
                        }}
                    >
                      <h4 className="mb-3">Digital Business Card App</h4>

                      <p className="mb-3">
                        A smart digital business card platform for instantly
                        sharing contact details, social links, company profiles,
                        and lead capture using QR-based networking.
                      </p>

                      <span
                        className="px-3 py-2 rounded-pill"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          fontSize: "14px",
                          display: "inline-block",
                        }}
                      >
                        🚧 Under Construction
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>
    </div>
  );
}