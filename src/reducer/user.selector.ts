import { RootState } from "../app/store";

export const getCurrentUser = (state: RootState) => state.user.currentUser;
