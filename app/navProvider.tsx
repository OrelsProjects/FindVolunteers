"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Tabs from "../components/ui/tabs";

const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-screen h-screen flex flex-col relative items-center justify-start mt-4">
      <div className="w-full h-12 flex justify-center items-center">
        <Tabs
          items={[
            {
              label: "מתנדב",
              href: "/profile",
              selected: pathname === "/profile",
            },
            {
              label: "חברה",
              href: "/volunteers",
              selected: pathname === "/volunteers",
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
