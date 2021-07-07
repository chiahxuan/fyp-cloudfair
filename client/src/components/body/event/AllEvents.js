import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllEvents, dispatchGetAllEvents } from "../../../redux/actions/eventAction";

import { Typography, Button, Container, Grid } from "@material-ui/core";
import CFcard from "../../components/CFcard";
import EventCard from "../../components/eventCard";
import SearchField from "react-search-field";

function AllEvents() {
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const events = useSelector((state) => state.eventReducer.events);
    const [callback, setCallback] = useState(false);
    const dispatch = useDispatch();
    const [Events, setEvents] = React.useState([]);

    // useEffect(() => {
    //     setEvents(events);
    // }, [events]);
    //fetchAllEvents dispatchGetAllEvents
    useEffect(() => {
        fetchAllEvents(token).then((res) => {
            dispatch(dispatchGetAllEvents(res));
        });
    }, [token, dispatch, callback]);

    //SEARCH EVENTS
    const onChange = (search) => {
        setEvents(
            events.filter((event) => {
                var validate = event.ename.toLowerCase().includes(search.toLowerCase());
                if (validate == true) {
                    return <EventCard event={event} />;
                }
            })
        );
    };

    return (
        <Container>
            <CFcard>
                <Typography variant="h2" align="center">
                    Hi {auth.user.name}, here are all events from CloudFair
                </Typography>
                <br />
                <br />
                <Grid container spacing={8}>
                    <Grid item xs={10}>
                        <SearchField placeholder="Search..." onChange={onChange} searchText="" />
                    </Grid>
                    <Grid item xs={2}>
                        <Button component={Link} to="/event/add_event">
                            Add Event
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={8}>
                    {/* {events.map((event) => (
                        <Grid item key={event.id}>
                            <EventCard event={event} />
                        </Grid>
                    ))} */}
                    {events.map((event) => (
                        <Grid item key={event._id}>
                            <EventCard event={event} />
                        </Grid>
                    ))}
                </Grid>
            </CFcard>
        </Container>
    );
}

export default AllEvents;
