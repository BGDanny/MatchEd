import React from "react";
import { AuthProviderProps } from "../model";

export const AuthContext = React.createContext<AuthProviderProps>(
    {} as AuthProviderProps
);

export const useAuth = () => React.useContext(AuthContext);
