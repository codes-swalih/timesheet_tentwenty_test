export type Timesheet = {
  id: string;
  week: number;
  startDate: string;
  endDate: string;
  status?: string;
  percentage?: number;
  totalHours?: number;
};

export type Task = {
  id?: string;
  projectName: string;
  workType: string;
  description?: string;
  hours: number;
};

export type TimesheetEntry = {
  id: string;
  timesheetId: string;
  date: string;
  tasks?: Task[];
  key?: string;
  formattedDate?: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
};

export type TaskCardsProps = {
  status: "COMPLETED" | "INCOMPLETE" | "MISSING" | "PENDING" | string;
  formattedDays: TimesheetEntry[];
  timeSheetId?: string;
  onEntryCreated?: () => void;
};

export type EntrySelectInput = {
  label: string;
  value: string;
};

export type TaskAddModelProps = {
  formattedDate: string;
  timeSheetId: string;
};
