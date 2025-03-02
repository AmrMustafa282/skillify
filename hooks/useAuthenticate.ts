"use client";
import axios from "axios";
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

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
        {},
        {
          withCredentials: true, // Include cookies in the request
        }
      );
      if (res.status === 200) {
        // Update session with new access token
        signIn("credentials", {
          accessToken: res.data.accessToken,
          refreshToken: session?.refreshToken,
        });
        return res.data.accessToken;
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      signOut();
    }
  };

  //  authorization from backend server
  const fetchData = async (url: string) => {
    if (session?.accessToken) {
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        return res.data;
      } catch (error) {
        console.error("Fetch data error:", error);
        if (error.response?.status === 401 && session.refreshToken) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            try {
              const res = await axios.get(url, {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              return res.data;
            } catch (error) {
              console.error("Fetch data error after refresh:", error);
            }
          }
        }
      }
    }
  };
  return { session, status, isSessionExpired, signIn, signOut, fetchData };
};

export default useAuthenticate;
