import { useAuth } from "./use-auth";
import { useCallback } from "react";

const API_SERVER = import.meta.env.VITE_API_SERVER;

export const useFetch = () => {
  const { token, logout } = useAuth();

  const authFetch = useCallback(
    async (url, options = {}) => {
      try {
        const headers = {
          ...(options.headers || {}),
          Authorization: token ? `Bearer ${token}` : undefined,
        };

        const endpoint = new URL(`/fe/api${url}`, API_SERVER);

        const response = await fetch(endpoint, {
          ...options,
          headers,
        });

        // const response = await fetch(`/api${url}`, {
        //   ...options,
        //   headers,
        // });

        if (response.status === 401) {
          logout();
          throw new Error("Unauthorized");
        }

        return response;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
    [token, logout]
  );

  return authFetch;
};
