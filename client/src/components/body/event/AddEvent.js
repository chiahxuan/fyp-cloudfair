import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isEmpty, isLength, isValidDescription, isValidString, isValidDateTime } from "../../utils/validation/Validation";
import { dispatchGetOrganization, fetchOrganization } from "../../../redux/actions/organizationAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Card, CardContent } from "@material-ui/core";
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
    const { eventName, eventSlug, description, startDate, endDate, organizationId, userId, err, success } = event;
    const [date, setDate] = useState(initialState);

    const { user } = auth; // to get user ID
    const organizationData = useSelector((state) => state.organization.organization); // to get user ID
    const dispatch = useDispatch();

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
        setDate({ endDate: startDate });
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
        if (isValidDateTime(startDate, endDate)) return setEvent({ ...event, err: "End datetime be after start datetime.", success: "" });
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
                    or back to <Link to="/events">Events</Link>{" "}
                </Typography>
                <br />
                <br />
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <br />
                <br />
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
                        rows={3}
                        rowsMax={4}
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
            </CFcard>
        </Container>
    );
}

export default AddEvent;
