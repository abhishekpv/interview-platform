import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const isUserAuthenticated = await isAuthenticated();
  console.log("authauth", isUserAuthenticated);

  if (isUserAuthenticated) {
    redirect("/");
  }

  return <div className=" auth-layout ">{children}</div>;
};

export default AuthLayout;
