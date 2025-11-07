export async function getSingleTask(payload: {
  timesheetId: string;
  entryId: string;
  taskId: string;
}) {
  try {
    const { timesheetId, entryId, taskId } = payload;

    if (!timesheetId || !entryId || !taskId) {
      throw new Error("Missing required parameters");
    }

    const response = await fetch(
      `/api/timeSheets/${timesheetId}/entries/${entryId}/tasks/${taskId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Failed with ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Get task failed:", error);
    return { message: "Cannot fetch task", error };
  }
}

export async function updateTask(payload: {
  timesheetId: string;
  entryId: string;
  taskId: string;
  taskData: {
    projectName?: string;
    workType?: string;
    description?: string;
    hours?: number;
  };
}) {
  try {
    const { timesheetId, entryId, taskId, taskData } = payload;

    if (!timesheetId || !entryId || !taskId) {
      throw new Error("Missing required parameters");
    }

    const response = await fetch(
      `/api/timeSheets/${timesheetId}/entries/${entryId}/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Failed with ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Update task failed:", error);
    return { message: "Cannot update task", error };
  }
}

export async function createEntry(payload: {
  timesheetId: string;
  date: string;
  task: {
    projectName: string;
    workType: string;
    description: string;
    hours: number;
  };
}) {
  try {
    const { timesheetId, date, task } = payload;

    if (!timesheetId || !date) {
      throw new Error("timesheetId and date are required");
    }

    if (!task || !task.projectName) {
      throw new Error("Task details are required");
    }

    const response = await fetch(`/api/timeSheets/${timesheetId}/entries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timesheetId,
        date,
        tasks: task,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Failed with ${response.status}`);
    }
    const data = await response.json();
    console.log(data.data);

    return data.data;
  } catch (error) {
    console.error("Create entry failed:", error);
    return { message: "Cannot create a new entry", error };
  }
}

export async function deleteTask(payload: {
  timesheetId: string;
  entryId: string;
  taskId: string;
}) {
  try {
    const { timesheetId, entryId, taskId } = payload;

    if (!timesheetId || !entryId || !taskId) {
      throw new Error("Please give the required inputs");
    }

    const response = await fetch(
      `/api/timeSheets/${timesheetId}/entries/${entryId}/tasks/${taskId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Failed with ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Delete task failed:", error);
    return { message: "Cannot delete task", error };
  }
}
