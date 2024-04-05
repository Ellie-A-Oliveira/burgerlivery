import { Header } from "..";
import { ToastRoot } from "../ToastRoot/ToastRoot";
import { LayoutWrapperElement } from "./Layout.style";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <LayoutWrapperElement>{children}</LayoutWrapperElement>
      <ToastRoot />
    </>
  );
};
