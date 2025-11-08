"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Table, Pagination, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import Filters, { FilterState } from "./Filters";
import { Timesheet } from "@/types/types";
import { getColumns } from "./columns";
import useFetchOnMount from "@/hooks/useFetchOnMount";
import { formatDateRange } from "@/utils/DateFormatter";
import { useRouter } from "next/navigation";
import Rights from "@/components/common/Rights";

const { Option } = Select;

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

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    setPage(1);
  }, [filteredRows, pageSize]);

  const total = filteredRows?.length ?? 0;

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return (filteredRows || [])
      .slice(start, end)
      .map((r) => ({ ...r, key: r.id }));
  }, [filteredRows, page, pageSize]);

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-5 ">
      <div className=" flex flex-col gap-5 bg-white p-7 rounded-xl shadow-sm">
        <div className="flex flex-col gap-5 ">
          <h1 className="text-2xl font-semibold">Your Timesheets</h1>

          <Filters
            onChange={(f) => setFilters((prev) => ({ ...prev, ...f }))}
          />
        </div>

        {error && (
          <div className="text-red-500 mb-2">
            Failed to load timesheets:{" "}
            {String((error as any)?.message ?? error)}
          </div>
        )}
        <div className=" overflow-hidden rounded-xl shadow-sm">
          <Table<Timesheet>
            className="no-vertical-border"
            bordered
            loading={loading}
            dataSource={paginatedRows}
            columns={columns}
            pagination={false}
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Select
              value={String(pageSize)}
              onChange={(v) => handlePageSizeChange(Number(v))}
              style={{
                width: 120,
                backgroundColor: "#fafaf9",
                borderRadius: "10px",
              }}
              size="middle"
              placeholder={`${pageSize} per page`}
            >
              <Option value="5">5 per page</Option>
              <Option value="10">10 per page</Option>
              <Option value="20">20 per page</Option>
              <Option value="50">50 per page</Option>
            </Select>
          </div>

          <Pagination
            current={page}
            total={total}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper
          />
        </div>
      </div>
      <Rights />
    </div>
  );
};

export default TimeSheetTable;
