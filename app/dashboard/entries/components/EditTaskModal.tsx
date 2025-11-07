"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Modal, InputNumber, message } from "antd";
import SelectInput from "@/components/common/SelectProjectInput";
import { projectNames, projectTypes } from "@/lib/mockData";
import type { Task } from "@/types/types";
import { getSingleTask, updateTask } from "@/lib/entryServices";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  timeSheetId: string;
  entryId: string;
  taskId: string;
  onUpdated?: () => void;
};

export default function EditTaskModal({
  isOpen,
  onClose,
  timeSheetId,
  entryId,
  taskId,
  onUpdated,
}: Props) {
  const { TextArea } = Input;

  const [task, setTask] = useState<Task>({
    projectName: "",
    workType: "",
    description: "",
    hours: 1,
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  // Fetch task data when modal opens
  useEffect(() => {
    if (isOpen && taskId) {
      fetchTaskData();
    }
  }, [isOpen, taskId]);

  const fetchTaskData = async () => {
    setFetchLoading(true);
    try {
      const data = await getSingleTask({
        timesheetId: timeSheetId,
        entryId,
        taskId,
      });

      if (data && !data.error) {
        setTask({
          projectName: data.projectName || "",
          workType: data.workType || "",
          description: data.description || "",
          hours: data.hours || 1,
        });
      } else {
        message.error("Failed to load task data");
      }
    } catch (error) {
      console.error("Error fetching task:", error);
      message.error("Failed to load task data");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form after a brief delay to avoid visual glitch
    setTimeout(() => {
      setTask({
        projectName: "",
        workType: "",
        description: "",
        hours: 1,
      });
    }, 200);
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    // Validation
    if (!timeSheetId) return message.error("Missing timesheet reference");
    if (!entryId) return message.error("Missing entry reference");
    if (!taskId) return message.error("Missing task reference");
    if (!task.projectName) return message.error("Please select a project");
    if (!task.workType) return message.error("Please select a work type");
    if (!task.hours || task.hours <= 0)
      return message.error("Please enter valid hours");

    setLoading(true);

    try {
      const response = await updateTask({
        timesheetId: timeSheetId,
        entryId,
        taskId,
        taskData: {
          projectName: task.projectName,
          workType: task.workType,
          description: task.description ?? "",
          hours: task.hours,
        },
      });

      if (response && !response.error) {
        message.success("Task updated successfully");
        handleClose();
        // Trigger parent refresh after modal closes
        if (onUpdated) {
          setTimeout(() => onUpdated(), 100);
        }
      } else {
        message.error(response?.message || "Failed to update task");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong while updating the task");
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Task"
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      destroyOnClose
    >
      {fetchLoading ? (
        <div className="flex justify-center items-center py-10">
          <p>Loading task data...</p>
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium">Select Project</label>
            <SelectInput
              items={projectNames}
              placeholder="Select Project"
              value={task.projectName}
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
              value={task.workType}
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
              onClick={handleUpdate}
              loading={loading}
              disabled={loading || fetchLoading}
            >
              Update Task
            </Button>
            <Button
              onClick={handleClose}
              className="w-1/2"
              type="default"
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
