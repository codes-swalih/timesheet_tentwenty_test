"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  }, []);
  return (
    <div className=" w-full h-screen flex items-center justify-center">
      <h1>test</h1>
    </div>
  );
}
