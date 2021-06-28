import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isEmpty, isLength, isValidDescription, isValidString, isValidDateTime } from "../../utils/validation/Validation";
import { fetchAllEventsByUserId, dispatchGetAllUserEvents } from "../../../redux/actions/eventAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Card, CardContent } from "@material-ui/core";
import CFcard from "../../components/CFcard";

function AllEvents() {
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const events = useSelector((state) => state.eventReducer.events);

    const [avatar, setAvatar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(false);

    const dispatch = useDispatch();
    events.map((i) => {
        // console.log(events[i]);
        console.log(i);
    });
    //retrieve logged in user information
    useEffect(() => {
        fetchAllEventsByUserId(token).then((res) => {
            dispatch(dispatchGetAllUserEvents(res));
        });
    }, [token, dispatch, callback]);

    // console.log(events); // ABLE TO ACCESS TO ALL EVENTS DATA
    // console.log(events[0]);
    return (
        <Container>
            <CFcard>
                <Typography variant="h2" align="center">
                    All User's Events
                </Typography>
                <Typography>Loop Evnets Here</Typography>
                {events.map((event) => (
                    <div>{event.ename}</div> // yes
                ))}
            </CFcard>
        </Container>
    );
}

export default AllEvents;
