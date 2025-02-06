import { AuthSignInButton } from "@/components/ui/AuthSignInButton";

function AuthSignupButton({ provider, children }) {
  return <AuthSignInButton provider={provider}>{children}</AuthSignInButton>;
}
export { AuthSignupButton };
