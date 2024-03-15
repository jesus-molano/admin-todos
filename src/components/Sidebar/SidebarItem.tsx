"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface SidebarItemsProps {
  title: string;
  icon?: React.ReactNode;
  url: string;
}

export const SidebarItem = ({ title, icon, url }: SidebarItemsProps) => {
  const currentPath = usePathname();
  console.log("current", currentPath);
  console.log("props", url);
  return (
    <li>
      <Link
        href={url}
        className={`
          relative px-4 py-3 flex items-center space-x-4 rounded-xl 
          ${
            currentPath === url &&
            "text-white bg-gradient-to-r from-sky-600 to-cyan-400 "
          }
        `}
      >
        {icon && icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};
