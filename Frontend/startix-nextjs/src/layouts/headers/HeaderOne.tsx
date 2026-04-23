"use client";

import Link from "next/link";
import Navmenu from "./Navmenu";
import SearchbarArea from "@/common/SearchbarArea";
import { useState } from "react";
import UseSticky from "@/hooks/UseSticky";
import Image from "next/image";

export default function HeaderOne() {
  const [searchOpen, setSearchOpen] = useState(false);
  const {sticky} = UseSticky()
  return (
    <>
      <header className={`header-section style-five ${sticky ? "sticky-on" : ""}`}>
        {/* <!-- Header Top --> */}
        <div className="header-top">
          <div className="container h-100">
            <div className="h-100 d-flex align-items-center justify-content-between">
              {/* <!-- Left Side Content --> */}
              <div className="left-side d-flex align-items-center gap-2 gap-md-3 gap-lg-4">
                <a href="mailto:hello@unishrine.com" className="d-flex align-items-center gap-1 fw-normal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
                    fill="none">
                    <path
                      d="M15 13.5H13.5V6.9375L9 9.75L4.5 6.9375V13.5H3V4.5H3.9L9 7.6875L14.1 4.5H15M15 3H3C2.1675 3 1.5 3.6675 1.5 4.5V13.5C1.5 13.8978 1.65804 14.2794 1.93934 14.5607C2.22064 14.842 2.60218 15 3 15H15C15.3978 15 15.7794 14.842 16.0607 14.5607C16.342 14.2794 16.5 13.8978 16.5 13.5V4.5C16.5 4.10218 16.342 3.72064 16.0607 3.43934C15.7794 3.15804 15.3978 3 15 3Z"
                      fill="white" />
                  </svg>
                  <span className="d-none d-lg-block">hello@unishrine.com</span>
                </a>

                <a href="#" className="d-flex align-items-center gap-1 fw-normal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                    fill="none">
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M9.38565 18.4463C9.38565 18.4463 3.33398 13.3496 3.33398 8.33464C3.33398 6.56653 4.03636 4.87083 5.28661 3.62059C6.53685 2.37035 8.23254 1.66797 10.0007 1.66797C11.7688 1.66797 13.4645 2.37035 14.7147 3.62059C15.9649 4.87083 16.6673 6.56653 16.6673 8.33464C16.6673 13.3496 10.6157 18.4463 10.6157 18.4463C10.279 18.7563 9.72482 18.753 9.38565 18.4463ZM10.0007 11.2513C10.3837 11.2513 10.7629 11.1759 11.1168 11.0293C11.4707 10.8827 11.7922 10.6679 12.063 10.397C12.3339 10.1262 12.5487 9.80466 12.6953 9.4508C12.8419 9.09693 12.9173 8.71766 12.9173 8.33464C12.9173 7.95161 12.8419 7.57234 12.6953 7.21848C12.5487 6.86461 12.3339 6.54308 12.063 6.27224C11.7922 6.0014 11.4707 5.78656 11.1168 5.63999C10.7629 5.49341 10.3837 5.41797 10.0007 5.41797C9.2271 5.41797 8.48524 5.72526 7.93826 6.27224C7.39128 6.81922 7.08398 7.56109 7.08398 8.33464C7.08398 9.10818 7.39128 9.85005 7.93826 10.397C8.48524 10.944 9.2271 11.2513 10.0007 11.2513Z"
                      fill="white" />
                  </svg>
                  <span className="d-none d-lg-block">HBR Layout, Bengaluru-560 043</span>
                </a>

                <a href="tel:888123456789" className="d-flex align-items-center gap-1 fw-normal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                    fill="none">
                    <path
                      d="M16.625 17.5C14.8889 17.5 13.1736 17.1214 11.4792 16.3642C9.78472 15.6069 8.24306 14.5342 6.85417 13.1458C5.46528 11.7569 4.3925 10.2153 3.63583 8.52083C2.87917 6.82639 2.50056 5.11111 2.5 3.375C2.5 3.125 2.58333 2.91667 2.75 2.75C2.91667 2.58333 3.125 2.5 3.375 2.5H6.75C6.94444 2.5 7.11806 2.56611 7.27083 2.69833C7.42361 2.83056 7.51389 2.98667 7.54167 3.16667L8.08333 6.08333C8.11111 6.30556 8.10417 6.49306 8.0625 6.64583C8.02083 6.79861 7.94444 6.93056 7.83333 7.04167L5.8125 9.08333C6.09028 9.59722 6.42 10.0936 6.80167 10.5725C7.18333 11.0514 7.60361 11.5133 8.0625 11.9583C8.49306 12.3889 8.94444 12.7883 9.41667 13.1567C9.88889 13.525 10.3889 13.8617 10.9167 14.1667L12.875 12.2083C13 12.0833 13.1633 11.9894 13.365 11.9267C13.5667 11.8639 13.7644 11.8467 13.9583 11.875L16.8333 12.4583C17.0278 12.5139 17.1875 12.6147 17.3125 12.7608C17.4375 12.9069 17.5 13.07 17.5 13.25V16.625C17.5 16.875 17.4167 17.0833 17.25 17.25C17.0833 17.4167 16.875 17.5 16.625 17.5ZM5.02083 7.5L6.39583 6.125L6.04167 4.16667H4.1875C4.25694 4.73611 4.35417 5.29861 4.47917 5.85417C4.60417 6.40972 4.78472 6.95833 5.02083 7.5ZM12.4792 14.9583C13.0208 15.1944 13.5731 15.3819 14.1358 15.5208C14.6986 15.6597 15.2644 15.75 15.8333 15.7917V13.9583L13.875 13.5625L12.4792 14.9583Z"
                      fill="white" />
                  </svg>
                  <span className="d-none d-lg-block">+91 9535105602</span>
                </a>
              </div>

              {/* <!-- Right Side Content --> */}
              <div className="right-side">
                <div className="social-nav d-flex align-items-center gap-3">
                  <a href="#">
                    <i className="ti ti-brand-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="ti ti-brand-x"></i>
                  </a>
                  <a href="#">
                    <i className="ti ti-brand-linkedin"></i>
                  </a>
                  <a href="#">
                    <i className="ti ti-brand-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

       {/* <!-- Navbar --> */}
<nav className="navbar navbar-expand-xl">
  <div className="container">

    {/* <!-- Navbar Brand --> */}
    <Link className="navbar-brand d-flex align-items-center gap-2" href={"/" as any}>
      <Image
        src="/assets/img/core-img/logo.svg"   // 👉 replace with your logo
        alt="Your Company"
        width={40}
        height={40}
        priority
      />
      <span style={{ fontWeight: "bold", fontSize: "18px" }}>
        Unishrine   {/* 👉 change your company name */}
      </span>
    </Link>

    {/* <!-- Navbar Toggler --> */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#startixNav"
      aria-controls="startixNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="ti ti-menu-deep"></i>
    </button>

    {/* <!-- Navbar Nav --> */}
    <div className="collapse navbar-collapse" id="startixNav">

      {/* Menu */}
      <Navmenu />

      {/* Right Side */}
      <div className="header-navigation ms-auto d-flex flex-wrap align-items-center mt-4 mt-xl-0">

        {/* Search Button */}
        <div className="header-search-btn">
          <button onClick={() => setSearchOpen(!searchOpen)} className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
             <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" fill="#161616" />
            </svg>
          </button>
        </div>

        {/* CTA Button */}
        <Link className="btn btn-primary" href={"/zeva" as any}>
          <span>
            Try Demo Call<i className="ti ti-arrow-up-right"></i>
          </span>
          <span>
            Try Demo Call <i className="ti ti-arrow-up-right"></i>
          </span>
        </Link>

      </div>
    </div>
  </div>
</nav>
      </header>
      <SearchbarArea searchOpen={searchOpen}  setSearchOpen={setSearchOpen} />
    </>
  )
}
