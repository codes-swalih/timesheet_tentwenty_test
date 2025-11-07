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

  const addTaskIds = (taskOrTasks: any) => {
    const taskArray = Array.isArray(taskOrTasks) ? taskOrTasks : [taskOrTasks];
    return taskArray.map((task) => ({
      ...task,
      id: uuid(), 
    }));
  };

  const existingEntry = entries.find(
    (en) => en.timesheetId === id && en.date === date
  );

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
