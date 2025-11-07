import { entries } from "@/lib/mockData";

export function computeStatsForTimesheet(id: string, totalTarget = 40) {
  const entriesFor = entries.filter((e) => e.timesheetId === id);

  const totalHours = entriesFor.reduce((sum, entry) => {
    const tasks = entry.tasks ?? [];
    const entryHours = tasks.reduce((s, t) => s + (t.hours ?? 0), 0);
    return sum + entryHours;
  }, 0);

  const percentageRaw = (totalHours / totalTarget) * 100;
  const percentage = Math.min(Math.round(percentageRaw * 10) / 10, 100);

  const status =
    totalHours >= totalTarget
      ? "COMPLETED"
      : totalHours > 0
      ? "INCOMPLETE"
      : "MISSING";

  const remainingHours = Math.max(totalTarget - totalHours, 0);

  return { totalHours, status, percentage, remainingHours };
}
