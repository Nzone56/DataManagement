import { ISettings } from "../../models/interfaces/Settings/ISettings";

// Base URL de json-server
const API_URL = "http://localhost:3000/settings";

const fetchSettings = async () => {
  const response = await fetch(API_URL);
  return (await response.json()) as ISettings;
};

const updateSettings = async (settings: ISettings) => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });

  return await response.json();
};

export const SettingsService = {
  fetchSettings,
  updateSettings,
};
