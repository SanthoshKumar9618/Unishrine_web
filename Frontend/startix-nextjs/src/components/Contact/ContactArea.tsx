export default function ContactArea() {
  return (
    <>
      <section className="contact-info-section">
        {/* <!-- Divider --> */}
        <div className="divider"></div>

        <div className="container">
          <div className="row g-5">
            {/* <!-- Contact Info Card --> */}
            <div className="col-12 col-md-6 col-lg-5">
              <div className="contact-info-card me-xxl-5">
                <h2 className="mb-5">+91 95351 05602</h2>

                <div className="contact-sm-card">
                  <h4 className="mb-3">Address</h4>
                  <p>4th block, Palm Arcade, No 513/C, 1st Floor, 
                    HBR Layout, 1st Stage, Hennur Gardens, Bengaluru, Karnataka 560043</p>
                </div>

                <hr />

                <div className="contact-sm-card">
                  <h4 className="mb-3">Email</h4>
                  <p>hello@unishrine.com</p>
                  <p>ganesh@unishrine.com</p>
                </div>

                <hr />

                <div className="contact-sm-card">
                  <h4 className="mb-3">Follow</h4>
                  {/* <!-- Social Navigation --> */}
                  <div className="social-nav">
                    <a href="#"><i className="ti ti-brand-facebook"></i></a>
                    <a href="#"><i className="ti ti-brand-twitter"></i></a>
                    <a href="#"><i className="ti ti-brand-instagram"></i></a>
                    <a href="#"><i className="ti ti-brand-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Contact Info Card --> */}
            <div className="col-12 col-md-6 col-lg-7">
              <div className="section-heading">
                <span className="subtitle">Contact Us</span>
                <h2 className="mb-5">Get started and grow your business now.</h2>
              </div>

              <form action="#">
                <div className="row g-4">
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <input type="text" className="form-control bg-secondary" placeholder="Your name" />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group">
                      <input type="email" className="form-control bg-secondary" placeholder="Email address" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input type="text" className="form-control bg-secondary" placeholder="Subject" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <textarea className="form-control bg-secondary" placeholder="Type your message"></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100 rounded-3">
                      <span>Send Message <i className="ti ti-arrow-up-right"></i></span>
                      <span>Send Message <i className="ti ti-arrow-up-right"></i></span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <!-- Divider --> */}
        <div className="divider"></div>
      </section>

      {/* <!-- Maps Section --> */}
      <div className="maps-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.021952013834!2d77.62640027405158!3d13.034274013503206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17c41fc9d38f%3A0xa83fa328829a116!2sDex%20Co%20Work%20Space!5e0!3m2!1sen!2sin!4v1776161241411!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  )
}
