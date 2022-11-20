import React from "react";

export interface User {
    first_name: string;
    last_name: string;
    interests: string[];
    languages: string;
    email: string;
    type: string;
    password?: string;
    labels?: string;
    id?: string;
}

export interface AuthProviderProps {
    user?: User;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}
