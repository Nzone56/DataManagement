import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../store/user/user.actions";
import { getCurrentUser } from "../store/user/user.selector";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(getCurrentUser);
  const location = useLocation();

  useEffect(() => {
    const selectedUserStorage = localStorage.getItem("selectedUser");
    const isHomePage = location.pathname === "/";

    if (currentUser?.uid) {
      if (isHomePage) {
        navigate("/home");
      }
    } else {
      if (selectedUserStorage) {
        const user = JSON.parse(selectedUserStorage);
        dispatch(setCurrentUser(user));
        if (isHomePage) {
          navigate("/home");
        }
      } else {
        navigate("/");
      }
    }

    //eslint-disable-next-line
  }, []);
};

export default useAuthCheck;
