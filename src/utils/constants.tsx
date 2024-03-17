import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
  IoPersonOutline,
  IoSaveOutline,
} from "react-icons/io5";

export const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <IoCalendarOutline size={30} />,
  },
  {
    title: "Rest TODOS",
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline size={30} />,
  },
  {
    title: "Server Actions",
    path: "/dashboard/server-todos",
    icon: <IoListOutline size={30} />,
  },
  {
    title: "Cookies",
    path: "/dashboard/cookies",
    icon: <IoSaveOutline size={30} />,
  },
  {
    title: "Products",
    path: "/dashboard/products",
    icon: <IoBasketOutline size={30} />,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <IoPersonOutline size={30} />,
  },
];
