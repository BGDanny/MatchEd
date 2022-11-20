import React from "react";
import { useAuth } from "../../Context/AuthProvider";
import { HeaderFooterLayout } from "../../layouts/HeaderFooterLayout/HeaderFooterLayout";
import { useLocation } from "react-router-dom";
import { News } from "../../components/News";
import { Box, Typography } from "@mui/material";
import CTA from "../../components/CTA";
import MentorList from "../MentorList";

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
                <>
                    <Typography variant="subtitle1">
                        Welcome to MatchEd, {user.first_name}!
                    </Typography>
                    <News />
                    {user.type === "Mentee" && <MentorList />}
                </>
            ) : (
                <Box>
                    <CTA />
                </Box>
            )}
        </HeaderFooterLayout>
    );
};
