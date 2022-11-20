import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { MainPage } from "./components";
import { User } from "./model";
import { AuthContext } from "./Context/AuthProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const App: React.FC = () => {
    const [user, setUser] = React.useState<User | undefined>(undefined);

    return (
        <ThemeProvider theme={createTheme()}>
            <AuthContext.Provider value={{ user, setUser }}>
                <MainPage />
            </AuthContext.Provider>
        </ThemeProvider>
    );
};

export default App;
