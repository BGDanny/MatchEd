import { Box, Button, Chip } from "@mui/material";
import { HeaderFooterLayout } from "../../layouts/HeaderFooterLayout/HeaderFooterLayout"
import { faker } from '@faker-js/faker';
import { Typography } from '@mui/material';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Carousel from 'react-material-ui-carousel'

export const MentorComponent: React.FC = () => {
    return (
        <Card sx={{ width: 500 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={faker.image.avatar()}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {faker.name.fullName()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {faker.lorem.paragraph()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export const MentorList: React.FC = () => {
    return <HeaderFooterLayout>
        <Carousel navButtonsAlwaysVisible>
            <MentorComponent />
            <MentorComponent />
            <MentorComponent />
            <MentorComponent />
            <MentorComponent />
            <MentorComponent />
        </Carousel>
    </HeaderFooterLayout>
}

