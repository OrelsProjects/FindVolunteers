"use client";

import React from "react";
import Tabs from "../components/ui/tabs";
import { useRouter } from "next/navigation";

const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col relative items-center justify-start mt-4">
      <div className="w-full h-12 flex justify-center items-center">
        <Tabs
          items={[
            {
              label: "מתנדב",
              href: "/profile",
              selected: true,
            },
            {
              label: "חברה",
              href: "/volunteers",
            },
          ]}
          onClick={(href) => {
            router.push(href);
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default NavProvider;
