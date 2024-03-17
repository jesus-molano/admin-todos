"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import { CiLogin, CiLogout } from "react-icons/ci";
import { IoReloadCircleOutline } from "react-icons/io5";

const BUTTON_STATUS = {
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
};

const getButton = (status: "loading" | "authenticated" | "unauthenticated") => {
  switch (status) {
    case BUTTON_STATUS.LOADING:
      return (
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <IoReloadCircleOutline />
          <span className="group-hover:text-gray-700">Loading...</span>
        </button>
      );
    case BUTTON_STATUS.AUTHENTICATED:
      return (
        <button
          onClick={() => signOut()}
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
        >
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      );
    case BUTTON_STATUS.UNAUTHENTICATED:
      return (
        <button
          onClick={() => signIn()}
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
        >
          <CiLogin />
          <span className="group-hover:text-gray-700">Login</span>
        </button>
      );
    default:
      return null;
  }
};

export const LogoutButton = () => {
  const { data: session, status } = useSession();
  const component = getButton(status);
  return component;
};
