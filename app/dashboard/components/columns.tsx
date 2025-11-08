import { Timesheet } from "@/types/types";
import { renderStatus } from "./StatusRender";
import type { TableProps } from "antd";
import { ArrowDownOutlined, DownOutlined } from "@ant-design/icons";

export type ColumnsHandlers = {
  onClick: (id: string) => void;
};

export const getColumns = ({
  onClick,
}: ColumnsHandlers): TableProps<Timesheet>["columns"] => [
  {
    title: (
      <div className="flex items-center gap-1">
        <span className=" text-[#6B7280]">WEEK #</span>
      </div>
    ),
    dataIndex: "week",
    width: "10%",
    onCell: () => ({
      style: {
        padding: 0,
        backgroundColor: "#fafaf9",
      },
    }),
    render: (val: number) => (
      <div className="px-5 w-full h-full bg-stone-50 ">
        <div className="">{val}</div>
      </div>
    ),
  },
  {
    title: (
      <div className="flex items-center gap-1">
        <span className=" text-[#6B7280]">DATE</span>
        <ArrowDownOutlined style={{ fontSize: "12px", color: "#6B7280" }} />
      </div>
    ),
    dataIndex: "dateRange",
    width: "25%",
    render: (val: string) => <span>{val || "-"}</span>,
  },
  {
    title: (
      <div className="flex items-center gap-1">
        <span className=" text-[#6B7280]">STATUS</span>
        <ArrowDownOutlined style={{ fontSize: "12px", color: "#6B7280" }} />
      </div>
    ),
    dataIndex: "status",
    width: "60%",
    render: renderStatus,
  },
  {
    title: (
      <div className="flex items-center gap-1">
        <span className=" text-[#6B7280]">ACTIONS</span>
      </div>
    ),
    dataIndex: "operation",
    width: "30%",
    onCell: () => ({
      style: {
        textAlign: "center",
        color: "#1C64F2",
        fontSize: "15px",
      },
    }),
    render: (_, record: Timesheet) => {
      switch (record.status) {
        case "COMPLETED":
          return <button onClick={() => onClick(record.id)}>View</button>;
        case "INCOMPLETE":
          return <button onClick={() => onClick(record.id)}>Update</button>;
        case "MISSING":
          return <button onClick={() => onClick(record.id)}>Create</button>;
        default:
          return <button onClick={() => onClick(record.id)}>Open</button>;
      }
    },
  },
];
