import { Box, Button } from "@mui/material"
import logo from './Logo.png';

export const NavBar: React.FC = () => {
    return (<Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        mx: {
            xs: "20px",
            md: "50px"
        }
    }}>
        <Box
            component="img"
            sx={{
                height: 50,
            }}
            alt="Logo"
            src={logo}
        />
        <Box sx={{
            display: "flex"
        }}>
            <Button variant="outlined">Log In</Button>
            <Button variant="outlined">Sign up</Button>
        </Box>
    </Box>)
}