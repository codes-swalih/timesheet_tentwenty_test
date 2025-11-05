"use client";
import React from "react";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  if (!pathname) return null;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
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
        <h1 className=" text-2xl font-semibold cursor-pointer">ticktock</h1>
        <h1 className=" cursor-pointer">Timesheet</h1>
      </div>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            John Doe
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default Header;
