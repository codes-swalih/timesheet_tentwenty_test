import { NextResponse } from "next/server";
import { entries, timesheets } from "@/lib/mockData";
import { v4 as uuid } from "uuid";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = entries.filter((e) => e.timesheetId === id);
  return NextResponse.json(result);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const { date, tasks } = body;

  if (!date || !tasks) {
    return NextResponse.json(
      { message: "date and tasks are required" },
      { status: 400 }
    );
  }

  // Helper function to ensure each task has an id
  const addTaskIds = (taskOrTasks: any) => {
    const taskArray = Array.isArray(taskOrTasks) ? taskOrTasks : [taskOrTasks];
    return taskArray.map((task) => ({
      ...task,
      id: uuid(), // Add UUID to each task
    }));
  };

  // Find existing entry for that timesheet and date
  const existingEntry = entries.find(
    (en) => en.timesheetId === id && en.date === date
  );

  // If found, append tasks with new IDs
  if (existingEntry) {
    const newTasks = addTaskIds(tasks);
    existingEntry.tasks = [...(existingEntry.tasks || []), ...newTasks];

    console.log("Updated entry:", existingEntry);

    return NextResponse.json(
      {
        message: "Tasks successfully added to existing entry",
        data: existingEntry,
      },
      { status: 200 }
    );
  }

  // Otherwise, create a new entry with tasks that have IDs
  const newEntry = {
    id: uuid(),
    timesheetId: id,
    date,
    tasks: addTaskIds(tasks),
  };

  entries.push(newEntry);

  console.log("New entry created:", newEntry);

  return NextResponse.json(
    {
      message: "New entry created successfully",
      data: newEntry,
    },
    { status: 201 }
  );
}
