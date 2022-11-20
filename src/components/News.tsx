import React from "react";
import { useAuth } from "../Context/AuthProvider";
import { Interest } from "./Interest";
import { Box, Typography } from "@mui/material";

export const News: React.FC = () => {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <Box sx={{ marginBottom: 10 }}>
            <Typography variant="h5" gutterBottom>
                News
            </Typography>
            {user.interests.map((interestName) => (
                <Interest name={interestName} />
            ))}
        </Box>
    );
};
