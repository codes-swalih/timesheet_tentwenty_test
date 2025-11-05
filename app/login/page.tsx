"use client";
import React from "react";
import LeftScreen from "./components/LeftScreen";
import RightScreen from "./components/RightScreen";

function page() {
  return (
    <div className=" w-full h-screen flex justify-between">
      <LeftScreen />
      <RightScreen />
    </div>
  );
}

export default page;
