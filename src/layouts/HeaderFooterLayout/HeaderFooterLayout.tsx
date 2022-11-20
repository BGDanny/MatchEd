import { Box } from "@mui/material"
import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"

type Props = {
    children?: React.ReactNode;
}

export const HeaderFooterLayout: React.FunctionComponent<Props> = (props) => {

    return (
        <Box>
            <NavBar />
            <Box>
                {props.children}
            </Box>
            <Footer />
        </Box>
    )
}