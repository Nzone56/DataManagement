import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "../store";
import { ReceiptService } from "./receipts.service";
import { Receipt } from "../../models/interfaces/Receipt/IReceipts";

export const fetchReceipts = createAsyncThunk<Receipt[]>("receipts/fetchReceipts", () =>
  ReceiptService.fetchReceipts()
);

export const addReceipt = createAsyncThunk<Receipt, Receipt, ThunkApiConfig>(
  "receipts/addReceipt",
  (receipt: Receipt) => ReceiptService.addReceipt(receipt)
);
export const removeReceipt = createAsyncThunk<string, string, ThunkApiConfig>(
  "receipts/removeReceipt",
  (receiptId: string) => {
    ReceiptService.removeReceipt(receiptId);
    return receiptId;
  }
);
export const updateReceipt = createAsyncThunk<Receipt, Receipt, ThunkApiConfig>(
  "receipts/updateReceipt",
  (receipt: Receipt) => ReceiptService.updateReceipt(receipt)
);

export const setReceipts = createAsyncThunk<Receipt[], Receipt[], ThunkApiConfig>(
  "receipts/setReceipts",
  (receipts: Receipt[]) => ReceiptService.setReceipts(receipts)
);
