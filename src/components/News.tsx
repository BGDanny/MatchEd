import React from "react";
import { useAuth } from "../Context/AuthProvider";
import { Interest } from "./Interest";
import { Box } from "@mui/material";

export const News: React.FC = () => {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <Box sx={{ marginBottom: 10 }}>
            {user.interests.map((interestName) => (
                <Interest name={interestName} />
            ))}
        </Box>
    );
};
