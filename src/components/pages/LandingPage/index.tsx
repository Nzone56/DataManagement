import { useNavigate } from "react-router";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { User } from "../../../models/interfaces/User/IUser";
import { getCurrentUser } from "../../../store/user/user.selector";
import { setCurrentUser } from "../../../store/user/user.actions";

const PlaceholderUser: User = {
  uid: "123",
  name: "Nubia",
  lastName: "Torres",
  email: "nubiabermudez@bermudezyco.com.co",
  company: "Bermudez & Co",
};

export const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const login = () => {
    dispatch(setCurrentUser(PlaceholderUser));
  };

  useEffect(() => {
    if (currentUser?.uid) {
      localStorage.setItem("selectedUser", JSON.stringify(PlaceholderUser));
      navigate("/home");
    }
    //eslint-disable-next-line
  }, [currentUser]);

  return (
    <div>
      <button onClick={login}> SIGN IN </button>
    </div>
  );
};
