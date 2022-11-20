import { Box, Button, Typography } from "@mui/material"

export const CTA: React.FC = () => {
    return (<Box
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
            Monetize your content by charging your most loyal readers and reward
            them loyalty points. Give back to your loyal readers by granting
            them access to your pre-releases and sneak-peaks.
        </Typography>

        <Button variant="contained" sx={{ marginTop: "20px" }} href="/login">
            Get Started
        </Button>
    </Box>)
}