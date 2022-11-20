import React from "react";
import { useAuth } from "../../Context/AuthProvider";
import LoginModal from "../../components/LoginModal";
import SignupModal from "../../components/SignupModal";
import Button from "@mui/material/Button";
import { HeaderFooterLayout } from "../../layouts/HeaderFooterLayout/HeaderFooterLayout";

export const Home: React.FC = () => {
    const { user } = useAuth();
    const [isLoginModalOpen, setLoginModalOpen] = React.useState(false);
    const [isSignupModalOpen, setSignupModalOpen] = React.useState(false);

    if (user)
        return (
            <HeaderFooterLayout>
                <h1>Welcome to MatchEd, {user.firstName}</h1>
                <>
                    <div>
                        Welcome to MatchEd. Please sign up or login to access all the
                        features
                    </div>
                    <Button variant="contained" onClick={() => setLoginModalOpen(true)}>
                        Login
                    </Button>
                    <Button variant="outlined" onClick={() => setSignupModalOpen(true)}>Sign up</Button>
                    <LoginModal
                        open={isLoginModalOpen}
                        onClose={() => setLoginModalOpen(false)}
                    />
                    <SignupModal
                        open={isSignupModalOpen}
                        onClose={() => setSignupModalOpen(false)}
                    />
                </>
            </HeaderFooterLayout>
        )
};
