// app/api/timesheets/[id]/route.ts
import { NextResponse } from "next/server";
import { timesheets, entries } from "@/lib/mockData";
import { computeStatsForTimesheet } from "@/utils/ComputeStatus";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ts = timesheets.find((t) => t.id === id);
  if (!ts) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const { totalHours, status, percentage } = computeStatsForTimesheet(id);
  return NextResponse.json({ ...ts, totalHours, status, percentage });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const payload = await req.json();

  const idx = timesheets.findIndex((t) => t.id === id);
  if (idx === -1)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  timesheets[idx] = { ...timesheets[idx], ...payload };

  const { totalHours, status } = computeStatsForTimesheet(id);
  return NextResponse.json({ ...timesheets[idx], totalHours, status });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const idx = timesheets.findIndex((t) => t.id === id);
  if (idx === -1)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  const [deleted] = timesheets.splice(idx, 1);
  
  for (let i = entries.length - 1; i >= 0; i--) {
    if (entries[i].timesheetId === id) entries.splice(i, 1);
  }

  const { totalHours, status } = computeStatsForTimesheet(id);
  return NextResponse.json({ ...deleted, totalHours, status });
}
