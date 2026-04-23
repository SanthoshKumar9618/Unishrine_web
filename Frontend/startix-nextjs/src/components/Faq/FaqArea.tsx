export default function FaqArea() {
  return (
    <div className="faq-question-section" style={{ backgroundImage: "url(/assets/img/core-img/shape11.png)" }}>
      {/* <!-- Divider --> */}
      <div className="divider"></div>

      <div className="container">
        <div className="row justify-content-center g-5">
          <div className="col-12 col-lg-8">
            {/* <!-- FAQ Accordion --> */}
            <div className="faq-accordion">
              <div className="accordion" id="faqAccordion">
                {/* <!-- Accordion Item --> */}
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#faqQuestion1" aria-expanded="true" aria-controls="faqQuestion1">
                      What warranties do I have for installation?
                    </button>
                  </div>
                  <div id="faqQuestion1" className="accordion-collapse collapse show"
                    data-bs-parent="#faqAccordion">
                    <div className="accordion-body">Nor is there anyone who loves or pursues or desires to
                      obtain pain itself, because it is pain, but occasionally cumstances occur in which
                      toil and pain can procuresteady steady.</div>
                  </div>
                </div>

                {/* <!-- Accordion Item --> */}
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#faqQuestion2" aria-expanded="false" aria-controls="faqQuestion2">
                      How long does it take to build a new website?
                    </button>
                  </div>
                  <div id="faqQuestion2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">Nor is there anyone who loves or pursues or desires to
                      obtain pain itself, because it is pain, but occasionally cumstances occur in which
                      toil and pain can procuresteady steady.</div>
                  </div>
                </div>

                {/* <!-- Accordion Item --> */}
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#faqQuestion3" aria-expanded="false" aria-controls="faqQuestion3">
                      What do you need to start making me a website?
                    </button>
                  </div>
                  <div id="faqQuestion3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">Nor is there anyone who loves or pursues or desires to
                      obtain pain itself, because it is pain, but occasionally cumstances occur in which
                      toil and pain can procuresteady steady.</div>
                  </div>
                </div>

                {/* <!-- Accordion Item --> */}
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#faqQuestion4" aria-expanded="false" aria-controls="faqQuestion4">
                      How to soft launch your business ?
                    </button>
                  </div>
                  <div id="faqQuestion4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">Nor is there anyone who loves or pursues or desires to
                      obtain pain itself, because it is pain, but occasionally cumstances occur in which
                      toil and pain can procuresteady steady.</div>
                  </div>
                </div>

                {/* <!-- Accordion Item --> */}
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#faqQuestion5" aria-expanded="false" aria-controls="faqQuestion5">
                      How does the trial work?
                    </button>
                  </div>
                  <div id="faqQuestion5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">Nor is there anyone who loves or pursues or desires to
                      obtain pain itself, because it is pain, but occasionally cumstances occur in which
                      toil and pain can procuresteady steady.</div>
                  </div>
                </div>

                {/* <!-- Accordion Item --> */}
                <div className="accordion-item">
                  <div className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#faqQuestion6" aria-expanded="false" aria-controls="faqQuestion6">
                      What kind of customer support do you offer?
                    </button>
                  </div>
                  <div id="faqQuestion6" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">Nor is there anyone who loves or pursues or desires to
                      obtain pain itself, because it is pain, but occasionally cumstances occur in which
                      toil and pain can procuresteady steady.</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Divider --> */}
      <div className="divider"></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div className="section-heading text-center">
              <h2 className="mb-3">Still have questions?</h2>
              <p className="mb-5">You can use it in situations when you are providing guidance With over a decade
                of information.</p>
              <a href="#" className="btn btn-primary">
                <span>Contact Support <i className="ti ti-arrow-up-right"></i></span>
                <span>Contact Support <i className="ti ti-arrow-up-right"></i></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Divider --> */}
      <div className="divider"></div>
    </div>
  )
}
