import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../models/interfaces/User/IUser";
import { getCurrentUser } from "../../../store/user/user.selector";
import { setCurrentUser } from "../../../store/user/user.actions";
import {
  LandingPageCard,
  LandingPageContainer,
  LandingPageLogin,
  LandingPagePreview,
  LandingPageSubTitle,
  LandingPageTitle,
} from "./LandingPage.styled";
import { ColumnJustifyFlex, PrimaryButton } from "../../Components.styled";
import { ModalFormTitle } from "../../layouts/ListLayout/ListModal.styled";
import { TextField } from "@mui/material";

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
    <LandingPageContainer>
      <LandingPageCard>
        <LandingPageLogin>
          <LandingPageTitle>Empieza ahora</LandingPageTitle>
          <LandingPageSubTitle>Ingresa tus credenciales para acceder a tu cuenta</LandingPageSubTitle>
          <ColumnJustifyFlex mt={4} mb={1}>
            <ModalFormTitle>Correo:</ModalFormTitle>
            <TextField variant="outlined" placeholder={`Usuario`} size="small" />
          </ColumnJustifyFlex>
          <ColumnJustifyFlex mb={2}>
            <ModalFormTitle>Contraseña:</ModalFormTitle>
            <TextField variant="outlined" placeholder={`Contraseña`} size="small" type="password" />
          </ColumnJustifyFlex>
          <PrimaryButton variant="contained" onClick={login}>
            SIGN IN
          </PrimaryButton>
        </LandingPageLogin>
        <LandingPagePreview>
          <LandingPageTitle>Una manera simple de manejar tu trabajo</LandingPageTitle>
          <LandingPageSubTitle>Ingresa tus credenciales para acceder a tu cuenta</LandingPageSubTitle>
        </LandingPagePreview>
      </LandingPageCard>
    </LandingPageContainer>
  );
};
