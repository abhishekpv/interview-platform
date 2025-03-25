import Logo from "@/components/Logo";
import Link from "next/link";
import { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return <div className="root-layout">
    <nav>
      <Link href={'/'} className="flex items-center gap-2">
      <Logo/>
      </Link>
    </nav>
    {children}</div>;
};

export default RootLayout;
