import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLogin, fetchUser, dispatchGetUser } from "./redux/actions/authAction";
import { dispatchGetOrganization, fetchOrganization } from "./redux/actions/organizationAction";

import Body from "./components/body/Body";
import axios from "axios";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

function DefaultLayout() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);
    const [callback, setCallback] = useState(false);

    //change state to isLogged
    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin) {
            const getToken = async () => {
                const res = await axios.post("/user/refresh_token", null);
                // console.log(res.data);
                dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
            };
            getToken();
        }
    }, [auth.isLogged, dispatch]);

    //DISPATCH USER INFORMATION
    useEffect(() => {
        if (token) {
            const getUser = () => {
                dispatch(dispatchLogin());
                return fetchUser(token).then((res) => {
                    dispatch(dispatchGetUser(res));
                });
            };
            getUser();
        }
    }, [token, dispatch, callback]);

    //DISPATCH ORGANIZATION
    useEffect(() => {
        if (token) {
            const getOrganization = () => {
                return fetchOrganization(token).then((res) => {
                    dispatch(dispatchGetOrganization(res));
                });
            };
            getOrganization();
        }
    }, [token, dispatch, callback]);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Body />
            </ThemeProvider>
        </Router>
    );
}

export default DefaultLayout;
