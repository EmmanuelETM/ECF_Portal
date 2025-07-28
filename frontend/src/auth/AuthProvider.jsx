import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    const tokenFromStorage = localStorage.getItem("token");

    console.log("provider mounted");

    if (tokenFromUrl && tokenFromUrl.length > 1) {
      localStorage.setItem("token", tokenFromUrl);
      setToken(tokenFromUrl);
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } else if (tokenFromStorage && tokenFromStorage.length > 1) {
      setToken(tokenFromStorage);
    } else {
      logout();
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    window.location.href = "https://summasoft.do/acceder/?app=fe";
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
