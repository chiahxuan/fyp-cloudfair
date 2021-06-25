import { BrowserRouter as Router } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLogin, fetchUser, dispatchGetUser } from "./redux/actions/authAction";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Body from "./components/body/Body";
import axios from "axios";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

function DefaultLayout() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);

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

    //dispatch
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
    }, [token, dispatch]);
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Body />
            </ThemeProvider>
            {/* <div className="App"></div> */}
        </Router>
    );
}

export default DefaultLayout;
