// app/api/timesheets/route.ts
import { NextResponse } from "next/server";
import { timesheets, entries } from "@/lib/mockData";
import { v4 as uuid } from "uuid";
import { computeStatsForTimesheet } from "@/utils/ComputeStatus";

export async function GET() {
  const result = timesheets.map((t) => {
    const { totalHours, status } = computeStatsForTimesheet(t.id);
    return { ...t, totalHours, status };
  });
  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { week, startDate, endDate } = body;
  if (!week || !startDate || !endDate) {
    return NextResponse.json(
      { message: "week, startDate and endDate are required" },
      { status: 400 }
    );
  }

  const newSheet = {
    id: uuid(),
    week,
    startDate,
    endDate,
  };
  timesheets.unshift(newSheet);

  const { totalHours, status } = computeStatsForTimesheet(newSheet.id);
  return NextResponse.json(
    { ...newSheet, totalHours, status },
    { status: 201 }
  );
}
