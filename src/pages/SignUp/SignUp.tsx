import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
    Alert,
    Container,
    Typography,
    Box,
    TextField,
    CssBaseline,
    Avatar,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Chip,
    Link,
} from "@mui/material";
import { fetchApi } from "../../api";
import { useNavigate } from "react-router-dom";
import { User } from "../../model";
import { LoadingButton } from "@mui/lab";

const interestsList = [
    "General",
    "Computer Science",
    "Engineering",
    "Teaching",
    "Art",
    "Writing",
    "Math",
    "Economics",
    "Science",
    "Medicine",
    "Architecture",
];

export const SignUp: React.FC = () => {
    const [isError, setError] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const [userInput, setUserInput] = React.useState({
        languages: "English",
        interests: [] as string[],
    } as User);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(false);
        setLoading(true);
        fetchApi("/signUp", "POST", JSON.stringify(userInput))
            .then(() => navigate("/", { state: userInput }))
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
                    Sign up
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
                        label="Email Address"
                        value={userInput.email}
                        onChange={(event) =>
                            setUserInput((prev) => ({
                                ...prev,
                                email: event.target.value,
                            }))
                        }
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={userInput.password}
                        onChange={(event) =>
                            setUserInput((prev) => ({
                                ...prev,
                                password: event.target.value,
                            }))
                        }
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={userInput.first_name}
                        onChange={(event) =>
                            setUserInput((prev) => ({
                                ...prev,
                                first_name: event.target.value,
                            }))
                        }
                        label="First Name"
                        type="text"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={userInput.last_name}
                        onChange={(event) =>
                            setUserInput((prev) => ({
                                ...prev,
                                last_name: event.target.value,
                            }))
                        }
                        label="Last Name"
                        type="text"
                    />
                    <FormControl
                        fullWidth
                        margin="normal"
                        required
                        variant="filled"
                    >
                        <InputLabel id="language">Language</InputLabel>
                        <Select
                            labelId="language"
                            value={userInput.languages}
                            onChange={(event) =>
                                setUserInput((prev) => ({
                                    ...prev,
                                    languages: event.target.value,
                                }))
                            }
                        >
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="Chinese">Chinese</MenuItem>
                            <MenuItem value="Vietnamese">Vietnamese</MenuItem>
                            <MenuItem value="Tamil">Tamil</MenuItem>
                            <MenuItem value="French">French</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        fullWidth
                        margin="normal"
                        required
                        variant="filled"
                    >
                        <InputLabel id="type">Account Type</InputLabel>
                        <Select
                            labelId="type"
                            value={userInput.type}
                            onChange={(event) =>
                                setUserInput((prev) => ({
                                    ...prev,
                                    type: event.target.value,
                                }))
                            }
                        >
                            <MenuItem value="Mentor">Mentor</MenuItem>
                            <MenuItem value="Mentee">Mentee</MenuItem>
                        </Select>
                    </FormControl>
                    {userInput.type === "Mentor" && (
                        <FormControl
                            fullWidth
                            margin="normal"
                            required
                            variant="filled"
                        >
                            <InputLabel id="label">Label</InputLabel>
                            <Select
                                labelId="label"
                                value={userInput.labels}
                                onChange={(event) =>
                                    setUserInput((prev) => ({
                                        ...prev,
                                        labels: event.target.value,
                                    }))
                                }
                            >
                                {interestsList.map((interest) => (
                                    <MenuItem value={interest}>
                                        {interest}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    <FormControl
                        fullWidth
                        margin="normal"
                        required
                        variant="filled"
                    >
                        <InputLabel id="interest">Interests</InputLabel>
                        <Select
                            multiple
                            labelId="interest"
                            value={userInput.interests}
                            onChange={(event) => {
                                const value = event.target.value;
                                setUserInput((prev) => ({
                                    ...prev,
                                    interests:
                                        typeof value === "string"
                                            ? value.split(",")
                                            : value,
                                }));
                            }}
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.5,
                                    }}
                                >
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {interestsList.map((interest) => (
                                <MenuItem value={interest}>{interest}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        loading={isLoading}
                    >
                        Sign Up
                    </LoadingButton>
                    <Link href="/login" variant="body2">
                        {"Have an account? Log In"}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};
