import { useContext } from "react";
import { authContext } from "../context/AuthContext";

export const useAuthContext = () => useContext(authContext);
