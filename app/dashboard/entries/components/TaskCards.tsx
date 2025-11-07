import { Task, TaskCardsProps, TimesheetEntry } from "@/types/types";
import React from "react";
import TaskActions from "./TaskActions";
import NewTaskModal from "./NewTaskModal";

function TaskCards(params: TaskCardsProps) {
  const { formattedDays, status, timeSheetId, onEntryCreated } = params;

  if (!formattedDays || formattedDays.length === 0) {
    return (
      <div className="mt-10 flex flex-col gap-10 w-full">
        <div className="w-full">
          <NewTaskModal
            formattedDate={new Date().toISOString().split("T")[0]}
            timeSheetId={timeSheetId as string}
            onCreated={onEntryCreated}
          />
        </div>
      </div>
    );
  }

  return (
    <div className=" mt-10 flex flex-col gap-10 w-full">
      {formattedDays.map((items: TimesheetEntry, index: number) => {
        return (
          <div
            key={index}
            className=" md:flex items-start justify-between w-full"
          >
            <div className=" md:w-1/6">
              <h1 className=" md:text-lg">{items.formattedDate}</h1>
            </div>
            <div className=" flex flex-col gap-3 w-5/6">
              <div className=" flex flex-col gap-3 w-full">
                {items.tasks?.map((tsk: Task, index: number) => {
                  return (
                    <div
                      key={index}
                      className=" p-2 w-full rounded-xl flex justify-between items-center border border-gray-200"
                    >
                      <h1>{tsk.projectName}</h1>
                      <div className=" flex items-center gap-2">
                        <h1 className=" text-sm text-gray-400">
                          {tsk.hours} hrs
                        </h1>
                        <div className="text-sm p-4 h-8 bg-blue-500/40 rounded-md text-blue-900 flex items-center justify-center ">
                          {tsk.workType}
                        </div>
                        <TaskActions
                          taskId={tsk.id as string}
                          entryId={items.id as string}
                          timeSheetId={timeSheetId as string}
                          onTaskUpdated={onEntryCreated}
                          onTaskDeleted={onEntryCreated}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {status !== "COMPLETED" && (
                <NewTaskModal
                  formattedDate={items.date ?? ""}
                  timeSheetId={items.timesheetId}
                  onCreated={onEntryCreated}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TaskCards;
