import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isEmpty, isValidDescription, isValidString, isInvalidDateTime } from "../../utils/validation/Validation";
import { dispatchGetOrganization, fetchOrganization } from "../../../redux/actions/organizationAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField } from "@material-ui/core";
import CFcard from "../../components/CFcard";
var slugify = require("slug");

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
}));

const initialState = {
    eventName: "",
    eventSlug: "",
    description: "",
    startDate: "",
    endDate: "",
    organizationId: "",
    userId: "",
    err: "",
    success: "",
};

function AddEvent() {
    const classes = useStyles();
    // const history = useHistory();
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const [event, setEvent] = useState(initialState);
    const { eventName, eventSlug, description, startDate, endDate, err, success } = event;
    const [date, setDate] = useState(initialState);

    const { user } = auth; // to get user ID
    const organizationData = useSelector((state) => state.organization.organization); // to get user ID
    const dispatch = useDispatch();
    const hasOrganization = useSelector((state) => state.organization.hasOrganization);

    //Dispatch organization
    useEffect(() => {
        if (token) {
            const getOrganization = () => {
                return fetchOrganization(token).then((res) => {
                    dispatch(dispatchGetOrganization(res));
                });
            };
            getOrganization();
        }
    }, [token, dispatch]);

    // test data retrieve
    // console.log("user data here : " + auth.user._id);
    // console.log("organization here: " + organizationData._id);

    //HANDLE THEN STATE OF THE INPUT
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value, err: "", success });
        setDate({ startDate: startDate, endDate: endDate });
        // setDate({ endDate: startDate });
        // console.log("description " + description);
        // console.log(event);
    };

    //SUBMIT FORM
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEmpty(eventName) || isEmpty(description) || isEmpty(eventSlug) || isEmpty(startDate) || isEmpty(endDate))
            return setEvent({ ...event, err: "Please fill in all fields.", success: "" });

        //isValidDescription, isValidString
        if (isValidString(eventName) || isValidString(eventSlug)) return setEvent({ ...event, err: "String input must be at least 3 to 50 characters.", success: "" });
        if (isValidDescription(description)) return setEvent({ ...event, err: "String input must be at least 3 to 2000 characters.", success: "" });

        //validate date to ensure start date before end date
        if (isInvalidDateTime(startDate, endDate))
            return setEvent({ ...event, err: "Date condition wrong, End datetime be after start datetime. Start date must not before current time.", success: "" });
        try {
            // //CHECK DATA STATE CHANGES
            // console.log("description " + description);
            // console.log("eventName " + eventName);
            // console.log("eventSlug " + eventSlug);
            // console.log("startDate " + startDate);
            // console.log("endDate " + endDate);

            const res = await axios.post("/event/add_event", {
                ename: eventName,
                eslug: slugify(eventSlug + "-" + Math.random().toString(36).substring(7)),
                description: description,
                startDate: startDate,
                endDate: endDate,
                userId: user._id,
                organizationId: organizationData._id,
            });
            // setEvent({ ...event, err: "", success: "pass val" });
            setEvent({ ...event, err: "", success: res.data.msg });
            // history.push("/event");
            // console.log("success");
            window.location.href = `http://localhost:3000/event/all_events`;
        } catch (err) {
            err.response.data.msg && setEvent({ ...user, err: err.response.data.msg, success: "" });
        }
    };

    return (
        <Container maxWidth="sm">
            <CFcard>
                <Typography align="center" variant="h1">
                    Create and Event
                </Typography>

                <Typography align="center">
                    or back to <Link to="/event/all_events">Events</Link>{" "}
                </Typography>
                <br />
                <br />
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <br />
                <br />
                {hasOrganization == true ? (
                    <section>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                name="eventName"
                                id="eventName"
                                margin="dense"
                                label="Event Name"
                                placeholder="Event Name"
                                defaultValue={eventName}
                                onChange={handleChangeInput}
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <TextField
                                id="eventSlug"
                                name="eventSlug"
                                margin="dense"
                                label="Event Url Slug"
                                placeholder="Event Url Slug"
                                defaultValue={eventSlug}
                                onChange={handleChangeInput}
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <br />
                            <br />
                            <TextField
                                id="description"
                                name="description"
                                margin="dense"
                                label="Event Description"
                                placeholder="Event Description"
                                defaultValue={description}
                                onChange={handleChangeInput}
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                multiline
                                rows={8}
                                rowsMax={10}
                            />
                            <br />
                            <br />
                            <TextField
                                id="startDate"
                                name="startDate"
                                label="Start Date"
                                type="datetime-local"
                                defaultValue={startDate}
                                onChange={handleChangeInput}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                fullWidth
                            />
                            <br />
                            <br />
                            <TextField
                                id="endDate"
                                name="endDate"
                                label="End Date"
                                type="datetime-local"
                                defaultValue={endDate}
                                onChange={handleChangeInput}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                fullWidth
                            />
                        </form>
                        <br />
                        <Button type="submit" variant="contained" onClick={handleSubmit}>
                            Create
                        </Button>
                    </section>
                ) : (
                    <>
                        <Typography>Hi {auth.user.name}, you are only one step away from being an event host! First create your organization!</Typography>
                        <br />
                        <br />
                        <Button component={Link} to="/organization/new">
                            Create Organization
                        </Button>
                    </>
                )}
            </CFcard>
        </Container>
    );
}

export default AddEvent;
