import { AppContainer } from "./App.styled";
import { MainContainer } from "./components/MainContainer";
import { SideMenu } from "./components/Menu/SideMenu";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const App = () => {
  return (
    <AppContainer>
      <SideMenu />
      <MainContainer />
    </AppContainer>
  );
};
