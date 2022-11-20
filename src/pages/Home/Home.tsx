import {useAuth} from "../../Context/AuthProvider";
import {HeaderFooterLayout} from "../../layouts/HeaderFooterLayout/HeaderFooterLayout";
import {useLocation} from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {fetchApi} from "../../api";
import {News} from "../../components/News";
import {Box, Typography} from "@mui/material";
import CTA from "../../components/CTA";

export const Home: React.FC = () => {
    const {user, setUser} = useAuth();
    const {state} = useLocation();
    const [messages, setMessages] = React.useState<any[]>();
    React.useEffect(() => {
        if (state) {
            setUser(state);
        }
    }, [state, setUser]);
    React.useEffect(() => {
        if (user) {
            fetchApi("/hello?id=" + user.id).then((res) => res.json()).then(data => setMessages(data))
        }
    }, [user])

    const handleAccept = (id: string) => {
        if (messages && user) {
            fetchApi(
                "/request/accept",
                "POST",
                JSON.stringify({
                    mentorId: user.id,
                    menteeId: id,
                })
            ).then(window.location.reload)
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
            ).then(window.location.reload)
        }
    };

    return (
        <HeaderFooterLayout>
            {user ? (
                <>
                    <Typography variant="subtitle1">
                        Welcome to MatchEd, {user.first_name}
                    </Typography>
                    <News/>
                </>
            ) : (
                <Box>
                    <CTA/>
                </Box>
            )}

            <>
                {messages?.map((message, index) => {
                    return <Card sx={{maxWidth: 345}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {message.first_name} {message.last_name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {message.match_message}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleAccept(message.id)}>Accept</Button>
                            <Button size="small" onClick={() => handleReject(message.id)}>Reject</Button>
                        </CardActions>
                    </Card>

                })}
            </>

        </HeaderFooterLayout>
    );
};
