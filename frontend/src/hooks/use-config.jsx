import { useContext } from "react";
import { ConfigContext } from "../context/config/ConfigContext";

export const useConfig = () => useContext(ConfigContext);
