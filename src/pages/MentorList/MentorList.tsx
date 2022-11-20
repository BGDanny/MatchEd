import { Button, Chip } from "@mui/material";
import { faker } from "@faker-js/faker";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Carousel from "react-material-ui-carousel";
import {
    Container,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    TextField,
    DialogTitle,
} from "@mui/material";
import { interestsList } from "../SignUp/SignUp";
import { fetchApi } from "../../api";
import { useAuth } from "../../Context/AuthProvider";

export const MentorComponent: React.FC<any> = ({
    first_name,
    last_name,
    languages,
    labels,
    id,
}) => {
    const [matchOpen, setMatchOpen] = React.useState(false);
    const [matchMessage, setMatchMessage] = React.useState("");
    const { user } = useAuth();
    const avatar = React.useRef(faker.image.avatar());

    return (
        <Card sx={{ height: "fit-content", margin: "auto" }}>
            <CardMedia component="img" height="300" image={avatar.current} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {first_name} {last_name}
                </Typography>
            </CardContent>
            <CardActions>
                <Chip
                    size="small"
                    variant="filled"
                    color="primary"
                    label={labels}
                />
                <Chip size="small" variant="outlined" label={languages} />
                <Button
                    size="small"
                    variant="outlined"
                    color="success"
                    onClick={() => setMatchOpen(true)}
                    sx={{ marginX: 5 }}
                >
                    Match
                </Button>
            </CardActions>
            <Dialog
                onClose={() => setMatchOpen(false)}
                open={matchOpen}
                fullWidth
            >
                <DialogTitle>Match Request</DialogTitle>
                <TextField
                    value={matchMessage}
                    onChange={(e) => setMatchMessage(e.target.value)}
                    label="Match Request Message"
                />
                <Button
                    onClick={() => {
                        fetchApi(
                            "/request",
                            "POST",
                            JSON.stringify({
                                mentorId: id,
                                menteeId: user!.id,
                                message: matchMessage,
                            })
                        ).then(() => setMatchOpen(false));
                    }}
                >
                    Send Match Request
                </Button>
            </Dialog>
        </Card>
    );
};

export const MentorList: React.FC = () => {
    const [mentors, setMentors] = React.useState<any[]>([]);
    return (
        <Container>
            <Typography>Pick a mentor from your area of interest</Typography>
            <FormControl fullWidth margin="normal" required variant="filled">
                <InputLabel id="label">Label</InputLabel>
                <Select
                    labelId="label"
                    onChange={(e) => {
                        fetchApi("/search?labels=" + e.target.value)
                            .then((res) => res.json())
                            .then(setMentors);
                    }}
                >
                    {interestsList.map((interest) => (
                        <MenuItem value={interest}>{interest}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Carousel
                autoPlay={false}
                sx={{ width: "500px", height: "fit-content", margin: "auto" }}
            >
                {mentors.map((mentor) => (
                    <MentorComponent {...mentor} />
                ))}
            </Carousel>
        </Container>
    );
};
