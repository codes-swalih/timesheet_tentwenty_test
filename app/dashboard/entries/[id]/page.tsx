"use client";
import { useParams } from "next/navigation";
import useFetchOnMount from "@/hooks/useFetchOnMount";
import { Timesheet, TimesheetEntry, Task } from "@/types/types";
import { Progress, Tooltip } from "antd";
import { singleDayFormatter, singleWeekFormatter } from "@/utils/DateFormatter";
import TaskCards from "../components/TaskCards";

function Page() {
  const { id } = useParams();
  const { data: timeSheet, refetch: refetchTimesheet } =
    useFetchOnMount<Timesheet>(`/api/timeSheets/${id}`);

  const { data: entries, refetch: refetchEntries } = useFetchOnMount<
    TimesheetEntry[]
  >(`/api/timeSheets/${id}/entries`);

  const { percentage, startDate, endDate, totalHours, status } =
    timeSheet ?? {};

  const formattedWeek = singleWeekFormatter(startDate ?? "", endDate ?? "");
  const formattedDays = singleDayFormatter(entries ?? []);

  const handleEntryCreated = async () => {
    await refetchEntries();
    await refetchTimesheet();
  };

  return (
    <div className="p-5 md:p-10 min-h-screen bg-gray-100 flex justify-center">
      <div className="md:w-4/5 w-full h-full bg-white rounded-2xl md:p-10 p-5">
        <div className="w-full md:flex md:items-center justify-between">
          <h1 className="md:w-1/2 text-2xl font-bold">This week's timesheet</h1>
          <div className="md:w-1/3">
            <Tooltip title={`${totalHours}/40`}>
              <Progress percent={percentage} size="small" status="active" />
            </Tooltip>
          </div>
        </div>
        <h1>{formattedWeek}</h1>

        <TaskCards
          formattedDays={formattedDays}
          status={status ?? ""}
          timeSheetId={id as string}
          onEntryCreated={handleEntryCreated}
        />
      </div>
    </div>
  );
}

export default Page;
