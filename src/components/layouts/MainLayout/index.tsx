import useAuthCheck from "../../../hooks/useAuthCheck";
import { MainContainer } from "../../MainContainer";
import { SideMenu } from "../../SideMenu";
import { MainContentContainer, MainLayoutContainer } from "./MainLayout.styled";
import { TopBar } from "../TopBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useAuthCheck();

  return (
    <MainLayoutContainer>
      <SideMenu />
      <MainContentContainer>
        <TopBar />
        <MainContainer>{children}</MainContainer>
      </MainContentContainer>
    </MainLayoutContainer>
  );
};
