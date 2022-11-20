import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { User } from "./model";
import { AuthContext } from "./Context/AuthProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SignIn from "./pages/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App: React.FC = () => {
    const [user, setUser] = React.useState<User | undefined>(undefined);

    return (
        <ThemeProvider theme={createTheme()}>
            <AuthContext.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} index />
                        <Route path="/login" element={<SignIn />} />
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
        </ThemeProvider>
    );
};

export default App;
