import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../hooks/auth";
import AppRoutes from "./app.routes";
import AuthRoute from "./auth.route";

function Routes() {

const {usuario} = useAuth();

    return (
        <NavigationContainer>
            {
                usuario ? <AppRoutes/> : <AuthRoute/>
            }
        </NavigationContainer>
    );
}

export default Routes;