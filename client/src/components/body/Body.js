import React from "react";
import { Switch, Route } from "react-router-dom";

import NotFound from "../utils/NotFound/NotFound";

//COMPONENTS IMPORT
import Header from "../header/Header";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

//USER IMPORTS
import Login from "./auth/Login";
import Register from "./auth/Register";
import ActivationEmail from "./auth/ActivationEmail";
import Profile from "../body/profile/Profile";
import EditUser from "../body/profile/EditUser";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
//ORGANIZATION IMPROTS
import CreateOrg from "../body/organization/CreateOrg";
import ViewOrg from "./organization/ViewOrg";

//EVENT IMPORTS
import AddEvent from "./event/AddEvent";

const useStyles = makeStyles((theme) => ({
    //default layout for body
    layout: {
        minHeight: "800px",
        // maxWidth: "1200px",
        margin: "4em auto",
        // backgroundColor: "#f6f6f6",
    },
}));

function Body() {
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const { isLogged, isAdmin } = auth;
    return (
        <div className={classes.layout}>
            <Header />
            <Switch>
                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />
                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPassword} exact />
                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />
                {/* ORGANIZATION ROUTES */}
                <Route path="/organization/new" component={isLogged ? CreateOrg : NotFound} exact />
                <Route path="/organization/overview" component={isLogged ? ViewOrg : NotFound} exact />

                {/* EVENT ROUTES */}
                <Route path="/event/add_event" component={isLogged ? AddEvent : NotFound} exact />
            </Switch>
        </div>
    );
}

export default Body;

//commit this
