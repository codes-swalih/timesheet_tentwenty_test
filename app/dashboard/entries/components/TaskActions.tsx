"use client";
import React, { useState } from "react";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space, message, Modal } from "antd";
import { deleteTask } from "@/lib/entryServices";
import EditTaskModal from "./EditTaskModal";

function TaskActions(params: {
  timeSheetId: string;
  entryId: string;
  taskId: string;
  onTaskDeleted?: () => void;
  onTaskUpdated?: () => void;
}) {
  const { timeSheetId, entryId, taskId, onTaskDeleted, onTaskUpdated } = params;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const actions: MenuProps["items"] = [
    {
      key: "1",
      label: "Edit",
      icon: <EditOutlined />,
    },
    {
      key: "2",
      label: "Delete",
      danger: true,
      icon: <DeleteOutlined />,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = async ({ key }) => {
    if (key === "1") {
      setIsEditModalOpen(true);
    } else if (key === "2") {
      const response = await deleteTask({
        timesheetId: timeSheetId,
        entryId,
        taskId,
      });

      if (response && !response.error) {
        message.success("Task deleted successfully");
        onTaskDeleted && onTaskDeleted();
      } else {
        message.error("Failed to delete task");
      }
    } else if (key === "3") {
      message.info("View functionality coming soon");
    }
  };

  return (
    <>
      <Dropdown
        menu={{
          items: actions,
          onClick: handleMenuClick,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <MoreOutlined />
          </Space>
        </a>
      </Dropdown>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        timeSheetId={timeSheetId}
        entryId={entryId}
        taskId={taskId}
        onUpdated={onTaskUpdated}
      />
    </>
  );
}

export default TaskActions;
