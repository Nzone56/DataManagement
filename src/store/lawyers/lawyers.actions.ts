import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Lawyer } from "../../models/interfaces/Lawyer/ILawyer";
import { LawyerService } from "./lawyers.service";
import { ThunkApiConfig } from "../store";

export const addLawyer = createAsyncThunk<Lawyer, Lawyer, ThunkApiConfig>("lawyers/addLawyer", (lawyer: Lawyer) =>
  LawyerService.addLawyer(lawyer)
);
export const removeLawyer = createAsyncThunk<string, string, ThunkApiConfig>(
  "lawyers/removeLawyer",
  (lawyerId: string) => {
    LawyerService.removeLawyer(lawyerId);
    return lawyerId;
  }
);
export const updateLawyer = createAsyncThunk<Lawyer, Lawyer, ThunkApiConfig>("lawyers/updateLawyer", (lawyer: Lawyer) =>
  LawyerService.updateLawyer(lawyer)
);
export const fetchLawyers = createAsyncThunk<Lawyer[]>("lawyers/fetchLawyers", () => LawyerService.fetchLawyers());
