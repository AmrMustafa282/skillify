import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import type React from "react";

interface AuthSignInButtonProps {
  provider: string;
  children?: React.ReactNode;
}

export const AuthSignInButton: React.FC<AuthSignInButtonProps> = ({ provider, children }) => {
  const handleClick = async () => {
    await signIn(provider, { callbackUrl: "/" });
  };

  return (
    <Button variant={"outline"} onClick={handleClick}>
      {children}
    </Button>
  );
};
