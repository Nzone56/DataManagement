import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "../store";
import { Worklog } from "../../models/interfaces/TimeManager/IWorklog";
import { WorklogService } from "./worklogs.service";

export const fetchWorklogs = createAsyncThunk<Worklog[]>("worklogs/fetchWorklogs", () =>
  WorklogService.fetchWorklogs()
);

export const addWorklog = createAsyncThunk<Worklog, Worklog, ThunkApiConfig>(
  "worklogs/addWorklog",
  (worklog: Worklog) => WorklogService.addWorklog(worklog)
);
export const removeWorklog = createAsyncThunk<string, string, ThunkApiConfig>(
  "worklogs/removeWorklog",
  (worklogId: string) => {
    WorklogService.removeWorklog(worklogId);
    return worklogId;
  }
);
export const updateWorklog = createAsyncThunk<Worklog, Worklog, ThunkApiConfig>(
  "worklogs/updateWorklog",
  (worklog: Worklog) => WorklogService.updateWorklog(worklog)
);

export const setWorklogs = createAsyncThunk<Worklog[], Worklog[], ThunkApiConfig>(
  "worklogs/setWorklogs",
  (worklogs: Worklog[]) => WorklogService.setWorklogs(worklogs)
);
