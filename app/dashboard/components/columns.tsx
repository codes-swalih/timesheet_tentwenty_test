import { Timesheet } from "@/types/types";
import { renderStatus } from "./StatusRender";
import type { TableProps } from "antd";

export type ColumnsHandlers = {
  onClick: (id: string) => void;
};

export const getColumns = ({
  onClick,
}: ColumnsHandlers): TableProps<Timesheet>["columns"] => [
  {
    title: "WEEK",
    dataIndex: "week",
    width: "15%",
    render: (val: number) => <span>{val}</span>,
  },
  {
    title: "DATE",
    dataIndex: "dateRange",
    width: "25%",
    render: (val: string) => <span>{val || "-"}</span>,
  },
  {
    title: "STATUS",
    dataIndex: "status",
    width: "30%",
    render: renderStatus,
  },
  {
    title: "ACTIONS",
    dataIndex: "operation",
    width: "30%",
    render: (_, record: Timesheet) => {
      switch (record.status) {
        case "COMPLETED":
          return (
            <button
              onClick={() => onClick(record.id)}
              className="px-3 py-1 rounded-md bg-green-600 text-white text-sm"
            >
              View
            </button>
          );
        case "INCOMPLETE":
          return (
            <button
              onClick={() => onClick(record.id)}
              className="px-3 py-1 rounded-md bg-yellow-500 text-white text-sm"
            >
              Update
            </button>
          );
        case "MISSING":
          return (
            <button
              onClick={() => onClick(record.id)}
              className="px-3 py-1 rounded-md bg-red-600 text-white text-sm"
            >
              Create
            </button>
          );
        default:
          return (
            <button
              onClick={() => onClick(record.id)}
              className="px-3 py-1 rounded-md bg-gray-600 text-white text-sm"
            >
              Open
            </button>
          );
      }
    },
  },
];
