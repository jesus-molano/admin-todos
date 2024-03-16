"use client";
import React, { useState } from "react";
import { setCookie } from "cookies-next";

const initialTabOptions = [1, 2, 3, 4];

interface TabBarProps {
  currentTab?: number;
  tabOptions?: number[];
}
export const TabBar = ({
  currentTab = 1,
  tabOptions = initialTabOptions,
}: TabBarProps) => {
  const [selectedTab, setSelectedTab] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelectedTab(tab);
    setCookie("selectedTab", tab.toString());
  };

  return (
    <div
      className={`
        grid w-full space-x-2 rounded-xl bg-gray-200 p-2
        grid-cols-${tabOptions.length}
        `}
    >
      {tabOptions.map((tab, index) => (
        <div key={index}>
          <input
            checked={selectedTab === tab}
            onChange={() => {}}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white transition-all "
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
