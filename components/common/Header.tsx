"use client";
import React from "react";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  if (!pathname) return null;

  const handleMenuClick: MenuProps["onClick"] = async ({ key }) => {
    if (key === "1") {
      await signOut({
        redirect: false,
        callbackUrl: "/login",
      });
      router.push("/login");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];

  const HIDE_ON = ["/login"];
  const hide = HIDE_ON.some((p) => pathname.startsWith(p));
  if (hide) return null;

  return (
    <div className=" w-full bg-white flex justify-between items-center p-8 ">
      <div className=" flex items-center gap-10">
        <Link href={"/dashboard"}>
          <h1 className=" text-2xl font-semibold cursor-pointer">ticktock</h1>
        </Link>
        <h1 className=" cursor-pointer">Timesheet</h1>
      </div>
      <Dropdown menu={{ items, onClick: handleMenuClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {session?.user?.name || "John Doe"}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default Header;
