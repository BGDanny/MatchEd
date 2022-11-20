import React from "react";
import { Modal, TextField, Button } from "@mui/material";
import { ModalWrapper } from "./styles";

export const LoginModal: React.FC<{ open: boolean; onClose: () => void }> = ({
    open,
    onClose,
}) => {
    const [userInput, setUserInput] = React.useState({
        email: "",
        password: "",
    });

    return (
        <Modal open={open} onClose={onClose}>
            <ModalWrapper>
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
                />
                <Button fullWidth>Login</Button>
            </ModalWrapper>
        </Modal>
    );
};
