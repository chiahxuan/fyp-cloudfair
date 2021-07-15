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
//ORGANIZATION IMPORTS
import CreateOrg from "./organization/createOrg";
import ViewOrg from "./organization/viewOrg";
import EditOrg from "./organization/EditOrg";

//EVENT IMPORTS
import AddEvent from "./event/AddEvent";
import UserEvents from "./event/UserEvents";
import AllEvents from "./event/AllEvents";
import SingleEvent from "./event/SingleEvent";
import EditEvent from "./event/EditEvent";

//BOOTH IMPORTS
import AddBooth from "./booth/AddBooth";
import AllBooth from "./booth/AllBooth";
import SingleBooth from "./booth/SingleBooth";
import EditBooth from "./booth/EditBooth";
import StreamingRoom from "./booth/StreamingRoom";
import testBooth from "./booth/testBooth";

const useStyles = makeStyles((theme) => ({
    //default layout for body
    layout: {
        // maxWidth: "1200px",
        margin: "4em auto 0 auto",
        height: "100%",
        minHeight: 1500,
        // backgroundColor: "linear-gradient(#1359da, #142e4e)",
        // backgroundColor: "linear-gradient(to right, #1359da, #142e4e)",
        // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        background: "linear-gradient(45deg, #fff 30%, #a0d3f4 90%)",
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
                <Route path="/" component={isLogged ? UserEvents : Login} exact />
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
                <Route path="/organization/edit_organization" component={isLogged ? EditOrg : NotFound} exact />

                {/* EVENT ROUTES */}
                <Route path="/event/add_event" component={isLogged ? AddEvent : NotFound} exact />
                <Route path="/event/:eslug/edit_event" component={isLogged ? EditEvent : NotFound} exact />
                <Route path="/event/all_events" component={isLogged ? AllEvents : NotFound} exact />
                <Route path="/event/user_events" component={isLogged ? UserEvents : NotFound} exact />
                <Route path="/event/:eslug" component={isLogged ? SingleEvent : NotFound} exact />

                {/* BOOTH ROUTES */}
                <Route path="/event/:eslug/booth/add_booth" component={isLogged ? AddBooth : NotFound} exact />
                <Route path="/event/:eslug/booth/all" component={isLogged ? AllBooth : NotFound} exact />
                <Route path="/event/:eslug/booth/:bslug" component={isLogged ? SingleBooth : NotFound} exact />
                <Route path="/event/:eslug/booth/:bslug/edit_booth" component={isLogged ? EditBooth : NotFound} exact />
                <Route path="/event/:eslug/booth/:bslug/streaming_room/:room" component={isLogged ? StreamingRoom : NotFound} exact />
                <Route path="/event/:eslug/booth/:bslug/testBooth" component={isLogged ? testBooth : NotFound} exact />
            </Switch>
        </div>
    );
}

export default Body;

//commit this
