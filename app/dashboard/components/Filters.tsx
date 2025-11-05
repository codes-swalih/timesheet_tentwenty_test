import React from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, message, Space } from "antd";

const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};
function Filters() {
  const items: MenuProps["items"] = [
    {
      label: "1st menu item",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "2nd menu item",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: "3rd menu item",
      key: "3",
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: "4rd menu item",
      key: "4",
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  
  return (
    <div className=" flex items-center gap-2">
      <Dropdown menu={menuProps}>
        <Button size="large">
          <Space>
            Date Range
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <Dropdown menu={menuProps}>
        <Button size="large">
          <Space>
            Status
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
}

export default Filters;
