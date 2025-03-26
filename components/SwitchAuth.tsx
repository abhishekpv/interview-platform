import Link from "next/link";

type SwitchAuthProps = {
  isSignIn: boolean;
};
const SwitchAuth = ({ isSignIn }: SwitchAuthProps) => {
  return (
    <p className="text-center">
      {isSignIn ? "No account yet? " : "Have an account already? "}
      <Link
        className="font-bold text-user-primary ml-1"
        href={isSignIn ? "/sign-up" : "/sign-in"}
      >
        {isSignIn ? " Sign up" : " Sign in"}
      </Link>
    </p>
  );
};

export default SwitchAuth;
