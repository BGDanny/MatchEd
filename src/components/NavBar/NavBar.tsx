import { Box, Button } from "@mui/material";
import logo from "./Logo.png";
import React from "react";
import { useAuth } from "../../Context/AuthProvider";

export const NavBar: React.FC = () => {
    const { user, setUser } = useAuth();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mx: {
                    xs: "20px",
                    md: "50px",
                },
            }}
        >
            <Box
                component="img"
                sx={{
                    height: 50,
                }}
                alt="Logo"
                src={logo}
            />
            {user ? (
                <Button onClick={() => setUser(undefined)}>Log out</Button>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => (window.location.pathname = "login")}
                    >
                        Log In
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => (window.location.pathname = "signup")}
                    >
                        Sign up
                    </Button>
                </Box>
            )}
        </Box>
    );
};
