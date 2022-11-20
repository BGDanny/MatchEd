import React from "react";
import { useAuth } from "../Context/AuthProvider";
import { Interest } from "./Interest";
import Box from "@mui/material/Box";

export const News: React.FC = () => {
    const { user } = useAuth();
    if (!user) return null;

    return (
        <Box>
            {user.interests.map((interestName) => (
                <Interest name={interestName} />
            ))}
        </Box>
    );
};
