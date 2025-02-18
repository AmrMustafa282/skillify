import { AuthSignInButton } from "@/components/auth/_components/AuthSignInButton";

function AuthSignupButton({ provider, children }) {
  return <AuthSignInButton provider={provider}>{children}</AuthSignInButton>;
}
export { AuthSignupButton };
