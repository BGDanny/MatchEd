import { Box, Button, Typography } from "@mui/material"
import illustration from "./casual-life-3d-side-view-of-man-sitting-in-front-of-laptop-and-talking-on-phone.png"

export const CTA: React.FC = () => {
    return (
        <Box
            fontWeight="fontWeightMedium"
            sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: { xs: '2xl', sm: '4xl', md: '6xl' },
                spacing: { "xs": 8, "md": 14 },
                maxWidth: '800px',
                margin: "auto"
            }}
        >
            <Typography variant="h2">
                Connect with your
                <Typography variant="h2" color="#0ea175">
                    mentor
                </Typography>
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "20px" }}>
                Connect your mentor made easy by using MatchED. Give back to your community
                while learning the most yourself, MatchED is the platform allowing you to
                connect mentors and mentees
            </Typography>

            <Box sx={{
                flexDirection: "row"
            }}>
                <Button variant="contained" sx={{ marginTop: "20px" }} href="/login">
                    Get Started
                </Button>
                <Box
                    component="img"
                    alt="Logo"
                    src={illustration}
                    sx={{
                        marginTop: "5px"
                    }}
                />
            </Box>
        </Box>
    )
}