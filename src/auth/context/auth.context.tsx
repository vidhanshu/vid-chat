import { createContext } from "react";

import { TAuthContext } from "@/src/auth/types";

export const AuthContext = createContext<TAuthContext>({
  user: null,
  setUser: () => {},
  loading: false,
});
