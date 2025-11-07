import { entries } from "@/lib/mockData";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string; entryId: string }> }
) {
  const { id, entryId } = await params;

  const timeSheetEntry = entries.find((entry) => entry.id === entryId);

  if (!timeSheetEntry) {
    return NextResponse.json(
      { message: "Sorry this item is not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "Entry successfully fetched",
    data: timeSheetEntry,
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; entryId: string }> }
) {
  const { id, entryId } = await params;
  const payload = await req.json();

  const index = entries.findIndex((entry) => entry.id === entryId);

  if (index === -1) {
    return NextResponse.json({ message: "Entry not found" }, { status: 404 });
  }

  entries[index] = { ...entries[index], ...payload };

  return NextResponse.json({
    message: "Entry successfully updated",
    data: entries[index],
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; entryId: string }> }
) {
  const { id, entryId } = await params;

  const { taskId } = await req.json();

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

  // Fixed: removed the extra ?? before , 1
  const deletedTask = findEntry.tasks.splice(findTaskIndexToDelete, 1);

  return NextResponse.json({
    message: "Task successfully deleted",
    data: deletedTask[0],
  });
}
