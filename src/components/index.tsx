import React from "react";
import { useAuth } from "../Context/AuthProvider";
import { LoginModal } from "./LoginModal";
import { SignupModal } from "./SignupModal";
import Button from "@mui/material/Button";

export const MainPage: React.FC = () => {
    const { user } = useAuth();
    const [isLoginModalOpen, setLoginModalOpen] = React.useState(false);
    const [isSignupModalOpen, setSignupModalOpen] = React.useState(false);
    return user ? (
        <h1>Welcome to MatchEd, {user.firstName}</h1>
    ) : (
        <>
            <div>
                Welcome to MatchEd. Please sign up or login to access all the
                features
            </div>
            <Button variant="contained" onClick={() => setLoginModalOpen(true)}>
                Login
            </Button>
            <Button variant="outlined">Sign up</Button>
            <LoginModal
                open={isLoginModalOpen}
                onClose={() => setLoginModalOpen(false)}
            />
            <SignupModal
                open={isSignupModalOpen}
                onClose={() => setSignupModalOpen(false)}
            />
        </>
    );
};
