import { RootState } from "../store/store";

export const getCurrentUser = (state: RootState) => state.user.currentUser;
