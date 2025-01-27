import { useNavigate } from "react-router";
import { setCurrentUser } from "../../../reducer/user.actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../reducer/user.selector";
import { User } from "../../../models/interfaces/interfaces";

const PlaceholderUser: User = {
  uid: "123",
  name: "Nubia",
  lastname: "Bermudez",
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
