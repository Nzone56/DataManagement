import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../reducer/user.actions";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const selectedUserStorage = localStorage.getItem("selectedUser");

    if (selectedUserStorage) {
      const user = JSON.parse(selectedUserStorage);
      dispatch(setCurrentUser(user));
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);
};

export default useAuthCheck;
