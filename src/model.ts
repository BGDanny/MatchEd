import React from "react";

export interface User {
    firstName: string;
    lastName: string;
}

export interface AuthProviderProps {
    user?: User;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}
