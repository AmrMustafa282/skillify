"use client";
import { useEffect } from "react";
import useUserStore from "../zustand/userStore";

const useCheckUserExpiration = () => {
  const { user, expiresAt, clearUser } = useUserStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user && expiresAt && Date.now() > expiresAt) {
        clearUser();
      }
    }
  }, [user, expiresAt, clearUser]);
};

export default useCheckUserExpiration;
