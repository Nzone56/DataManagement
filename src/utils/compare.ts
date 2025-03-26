import { Client } from "../models/interfaces/Client/IClient";
import { Worklog } from "../models/interfaces/TimeManager/IWorklog";

export const deepEqual = <T>(obj1: T, obj2: T): boolean => {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1) as Array<keyof T>;
  const keys2 = Object.keys(obj2) as Array<keyof T>;

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (typeof val1 === "object" && typeof val2 === "object" && val1 !== null && val2 !== null) {
      if (!deepEqual(val1, val2)) {
        return false;
      }
    } else if (val1 !== val2) {
      return false;
    }
  }

  return true;
};

export const isWorklogArray = (data: any): data is Worklog[] => {
  return Array.isArray(data) && data.every((item) => "lawyerId" in item && "clientId" in item);
};

export const isClientArray = (data: any): data is Client[] => {
  return Array.isArray(data) && data.every((item) => "name" in item && "email" in item);
};
