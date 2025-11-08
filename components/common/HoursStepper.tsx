"use client";
import React from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { HourStepperProps } from "@/types/types";



export default function HourStepper({
  value,
  onChange,
  min = 1,
  max = 24,
  label = "Hours *",
}: HourStepperProps) {
  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="flex items-center justify-between bg-[#F3F4F6] border border-gray-200 rounded-lg overflow-hidden w-28">
        <button
          onClick={handleDecrement}
          className={`w-1/3 h-9 flex items-center justify-center  font-medium text-gray-700 hover:bg-gray-100 transition ${
            value <= min ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={value <= min}
        >
          <MinusOutlined />
        </button>

        <div className="flex items-center justify-center  w-1/3 text-center  bg-white h-9 font-semibold text-gray-800 select-none">
          {value}
        </div>

        <button
          onClick={handleIncrement}
          className={`w-1/3 h-9 flex items-center justify-center  font-medium text-gray-700 hover:bg-gray-100 transition ${
            value >= max ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={value >= max}
        >
          <PlusOutlined />
        </button>
      </div>
    </div>
  );
}
