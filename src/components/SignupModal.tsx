import React from "react";
import {
    Modal,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import { ModalWrapper } from "./styles";

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

export const SignupModal: React.FC<{ open: boolean; onClose: () => void }> = ({
    open,
    onClose,
}) => {
    const [userInput, setUserInput] = React.useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        languages: "English",
        account_type: "",
        labels: "",
        interests: [] as string[],
    });

    return (
        <Modal open={open} onClose={onClose}>
            <ModalWrapper>
                <TextField
                    label="First Name"
                    value={userInput.first_name}
                    onChange={(event) =>
                        setUserInput((prev) => ({
                            ...prev,
                            first_name: event.target.value,
                        }))
                    }
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Last Name"
                    value={userInput.last_name}
                    onChange={(event) =>
                        setUserInput((prev) => ({
                            ...prev,
                            last_name: event.target.value,
                        }))
                    }
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Email"
                    value={userInput.email}
                    onChange={(event) =>
                        setUserInput((prev) => ({
                            ...prev,
                            email: event.target.value,
                        }))
                    }
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Password"
                    value={userInput.password}
                    onChange={(event) =>
                        setUserInput((prev) => ({
                            ...prev,
                            password: event.target.value,
                        }))
                    }
                    fullWidth
                    margin="dense"
                />
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
                    <MenuItem value="English" defaultChecked>
                        English
                    </MenuItem>
                    <MenuItem value="Chinese">Chinese</MenuItem>
                    <MenuItem value="Vietnamese">Vietnamese</MenuItem>
                    <MenuItem value="Tamil">Tamil</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                </Select>
                <InputLabel id="type">Account Type</InputLabel>
                <Select
                    labelId="type"
                    value={userInput.account_type}
                    onChange={(event) =>
                        setUserInput((prev) => ({
                            ...prev,
                            account_type: event.target.value,
                        }))
                    }
                >
                    <MenuItem value="Mentor">Mentor</MenuItem>
                    <MenuItem value="Mentee">Mentee</MenuItem>
                </Select>
                {userInput.account_type === "Mentor" && (
                    <>
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
                                <MenuItem value={interest}>{interest}</MenuItem>
                            ))}
                        </Select>
                    </>
                )}
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
                >
                    {interestsList.map((interest) => (
                        <MenuItem value={interest}>{interest}</MenuItem>
                    ))}
                </Select>
                <Button fullWidth>Sign up</Button>
            </ModalWrapper>
        </Modal>
    );
};
