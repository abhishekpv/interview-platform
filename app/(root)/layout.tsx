import Logo from "@/components/Logo";
import { isAuthenticated } from "@/lib/actions/auth.action";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }
  return (
    <div className="root-layout">
      <nav>
        <Link href={"/"} className="flex items-center gap-2">
          <Logo />
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
