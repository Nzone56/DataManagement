import { RootState } from "../app/store";

export const selectData = (state: RootState) => state.data.data;
