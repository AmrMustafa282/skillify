"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

/**
 * A hook that checks if user session has expired
 *
 * @returns {Object} An object with the following properties:
 *   - `session`: The user session object
 *   - `status`: The authentication status
 *   - `isSessionExpired`: A boolean indicating if the session has expired
 *   - `signIn`: A function to sign in a user
 *   - `signOut`: A function to sign out a user
 */

const useAuthenticate = () => {
  const { data: session, status } = useSession();
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  useEffect(() => {
    if (session?.expires) {
      const now = new Date().getTime();
      const expiresAt = new Date(session.expires).getTime();
      setIsSessionExpired(now > expiresAt);
    }
  }, [session]);
  console.log({ session, status, isSessionExpired, signIn, signOut });
  return { session, status, isSessionExpired, signIn, signOut };
};

export default useAuthenticate;

