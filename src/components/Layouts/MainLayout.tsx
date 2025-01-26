import { MainContainer } from "../MainContainer";
import { SideMenu } from "../Menu/SideMenu";
import { MainLayoutContainer } from "./MainLayout.styled";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <MainLayoutContainer>
      <SideMenu />
      <MainContainer>{children}</MainContainer>
    </MainLayoutContainer>
  );
};
