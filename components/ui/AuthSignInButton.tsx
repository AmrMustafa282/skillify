import { Button } from "@/components/ui/button";
import useAuthenticate from "@/hooks/useAuthenticate";

function AuthSignInButton({ provider, children }) {
  const { signIn } = useAuthenticate();
  return (
    <Button
      variant="outline"
      className="w-full"
      type="button"
      onClick={() => signIn(provider, { callbackUrl: "/me" })}
    >
      {children}
    </Button>
  );
}

export { AuthSignInButton };
