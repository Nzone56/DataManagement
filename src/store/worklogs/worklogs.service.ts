import { Worklog } from "../../models/interfaces/TimeManager/IWorklog";

// Base URL de json-server
const API_URL_WORKLOGS = "http://localhost:3000/worklogs";

const fetchWorklogs = async () => {
  const response = await fetch(API_URL_WORKLOGS);
  return (await response.json()) as Worklog[];
};

const addWorklog = async (worklog: Worklog) => {
  const response = await fetch(API_URL_WORKLOGS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(worklog),
  });

  return await response.json();
};

const updateWorklog = async (worklog: Worklog) => {
  const response = await fetch(`${API_URL_WORKLOGS}/${worklog.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(worklog),
  });

  return await response.json();
};

const removeWorklog = async (id: string) => {
  const response = await fetch(`${API_URL_WORKLOGS}/${id}`, { method: "DELETE" });
  return await response.json();
};

const setWorklogs = async (worklogs: Worklog[]) => {
  const requests = worklogs.map((worklog) =>
    fetch(API_URL_WORKLOGS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(worklog),
    }).then((res) => res.json())
  );
  return Promise.all(requests);
};

export const WorklogService = {
  fetchWorklogs,
  addWorklog,
  updateWorklog,
  removeWorklog,
  setWorklogs,
};
