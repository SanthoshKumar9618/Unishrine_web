"use client";

import menu_data from "@/data/menu-data";
import Link from "next/link";
import { useState } from "react";

export default function Navmenu() {
  const [navTitle, setNavTitle] = useState<string>("");
  const [navTitle2, setNavTitle2] = useState<string>("");

  const openMobileMenu = (menu: string) => {
    setNavTitle(menu);
  };
  const closeMobileMenu = () => {
    setNavTitle("");
  };

  const openMobileMenu2 = (menu: string) => {
    setNavTitle2(menu);
  };
  const closeMobileMenu2 = () => {
    setNavTitle2("");
  };

  return (
    <ul className="navbar-nav align-items-xl-center navbar-nav-scroll mt-4 mt-xl-0">
      {menu_data.map((item, i) => (
        <li
          key={i}
          className="startix-dd"
          onMouseEnter={() => openMobileMenu(item.title)}
          onMouseLeave={closeMobileMenu}
        >
          <Link href={item.link as any}>
            {item.title}{" "}
            {item.has_dropdown && (
              <i
                onClick={() =>
                  navTitle === item.title
                    ? setNavTitle("")
                    : setNavTitle(item.title)
                }
                className="ti ti-caret-down-filled"
              ></i>
            )}
          </Link>

          {item.has_dropdown && (
            <ul
              className="startix-dd-menu"
              style={
                navTitle === item.title
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              {item.submenu?.map((sub_item, index) => (
                <li
                  key={index}
                  className="startix-dd"
                  onMouseEnter={() => openMobileMenu2(sub_item.title)}
                  onMouseLeave={closeMobileMenu2}
                >
                  <Link href={sub_item.link as any}>
                    {sub_item.title}{" "}
                    {sub_item.has_inner_dropdown && (
                      <i
                        onClick={() =>
                          navTitle2 === sub_item.title
                            ? setNavTitle2("")
                            : setNavTitle2(sub_item.title)
                        }
                        className="ti ti-caret-right-filled"
                      ></i>
                    )}
                  </Link>

                  {sub_item.has_inner_dropdown && (
                    <ul
                      className="startix-dd-menu"
                      style={
                        navTitle2 === sub_item.title
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      {sub_item.submenu?.map((inner_sub_item, idx) => (
                        <li key={idx}>
                          <Link href={inner_sub_item.link as any}>
                            {inner_sub_item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}