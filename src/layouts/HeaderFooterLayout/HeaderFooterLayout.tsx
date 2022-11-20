import { Box } from "@mui/material"
import NavBar from "../../components/NavBar"

type Props = {
    children?: React.ReactNode;
}

export const HeaderFooterLayout: React.FunctionComponent<Props> = (props) => {

    return (
        <Box >
            <NavBar />
            <Box sx={{marginX:"80px"}}>
                {props.children}
            </Box>
        </Box>
    )
}