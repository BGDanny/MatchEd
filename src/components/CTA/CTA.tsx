import { Box, Button, Container, Typography } from "@mui/material"
import illustration from "./casual-life-3d-side-view-of-man-sitting-in-front-of-laptop-and-talking-on-phone.png"

export const CTA: React.FC = () => {
    return (
        <Container
            sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: { xs: '2xl', sm: '4xl', md: '6xl' },
                spacing: { "xs": 8, "md": 14 },
                maxWidth: '200px',
                margin: "auto"
            }}
        >
            <Typography variant="h2">
                Connect with your
                <Typography variant="h2" color="#0ea175">
                    mentor
                </Typography>
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: "40px", margin: "auto", maxWidth: "700px" }}>
                Connect your mentor made easy by using MatchED. Give back to your community
                while learning the most yourself, MatchED is the platform allowing you to
                connect mentors and mentees
            </Typography>

            <Button variant="contained" sx={{ marginTop: "20px" }} href="/login">
                Get Started
            </Button>

            <Box>
                <Box
                    component="img"
                    alt="Logo"
                    src={illustration}
                    sx={{
                        marginTop: "20px"
                    }}
                />
            </Box>

        </Container>
    )
}