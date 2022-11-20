import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
    Alert,
    Container,
    Typography,
    Box,
    Link,
    TextField,
    CssBaseline,
    Avatar,
} from "@mui/material";
import { fetchApi } from "../../api";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

export const LogIn: React.FC = () => {
    const [isError, setError] = React.useState(false);
    const navigate = useNavigate();
    const [isLoading, setLoading] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(false);
        setLoading(true);
        const data = new FormData(event.currentTarget);
        fetchApi(
            "/login",
            "PUT",
            JSON.stringify({
                email: data.get("email"),
                password: data.get("password"),
            })
        )
            .then((res) => res.json())
            .then((data) =>
                fetchApi("/profile?id=" + data.id).then((res) => res.json())
            )
            .then((state) => navigate("/", { state }))
            .catch(() => {
                setError(true);
            })
            .finally(() => setLoading(false));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                {isError && (
                    <Alert severity="error">
                        Something went wrong, please try again
                    </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        loading={isLoading}
                    >
                        Log In
                    </LoadingButton>
                    <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};
