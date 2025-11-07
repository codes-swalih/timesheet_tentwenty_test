import { Timesheet, TimesheetEntry } from "@/types/types";
import dayjs from "dayjs";
export const formatDateRange = (data: Timesheet[]) => {
  const rows = data.map((t) => {
    const dateRange =
      (t as any).startDate && (t as any).endDate
        ? `${dayjs((t as any).startDate).format("D MMM")} - ${dayjs(
            (t as any).endDate
          ).format("D MMM YYYY")}`
        : (t as any).dateRange ?? "-";

    return {
      ...t,
      key: t.id,
      dateRange,
    } as Timesheet & { key: string; dateRange: string };
  });
  return rows;
};

export const singleWeekFormatter = (startDate: string, endDate: string) => {
  const formattedDate =
    startDate && endDate
      ? `${dayjs(startDate).format("D MMM")} - ${dayjs(endDate).format(
          "D MMM YYYY"
        )}`
      : "-";

  return formattedDate;
};

export const singleDayFormatter = (entryData: TimesheetEntry[]) => {
  const entryDatas = entryData.map((ed) => {
    const formattedDate = (ed as any).date
      ? `${dayjs((ed as any).date).format("D MMMM")}`
      : (ed as any).date ?? "-";

    return {
      ...ed,
      key: ed.id,
      formattedDate,
    } as TimesheetEntry & { key: string; date: string };
  });

  return entryDatas
};
