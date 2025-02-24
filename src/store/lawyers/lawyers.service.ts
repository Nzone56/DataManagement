import { Lawyer } from "../../models/interfaces/Lawyer/ILawyer";

// Base URL de json-server
const API_URL = "http://localhost:3000/lawyers";

const fetchLawyers = async () => {
  const response = await fetch(API_URL);
  return (await response.json()) as Lawyer[];
};

const addLawyer = async (lawyer: Lawyer) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lawyer),
  });

  return await response.json();
};

const updateLawyer = async (lawyer: Lawyer) => {
  const response = await fetch(`${API_URL}/${lawyer.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lawyer),
  });

  return await response.json();
};

const removeLawyer = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return await response.json();
};

export const LawyerService = {
  fetchLawyers,
  addLawyer,
  updateLawyer,
  removeLawyer,
};
