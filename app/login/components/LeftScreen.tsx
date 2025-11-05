"use client";
import React from "react";
import { Button, Input } from "antd";
import { Checkbox } from "antd";
import Link from "next/link";

function LeftScreen() {
  return (
    <div className=" w-1/2 h-full flex items-center justify-center">
      <div className=" flex flex-col gap-10 w-2/3">
        <div className=" flex flex-col gap-5">
          <h1 className=" text-2xl font-bold">Welcome back</h1>
          <div className=" flex flex-col gap-2">
            <label className=" text-sm">Email</label>
            <Input size="large" placeholder="name@example.com" />
          </div>
          <div className=" flex flex-col gap-2">
            <label className=" text-sm">Password</label>
            <Input.Password size="large" placeholder="Enter your password" />
          </div>
          <Checkbox>Checkbox</Checkbox>
          <Link href={"/dashboard"}>
            <Button size="large" type="primary" block>
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LeftScreen;
