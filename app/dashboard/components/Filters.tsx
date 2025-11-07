// components/Filters.tsx
"use client";
import React from "react";
import { DatePicker, Select, Button } from "antd";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

export type FilterState = {
  dateRange?: [Dayjs, Dayjs] | null;
  status?: "ALL" | "COMPLETED" | "INCOMPLETE" | "MISSING" | "PENDING";
};

type Props = {
  onChange?: (filters: FilterState) => void;
};

export default function Filters({ onChange }: Props) {
  const handleRangeChange = (dates: null | (Dayjs | null)[]) => {
    const payload: FilterState = {
      dateRange:
        dates && dates[0] && dates[1]
          ? ([dates[0] as Dayjs, dates[1] as Dayjs] as [Dayjs, Dayjs])
          : null,
    };
    onChange?.(payload);
  };

  const handleStatusChange = (value: string) => {
    const payload: FilterState = {
      status: (value as FilterState["status"]) ?? "ALL",
    };
    onChange?.(payload);
  };

  const handleClearAll = () => {
    onChange?.({ dateRange: null, status: "ALL" });
  };

  return (
    <div className="flex items-center gap-3">
      <RangePicker
      size="large"
        onChange={handleRangeChange}
        allowClear
        format="DD MMM YYYY"
      />

      <Select
        size="large"
        defaultValue="ALL"
        style={{ width: 160 }}
        onChange={handleStatusChange}
        options={[
          { label: "All", value: "ALL" },
          { label: "Completed", value: "COMPLETED" },
          { label: "Incomplete", value: "INCOMPLETE" },
          { label: "Missing", value: "MISSING" },
          { label: "Pending", value: "PENDING" },
        ]}
      />

      <Button size="large" type="default" onClick={handleClearAll}>
        Clear
      </Button>
    </div>
  );
}
