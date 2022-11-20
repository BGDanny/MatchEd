import React from "react";
import { useAuth } from "../../Context/AuthProvider";
import { HeaderFooterLayout } from "../../layouts/HeaderFooterLayout/HeaderFooterLayout";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import CTA from "../../components/CTA";

export const Home: React.FC = () => {
    const { user, setUser } = useAuth();
    const { state } = useLocation();

    React.useEffect(() => {
        if (state) {
            setUser(state);
        }
    }, [state, setUser]);

    return (
        <HeaderFooterLayout>
            {user ? (
                <h1>Welcome to MatchEd, {user.first_name}</h1>
            ) : (
                <Box>
                    <CTA />
                    <h1>
                        Welcome to MatchEd. Please sign up or login to access all
                        the features
                    </h1>
                </Box>
            )}
        </HeaderFooterLayout>
    );
};
