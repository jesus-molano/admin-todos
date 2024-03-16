"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface SidebarItemsProps {
  title: string;
  icon?: React.ReactNode;
  path: string;
}

export const SidebarItem = ({ title, icon, path }: SidebarItemsProps) => {
  const currentPath = usePathname();

  return (
    <li>
      <Link
        href={path}
        className={`
          relative px-4 py-3 flex items-center space-x-4 rounded-xl 
          ${
            currentPath === path
              ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400 hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400 hover:text-white "
              : "hover:bg-gradient-to-r hover:from-gray-200 hover:to-cyan-100 hover:text-gray-900"
          }
        `}
      >
        {icon && icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};
