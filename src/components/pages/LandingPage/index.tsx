import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../server/firebase";

export const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(
        setCurrentUser({
          uid: user.uid,
          name: user.displayName || "Usuario",
          lastName: "Torres",
          email: String(user.email),
          company: "Bermúdez & Co", // Puedes modificar según corresponda
        })
      );
    } catch (error) {
      setError("Correo o contraseña incorrectos.");
    }
  };

  useEffect(() => {
    if (currentUser?.uid) {
      localStorage.setItem("selectedUser", JSON.stringify(currentUser));
      navigate("/home");
    }
  }, [currentUser, navigate]);

  return (
    <LandingPageContainer>
      <LandingPageCard>
        <LandingPageLogin>
          <LandingPageTitle variant="h2">Empieza ahora</LandingPageTitle>
          <LandingPageSubTitle>Ingresa tus credenciales para acceder a tu cuenta</LandingPageSubTitle>
          <ColumnJustifyFlex mt={4} mb={1}>
            <ModalFormTitle>Correo:</ModalFormTitle>
            <TextField
              variant="outlined"
              placeholder="Usuario"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </ColumnJustifyFlex>
          <ColumnJustifyFlex mb={2}>
            <ModalFormTitle>Contraseña:</ModalFormTitle>
            <TextField
              variant="outlined"
              placeholder="Contraseña"
              size="small"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ColumnJustifyFlex>
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          <PrimaryButton variant="contained" onClick={login}>
            SIGN IN
          </PrimaryButton>
        </LandingPageLogin>
        <LandingPagePreview>
          <LandingPageTitle variant="h2">Una manera simple de manejar tu trabajo</LandingPageTitle>
          <LandingPageSubTitle>Ingresa tus credenciales para acceder a tu cuenta</LandingPageSubTitle>
        </LandingPagePreview>
      </LandingPageCard>
    </LandingPageContainer>
  );
};
