import { MainContainerStyles } from "./MainContainer.styled";

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return <MainContainerStyles>{children}</MainContainerStyles>;
};
