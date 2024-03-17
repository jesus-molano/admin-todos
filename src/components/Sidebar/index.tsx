import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SidebarItem } from "./SidebarItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SIDEBAR_ITEMS } from "@/utils/constants";
import { LogoutButton } from "./LogoutButton";

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const user = {
    name: session?.user?.name ?? "John Doe",
    roles: session?.user?.roles ?? ["user"],
    avatarUrl:
      session?.user?.image ??
      "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp",
  };

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32 h-[32px]"
              alt="tailus logo"
              width={128}
              height={32}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={user.avatarUrl}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={112}
            height={112}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {user.name}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {user.roles.join(" | ")}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              path={item.path}
              icon={item.icon}
            />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
