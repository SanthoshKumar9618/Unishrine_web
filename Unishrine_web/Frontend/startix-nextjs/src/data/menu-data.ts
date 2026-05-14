interface InnerSubMenu {
  title: string;
  link: string;
}

interface SubMenu {
  title: string;
  link: string;
  has_inner_dropdown: boolean;
  submenu?: InnerSubMenu[];
}

interface MenuDataType {
  title: string;
  link: string;
  has_dropdown: boolean;
  submenu?: SubMenu[];
}

const menu_data: MenuDataType[] = [
  {
    title: "Home",
    link: "/",
    has_dropdown: false,
   
  },
   {
    title: "Our Services",
    link: "/#services",
    has_dropdown: false,
   
  },
   {
    title: "Projects",
    link: "/projects",
    has_dropdown: false,
   
  },
  {
    title: "About Us",
    link: "/about-us",
    has_dropdown: false,
  },
  
  {
    title: "Contact",
    link: "/contact",
    has_dropdown: false,
  },
];

export default menu_data; 