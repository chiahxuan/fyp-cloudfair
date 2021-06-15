import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../utils/NotFound/NotFound";

import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    //default layout for body
    layout: {
        // minHeight: "800px",
        // maxWidth: "1200px",
        // margin: "20px auto",
        backgroundColor: "#f6f6f6",
    },
}));

function Body() {
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const { isLogged } = auth;
    return (
        <div className={classes.layout}>
            <Switch>
                <h1>3.28.01</h1>
                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Login} exact />
                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
            </Switch>
        </div>
    );
}

export default Body;

//commit this
