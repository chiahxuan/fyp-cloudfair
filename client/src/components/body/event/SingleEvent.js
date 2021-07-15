import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleEvent, dispatchGetSingleEvent } from "../../../redux/actions/eventAction";
import { fetchBooth, dispatchEventBooths } from "../../../redux/actions/boothAction";
// import { getSingleEventParam, dispatchSetEventParam } from "../../../redux/actions/eventAction";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Grid, Tabs, Tab, Box } from "@material-ui/core";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AddBoxIcon from "@material-ui/icons/AddBox";
import StorefrontIcon from "@material-ui/icons/Storefront";
import EditIcon from "@material-ui/icons/Edit";
import CFcard from "../../components/CFcard";

// import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
    },
    bgImage: {
        align: "center",
        height: 400,
        marginLeft: "auto",
        marginRight: "auto",
    },
    tab: {
        flexGrow: 1,
        maxWidth: 500,
    },
}));

function SingleEvent() {
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const event = useSelector((state) => state.eventReducer.event);
    const checkEventHost = useSelector((state) => state.eventReducer.isEventHost);
    const hasOrganization = useSelector((state) => state.organization.hasOrganization);

    const hasOwnedBooth = useSelector((state) => state.boothReducer.hasOwnedBooth);
    const booth = useSelector((state) => state.boothReducer.booth);

    const dispatch = useDispatch();

    // const [singleEvent, setSingleEvent] = useState([]);
    const [bgImage] = useState(false);

    const [callback] = useState(false);

    const { eslug } = useParams();

    useEffect(() => {
        fetchSingleEvent(eslug, token).then((res) => {
            dispatch(dispatchGetSingleEvent(res, auth.user._id));
        });
    }, [token, dispatch, callback]);

    //RECOGNIZE USER STATUS FOR BOOTHS
    useEffect(() => {
        fetchBooth(token, eslug).then((res) => {
            dispatch(dispatchEventBooths(res, auth.user._id));
        });
    }, [token, dispatch, callback]);

    //HANDLE TAB CHANGES
    const [value, setValue] = React.useState(0);
    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <CFcard>
                <Box align="center" mb={8}>
                    <Tabs value={value} onChange={handleTabsChange} variant="fullWidth" indicatorColor="secondary" textColor="secondary" aria-label="icon label tabs example">
                        <Tab icon={<PersonPinIcon />} label="Reception" />
                        <Tab icon={<StorefrontIcon />} label="Expo" component={Link} to={`/event/${eslug}/booth/all`} />
                        {checkEventHost === true ? <Tab icon={<EditIcon />} label="Edit Event" component={Link} to={`/event/${eslug}/edit_event`} /> : ""}
                        {(hasOrganization === true && hasOwnedBooth === false) || checkEventHost === true ? (
                            <Tab icon={<AddBoxIcon />} label="Add Booth" component={Link} to={`/event/${event.eslug}/booth/add_booth`} />
                        ) : (
                            ""
                        )}
                        {hasOrganization === true && hasOwnedBooth === true && checkEventHost === false ? (
                            <Tab icon={<EditIcon />} label="Edit Booth" component={Link} to={`/event/${eslug}/booth/${booth.bslug}/edit_booth`} />
                        ) : (
                            ""
                        )}
                    </Tabs>
                </Box>
                {/** VIEW EVENT  */}
                <section>
                    {/**create Event Container here*/}
                    <Grid container spacing={8}>
                        <Grid item xs={12} align="center">
                            <Typography align="center" variant="h1">
                                {event.ename}
                            </Typography>
                            <Typography align="center" variant="h1">
                                {/* validate Time: {now} */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <img
                                alt=""
                                className={classes.bgImage}
                                src={bgImage ? bgImage : event.eBackground || "https://material-ui.com/static/images/cards/contemplative-reptile.jpg"}
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Start Date: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography>{dayjs(event.startDate).format("YYYY MMMM DD, hh:mm A")} </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">End Date: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography>{dayjs(event.endDate).format("YYYY MMMM DD, hh:mm A")} </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Event Description: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography> {event.description}</Typography>
                        </Grid>
                    </Grid>
                </section>
                <br />
                <br />
            </CFcard>
        </Container>
    );
}

export default SingleEvent;
