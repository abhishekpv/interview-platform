import { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return <div>{children}</div>;
};

export default RootLayout;
