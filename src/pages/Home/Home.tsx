import React from "react";
import { useAuth } from "../../Context/AuthProvider";
import { HeaderFooterLayout } from "../../layouts/HeaderFooterLayout/HeaderFooterLayout";
import { useLocation } from "react-router-dom";
import { News } from "../../components/News";

export const Home: React.FC = () => {
    const { user, setUser } = useAuth();
    const { state } = useLocation();

    React.useEffect(() => {
        if (state) {
            setUser(state);
        }
    }, [state, setUser]);

    return (
        <HeaderFooterLayout>
            {user ? (
                <>
                    <h1>Welcome to MatchEd, {user.first_name}</h1>
                    <News />
                </>
            ) : (
                <h1>
                    Welcome to MatchEd. Please sign up or login to access all
                    the features
                </h1>
            )}
        </HeaderFooterLayout>
    );
};
