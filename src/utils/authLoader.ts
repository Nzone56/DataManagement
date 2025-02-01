import { redirect } from "react-router";

export const checkUser = () => {
  const selectedUserStorage = localStorage.getItem("selectedUser");
  if (selectedUserStorage) {
    return redirect("/home");
  } else {
    return null;
  }
};

export const restrictAccess = () => {
  const selectedUserStorage = localStorage.getItem("selectedUser");
  if (!selectedUserStorage) {
    return redirect("/");
  }
  return null;
};
