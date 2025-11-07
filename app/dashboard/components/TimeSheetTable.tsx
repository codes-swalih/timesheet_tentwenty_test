// components/TimeSheetTable.tsx
"use client";
import React, { useMemo, useState } from "react";
import { Table } from "antd";
import dayjs, { Dayjs } from "dayjs";
import Filters, { FilterState } from "./Filters";
import { Timesheet } from "@/types/types";
import { getColumns } from "./columns";
import useFetchOnMount from "@/hooks/useFetchOnMount";
import { formatDateRange } from "@/utils/DateFormatter";
import { useRouter } from "next/navigation";

const TimeSheetTable: React.FC = () => {
  const {
    data: rawData,
    loading,
    error,
  } = useFetchOnMount<Timesheet[]>("/api/timeSheets");
  const router = useRouter();
  const onClick = (id: string) => router.push(`/dashboard/entries/${id}`);
  const columns = React.useMemo(() => getColumns({ onClick }), [onClick]);

  const [filters, setFilters] = useState<FilterState>({
    status: "ALL",
    dateRange: null,
  });

  const rows = useMemo(() => formatDateRange(rawData ?? []), [rawData]);

  const rangesOverlap = (
    aStart: Dayjs,
    aEnd: Dayjs,
    bStart: Dayjs,
    bEnd: Dayjs
  ) => !(aEnd.isBefore(bStart, "day") || aStart.isAfter(bEnd, "day"));

  const filteredRows = useMemo(() => {
    if (!rows) return [];

    return rows.filter((t) => {
      if (filters.status && filters.status !== "ALL") {
        if ((t as any).status !== filters.status) return false;
      }

      if (filters.dateRange && filters.dateRange.length === 2) {
        const [selStart, selEnd] = filters.dateRange as [Dayjs, Dayjs];

        const tsStart = t.startDate ? dayjs((t as any).startDate) : null;
        const tsEnd = t.endDate ? dayjs((t as any).endDate) : null;

        const fallbackStart =
          !tsStart && (t as any).dateRange
            ? dayjs((t as any).dateRange.split("-")[0].trim())
            : null;
        const fallbackEnd =
          !tsEnd && (t as any).dateRange
            ? dayjs((t as any).dateRange.split("-")[1].trim())
            : null;

        const start = tsStart ?? fallbackStart;
        const end = tsEnd ?? fallbackEnd;

        if (!start || !end) {
          return false;
        }

        if (!rangesOverlap(start, end, selStart, selEnd)) return false;
      }

      return true;
    });
  }, [rows, filters]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 ">
        <h1 className="text-2xl font-semibold">Your Timesheets</h1>

        <Filters onChange={(f) => setFilters((prev) => ({ ...prev, ...f }))} />
      </div>

      {error && (
        <div className="text-red-500 mb-2">
          Failed to load timesheets: {String((error as any)?.message ?? error)}
        </div>
      )}

      <Table<Timesheet>
        bordered
        loading={loading}
        dataSource={(filteredRows || []).map((r) => ({ ...r, key: r.id }))}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default TimeSheetTable;
