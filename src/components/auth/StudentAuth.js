import { useReactiveVar } from "@apollo/client";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { isLoggedInVar } from "../../store/cache";

import React from 'react'

const StudentAuth = () => {
    let location = useLocation();

    const isLoggedIn = useReactiveVar(isLoggedInVar);

    if (!isLoggedIn) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.

        // state={{ from: location }}

        return <Navigate to="/" state={{ from: location }} replace />
    }

    return <Outlet />;
}

export default StudentAuth
