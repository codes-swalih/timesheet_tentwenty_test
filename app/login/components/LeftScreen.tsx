"use client";
import React from "react";
import { Button, Input } from "antd";
import { Checkbox } from "antd";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LeftScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params?.get("callbackUrl") ?? "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      alert("Invalid credentials");
      return;
    }

    const destination = (res?.url as string) ?? callbackUrl;
    router.push(destination);
  }
  return (
    <div className=" w-1/2 h-full flex items-center justify-center">
      <div className=" flex flex-col gap-10 w-2/3">
        <div className=" flex flex-col gap-5">
          <h1 className=" text-2xl font-bold">Welcome back</h1>
          <div className=" flex flex-col gap-2">
            <label className=" text-sm">Email</label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              size="large"
              placeholder="name@example.com"
            />
          </div>
          <div className=" flex flex-col gap-2">
            <label className=" text-sm">Password</label>
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              size="large"
              placeholder="Enter your password"
            />
          </div>
          <Checkbox>Checkbox</Checkbox>

          <Button onClick={handleSubmit} size="large" style={{backgroundColor : "#1A56DB", color : "white"}} block>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LeftScreen;
