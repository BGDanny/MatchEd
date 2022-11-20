import { useAuth } from "../../Context/AuthProvider";
import { HeaderFooterLayout } from "../../layouts/HeaderFooterLayout/HeaderFooterLayout";
import { useLocation } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { fetchApi } from "../../api";
import { News } from "../../components/News";
import { Box, Typography } from "@mui/material";
import CTA from "../../components/CTA";
import MentorList from "../MentorList";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export const PeopleList: React.FC<{ people: any[] }> = ({ people }) => {
    if(!people.length){
        return null;
    }
    return (
        <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
            {people.map((person: any) => {
                return (
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar src="https://thispersondoesnotexist.com/image" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${person.first_name} ${person.last_name}`}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: "inline" }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {person.email}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};

export const Home: React.FC = () => {
    const { user, setUser } = useAuth();
    const { state } = useLocation();
    const [messages, setMessages] = React.useState<any[]>([]);
    const [mentee, setMentee] = React.useState<any[]>([]);
    const [mentor, setMentor] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (state) {
            setUser(state);
        }
    }, [state, setUser]);

    React.useEffect(() => {
        if (user) {
            fetchApi("/request?id=" + user.id)
                .then((res) => res.json())
                .then((data) => setMessages(data));
            fetchApi("/profile/getMentee?id=" + user.id)
                .then((res) => res.json())
                .then((data) => setMentee(data));
            fetchApi("/profile/getMentor?id=" + user.id)
                .then((res) => res.json())
                .then((data) => setMentor(data));
        }
    }, [user]);

    const handleAccept = (id: string) => {
        if (messages && user) {
            fetchApi(
                "/request/accept",
                "POST",
                JSON.stringify({
                    mentorId: user.id,
                    menteeId: id,
                })
            ).then(() => window.location.reload());
        }
    };

    const handleReject = (id: string) => {
        if (messages && user) {
            fetchApi(
                "/request/refuse",
                "DELETE",
                JSON.stringify({
                    mentorId: user.id,
                    menteeId: id,
                })
            ).then(() => window.location.reload());
        }
    };

    return (
        <HeaderFooterLayout>
            {user ? (
                <>
                    <Typography
                        variant="h6"
                        sx={{
                            marginY: "20px",
                        }}
                    >
                        Welcome back, {user.first_name}! Belows are your latest
                        news for your interests
                    </Typography>
                    <News />
                    {user.type === "Mentee" && <MentorList />}
                    {messages?.map((message) => {
                        return (
                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {message.first_name} {message.last_name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {message.match_message}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        onClick={() => handleAccept(message.id)}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() => handleReject(message.id)}
                                    >
                                        Reject
                                    </Button>
                                </CardActions>
                            </Card>
                        );
                    })}
                    <Box sx={{ margin: "auto", marginTop:"20px" }}>
                        {user.type === "Mentor" ? (
                            <>
                                <Typography variant="h6" >
                                    Matched Mentees
                                </Typography>
                                <PeopleList people={mentee} />
                            </>
                        ) : (
                            <>
                                <Typography variant="h6">
                                    Matched Mentors
                                </Typography>
                                <PeopleList people={mentor} />
                            </>
                        )}
                    </Box>
                </>
            ) : (
                <Box>
                    <CTA />
                </Box>
            )}
        </HeaderFooterLayout>
    );
};
