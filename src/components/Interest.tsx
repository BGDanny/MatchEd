import React from "react";
import {
    Card,
    CardMedia,
    Typography,
    Button,
    CardActions,
    CardContent,
    AccordionDetails,
    AccordionSummary,
    Accordion,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export const Interest: React.FC<{ name: string }> = ({ name }) => {
    const [articles, setArticles] = React.useState<any[]>([]);

    React.useEffect(() => {
        fetch(
            `https://newsapi.org/v2/everything?q=${name}&sortBy=popularity&apiKey=72a551cf0da246c7abde552db5f33b85`
        )
            .then((res) => res.json())
            .then((data) => setArticles(data.articles.slice(0, 5)));
    }, [name]);

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ display: "flex",flexWrap:"wrap",gap: 5, justifyContent:"center" }}>
                {articles.map((article, index) => (
                    <Card sx={{ width: "30%" }} key={index}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={article.urlToImage}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {article.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {article.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                onClick={() => window.open(article.url)}
                            >
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};
