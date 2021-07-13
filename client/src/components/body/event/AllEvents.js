import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllEvents, dispatchGetAllEvents } from "../../../redux/actions/eventAction";

import { Typography, Button, Container, Grid, Box } from "@material-ui/core";
import CFcard from "../../components/CFcard";
import EventCard from "../../components/eventCard";
import SearchField from "react-search-field";

function AllEvents() {
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const events = useSelector((state) => state.eventReducer.events);
    const [callback] = useState(false);
    const dispatch = useDispatch();
    const [Events, setEvents] = React.useState([]);

    useEffect(() => {
        setEvents(events);
    }, [events]);

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
    // const imgLink = "https://material-ui.com/static/images/cards/contemplative-reptile.jpg";
    // ("https://res.cloudinary.com/cloudfair/image/upload/v1625756739/avatar/colleagues-preparing-corporate-party-time-management-deadline-brand-event-event-brand-management-sponsored-event-organization-concept_335657-120_j56m8s.jpg");
    // const imgLink = "/images/event.jpg";

    return (
        <Container>
            <CFcard>
                <Grid container spacing={10} style={{ padding: "0 50px" /*backgroundColor: "#f1f2f5"*/ }}>
                    <Grid item xs={12}>
                        <Typography variant="h1" align="center">
                            All Events
                        </Typography>
                        <br />
                    </Grid>

                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="h2">Welcome to CloudFair {auth.user.name}!</Typography>
                            <br />
                            <Typography variant="h2">Go ahead and explore out events:</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <img
                            scr="https://res.cloudinary.com/cloudfair/image/upload/v1625756739/avatar/colleagues-preparing-corporate-party-time-management-deadline-brand-event-event-brand-management-sponsored-event-organization-concept_335657-120_j56m8s.jpg"
                            style={{ width: "100%" }}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <SearchField placeholder="Search..." onChange={onChange} searchText="" style={{ height: 400, marginLeft: "auto", marginRight: "auto" }} />
                    </Grid>
                    <Grid item xs={2}>
                        <Button component={Link} to="/event/add_event">
                            Add Event
                        </Button>
                    </Grid>
                </Grid>
                <br />
                <hr />
                <br />
                <Grid container spacing={8}></Grid>
                <Grid container spacing={8}>
                    {Events.map((event) => (
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
