import { Box, Button, Chip } from "@mui/material";
import { HeaderFooterLayout } from "../../layouts/HeaderFooterLayout/HeaderFooterLayout"
import { faker } from '@faker-js/faker';
import { Typography } from '@mui/material';

export const MentorComponent: React.FC = () => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            maxWidth: "60%",
            borderRadius: "15px",
            border: "2px solid #73AD21"
        }}>
            <Box
                component="img"
                sx={{
                    height: 200,
                }}
                alt="Profile"
                src={faker.image.avatar()}
            />
            <Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "20px"
                }}>
                    <Typography sx={{ marginTop: "10px" }}><strong>{faker.name.fullName()}</strong></Typography>
                    <Chip sx={{ marginTop: "10px" }} label="Computer Science" variant="outlined" />
                </Box>
                <Typography>{faker.lorem.paragraph()}</Typography>
                <Button variant="outlined">Match</Button>
            </Box>
        </Box>
    )

}
export const MentorList: React.FC = () => {
    return <HeaderFooterLayout>
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            margin: "auto",
            gap: "20px"
        }}>
            <MentorComponent />
            <MentorComponent />
            <MentorComponent />
            <MentorComponent />
            <MentorComponent />
            <MentorComponent />
        </Box>
    </HeaderFooterLayout>
}