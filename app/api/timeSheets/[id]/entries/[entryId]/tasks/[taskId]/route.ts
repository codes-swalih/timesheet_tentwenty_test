import { entries } from "@/lib/mockData";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: { params: Promise<{ id: string; entryId: string; taskId: string }> }
) {
  const { id, entryId, taskId } = await params;

  const findEntry = entries.find((en) => en.id === entryId);
  if (!findEntry) {
    return NextResponse.json({ message: "No entry found" }, { status: 404 });
  }

  if (!findEntry.tasks || findEntry.tasks.length === 0) {
    return NextResponse.json(
      { message: "No tasks found in this entry" },
      { status: 404 }
    );
  }

  const task = findEntry.tasks.find((ts) => ts.id === taskId);

  if (!task) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "Task successfully fetched",
    data: task,
  });
}

export async function PUT(
  req: Request,
  {
    params,
  }: { params: Promise<{ id: string; entryId: string; taskId: string }> }
) {
  const { id, entryId, taskId } = await params;
  const body = await req.json();

  const findEntry = entries.find((en) => en.id === entryId);
  if (!findEntry) {
    return NextResponse.json({ message: "No entry found" }, { status: 404 });
  }

  if (!findEntry.tasks || findEntry.tasks.length === 0) {
    return NextResponse.json(
      { message: "No tasks found in this entry" },
      { status: 404 }
    );
  }

  const findTaskIndex = findEntry.tasks.findIndex((ts) => ts.id === taskId);

  if (findTaskIndex === -1) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  // Update the task with new data, preserving the id
  findEntry.tasks[findTaskIndex] = {
    ...findEntry.tasks[findTaskIndex],
    ...body,
    id: taskId, // Ensure id doesn't get overwritten
  };

  return NextResponse.json({
    message: "Task successfully updated",
    data: findEntry.tasks[findTaskIndex],
  });
}

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: Promise<{ id: string; entryId: string; taskId: string }> }
) {
  const { id, entryId, taskId } = await params;

  const findEntry = entries.find((en) => en.id === entryId);
  if (!findEntry) {
    return NextResponse.json({ message: "No entry found" }, { status: 404 });
  }

  if (!findEntry.tasks || findEntry.tasks.length === 0) {
    return NextResponse.json(
      { message: "No tasks found in this entry" },
      { status: 404 }
    );
  }

  const findTaskIndexToDelete = findEntry.tasks.findIndex(
    (ts) => ts.id === taskId
  );

  if (findTaskIndexToDelete === -1) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  const deletedTask = findEntry.tasks.splice(findTaskIndexToDelete, 1);

  return NextResponse.json({
    message: "Task successfully deleted",
    data: deletedTask[0],
  });
}
