import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isEmpty, isLength, isValidDescription, isValidString, isValidDateTime } from "../../utils/validation/Validation";
import { fetchAllEvents, dispatchGetAllEvents } from "../../../redux/actions/eventAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Card, CardContent, Grid } from "@material-ui/core";
import CFcard from "../../components/CFcard";
import EventCard from "../../components/eventCard";

function AllEvents() {
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const events = useSelector((state) => state.eventReducer.events);
    const [callback, setCallback] = useState(false);
    const dispatch = useDispatch();

    //fetchAllEvents dispatchGetAllEvents
    useEffect(() => {
        fetchAllEvents(token).then((res) => {
            dispatch(dispatchGetAllEvents(res));
        });
    }, [token, dispatch, callback]);

    return (
        <Container>
            <CFcard>
                <Typography variant="h2" align="center">
                    Hi {auth.user.name}, here are all events from CloudFair
                </Typography>
                <br />
                <br />
                <Grid container spacing={8}>
                    <Grid item xs={10}></Grid>
                    <Grid item xs={2}>
                        <Button component={Link} to="/event/add_event">
                            Add Event
                        </Button>
                    </Grid>
                </Grid>
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

export default AllEvents;
