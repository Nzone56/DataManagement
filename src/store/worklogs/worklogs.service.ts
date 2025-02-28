import { Worklog } from "../../models/interfaces/TimeManager/IWorklog";

// Base URL de json-server
const API_URL_FEES = "http://localhost:3000/worklogs";

const fetchWorklogs = async () => {
  const response = await fetch(API_URL_FEES);
  return (await response.json()) as Worklog[];
};

const addWorklog = async (worklog: Worklog) => {
  const response = await fetch(API_URL_FEES, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(worklog),
  });

  return await response.json();
};

const updateWorklog = async (worklog: Worklog) => {
  const response = await fetch(`${API_URL_FEES}/${worklog.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(worklog),
  });

  return await response.json();
};

const removeWorklog = async (id: string) => {
  const response = await fetch(`${API_URL_FEES}/${id}`, { method: "DELETE" });
  return await response.json();
};

export const WorklogService = {
  fetchWorklogs,
  addWorklog,
  updateWorklog,
  removeWorklog,
};
