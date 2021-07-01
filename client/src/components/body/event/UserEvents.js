import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isEmpty, isLength, isValidDescription, isValidString, isValidDateTime } from "../../utils/validation/Validation";
import { fetchAllEventsByUserId, dispatchGetAllUserEvents } from "../../../redux/actions/eventAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Card, CardContent, Grid } from "@material-ui/core";
import CFcard from "../../components/CFcard";
import EventCard from "../../components/eventCard";

function UserEvents() {
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const events = useSelector((state) => state.eventReducer.events);
    const [callback, setCallback] = useState(false);

    // const [avatar, setAvatar] = useState(false);
    // const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    // events.map((i) => {
    //     // console.log(events[i]);
    //     console.log(i);
    // });
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
                    Hi {auth.user.name}, here are your events
                </Typography>
                <br />
                <br />
                <Grid container spacing={8}>
                    {events.map((event) => (
                        <Grid item>
                            {/* <div>{event.ename}</div>
                            <div>{event.description}</div>
                            <div>{event.startDate}</div>
                            <div>{event.endDate}</div>
                            <div>{event.organization}</div>
                            <br /> */}
                            {/* <img src={event.eBackground}></img> */}

                            {/** test event card here*/}
                            <EventCard event={event} />
                        </Grid>
                    ))}
                </Grid>
            </CFcard>
        </Container>
    );
}

export default UserEvents;
