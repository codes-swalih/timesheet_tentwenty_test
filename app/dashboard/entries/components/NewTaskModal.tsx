"use client";
import React, { useState } from "react";
import { Button, Input, Modal, InputNumber, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SelectInput from "@/components/common/SelectProjectInput";
import { projectNames, projectTypes } from "@/lib/mockData";
import type { Task, TaskAddModelProps } from "@/types/types";
import { createEntry } from "@/lib/entryServices";

const emptyTask = (): Task => ({
  projectName: "",
  workType: "",
  description: "",
  hours: 1,
});

type Props = TaskAddModelProps & {
  onCreated?: () => void;
};

export default function NewTaskModal({
  formattedDate,
  timeSheetId,
  onCreated,
}: Props) {
  const { TextArea } = Input;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState<Task>(emptyTask());
  const [loading, setLoading] = useState(false);

  const showModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setTask(emptyTask());
    setLoading(false);
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();

    // Validation
    if (!timeSheetId) return message.error("Missing timesheet reference");
    if (!formattedDate) return message.error("Missing date");
    if (!task.projectName) return message.error("Please select a project");
    if (!task.workType) return message.error("Please select a work type");
    if (!task.hours || task.hours <= 0)
      return message.error("Please enter valid hours");

    setLoading(true);

    try {
      const res = await createEntry({
        timesheetId: timeSheetId,
        date: formattedDate,
        task: {
          projectName: task.projectName,
          workType: task.workType,
          description: task.description ?? "",
          hours: task.hours,
        },
      });

      if ((res as any)?.id) {
        message.success("Entry added successfully");
        closeModal();

        if (onCreated) {
          setTimeout(() => onCreated(), 100);
        }
      } else {
        message.error((res as any)?.message || "Failed to create entry");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong while creating the entry");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={showModal}
        className="bg-blue-400/20 h-12 text-blue-700 font-medium w-full rounded-xl flex justify-center items-center border border-dashed border-blue-500 cursor-pointer hover:bg-blue-400/30 transition-colors"
      >
        <span className="pr-3">
          <PlusOutlined />
        </span>
        Add Task
      </div>

      <Modal
        title={`Add New Entry (${formattedDate ?? "no date"})`}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium">Select Project</label>
            <SelectInput
              items={projectNames}
              placeholder="Select Project"
              onChange={(value: string) =>
                setTask((t) => ({ ...t, projectName: value }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium">Type of Work</label>
            <SelectInput
              items={projectTypes}
              placeholder="Select Project Type"
              onChange={(value: string) =>
                setTask((t) => ({ ...t, workType: value }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium">Task Description</label>
            <TextArea
              value={task.description}
              placeholder="Write a note here..."
              rows={4}
              onChange={(e) =>
                setTask((t) => ({ ...t, description: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium">Hours</label>
            <InputNumber
              min={1}
              max={24}
              value={task.hours}
              onChange={(val) =>
                setTask((t) => ({ ...t, hours: Number(val) || 1 }))
              }
            />
          </div>

          <div className="w-full flex items-center gap-2 mt-4">
            <Button
              className="w-1/2"
              type="primary"
              onClick={handleCreate}
              loading={loading}
              disabled={loading}
            >
              Add Entry
            </Button>
            <Button
              onClick={closeModal}
              className="w-1/2"
              type="default"
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
