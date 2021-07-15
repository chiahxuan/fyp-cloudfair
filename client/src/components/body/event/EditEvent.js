import React, { useState } from "react";

import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isValidDescription, isValidString, isInvalidDateTime } from "../../utils/validation/Validation";
// import { getSingleEventParam, dispatchSetEventParam } from "../../../redux/actions/eventAction";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Grid, Tabs, Tab, Box } from "@material-ui/core";

//ICONS IMPORT
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AddBoxIcon from "@material-ui/icons/AddBox";
import StorefrontIcon from "@material-ui/icons/Storefront";
import EditIcon from "@material-ui/icons/Edit";

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
    button: {
        marginLeft: 32,
    },
}));

const initialState = {
    eventName: "",
    description: "",
    startDate: "",
    endDate: "",
    eBgImage: "",
    err: "",
    success: "",
};

//dispatchSingleEvent

function EditEvent() {
    const classes = useStyles();
    const { eslug } = useParams();

    const token = useSelector((state) => state.token);
    const event = useSelector((state) => state.eventReducer.event);

    const booth = useSelector((state) => state.boothReducer.booth);
    const checkEventHost = useSelector((state) => state.eventReducer.isEventHost);
    const hasOrganization = useSelector((state) => state.organization.hasOrganization);
    const hasOwnedBooth = useSelector((state) => state.boothReducer.hasOwnedBooth);

    const [data, setData] = useState(initialState);
    const { eventName, description, startDate, endDate, eBgImage, err, success } = data;
    const [date, setDate] = useState(initialState);

    const [loading, setLoading] = useState(false);
    const [bgImage, setBgImage] = useState(false); // background Image
    const [callback, setCallback] = useState(false);

    //GET CURRENT DATE TIME

    //HANDLE TAB CHANGES
    const [value, setValue] = React.useState(2);
    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
        setDate({ startDate: startDate, endDate: endDate });
    };

    //refer profile.js
    const changeBgImage = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            if (!file) return setData({ ...data, err: "No files were uploaded.", success: "" });
            if (file.size > 1024 * 1024) return setData({ ...data, err: "Size too large.", success: "" });
            if (file.type !== "image/jpeg" && file.type !== "image/png") return setData({ ...data, err: "File format is incorrect.", success: "" });
            let formData = new FormData();
            formData.append("file", file);
            setLoading(true);
            const res = await axios.post("/api/upload_avatar", formData, {
                headers: { "content-type": "multipart/form-data", Authorization: token },
            });

            setLoading(false);
            setBgImage(res.data.url);
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    const updateEventInfo = () => {
        // if (isEmpty(eventName) || isEmpty(description) || isEmpty(startDate) || isEmpty(endDate)) return setData({ ...event, err: "Please fill in all fields.", success: "" });

        if (isValidString(eventName ? eventName : event.ename)) return setData({ ...event, err: "String input must be at least 3 to 50 characters.", success: "" });
        if (isValidDescription(description ? description : event.description))
            return setData({ ...event, err: "String input must be at least 3 to 2000 characters.", success: "" });
        if (isInvalidDateTime(startDate, endDate)) return setData({ ...event, err: "End datetime be after start datetime. Start date should not be past.", success: "" });
        // if (isInValidDate(startDate, endDate)) return setData({ ...event, success: "", err: "End datetime be after start datetime. Start date should not be past." });

        //validate date to ensure start date before end date
        try {
            axios.patch(
                `/event/${eslug}/edit_event`,
                {
                    ename: eventName ? eventName : event.ename,
                    description: description ? description : event.description,
                    startDate: startDate ? startDate : event.startDate,
                    endDate: endDate ? endDate : event.endDate,
                    eBackground: bgImage ? bgImage : event.eBackground,
                },
                {
                    headers: { Authorization: token },
                }
            );
            setData({ ...data, err: "", success: "Updated Success!" });
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    const handleDelete = async () => {
        try {
            // ADD VALIDATE EVENT HOST
            if (window.confirm("Are you sure you want to delete this event? All booths in this event")) {
                setLoading(true);
                await axios.delete(`/event/${eslug}/delete_event`, {
                    headers: { Authorization: token },
                });
                setLoading(false);
                setCallback(!callback);
                // history.push(`/event/${eslug}/booth/all`);
                window.location.href = `http://localhost:3000/event/all_events`;
            }
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    return (
        <Container>
            <CFcard>
                <Box align="center" mb={8}>
                    <Tabs value={value} onChange={handleTabsChange} variant="fullWidth" indicatorColor="secondary" textColor="secondary" aria-label="icon label tabs example">
                        <Tab icon={<PersonPinIcon />} label="Reception" component={Link} to={`/event/${eslug}`} />
                        <Tab icon={<StorefrontIcon />} label="Expo" component={Link} to={`/event/${eslug}/booth/all`} />
                        {checkEventHost === true ? <Tab icon={<EditIcon />} label="Edit Event" /> : ""}
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
                <Typography variant="h2" align="center">
                    Edit Event
                </Typography>
                <br />
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <br />
                <form onSubmit={updateEventInfo}>
                    <Grid container spacing={8}>
                        <Grid item xs={12} align="center">
                            <img onChange={changeBgImage} className={classes.bgImage} src={bgImage ? bgImage : event.eBackground} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Event Name </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                required
                                id="eventName"
                                name="eventName"
                                label="Event Name"
                                defaultValue={event.ename}
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Event Description: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                required
                                id="description"
                                name="description"
                                label="Description"
                                defaultValue={event.description}
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={8}
                                rowsMax={10}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Start Date: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                id="startDate"
                                name="startDate"
                                label="Start Date"
                                type="datetime-local"
                                // defaultValue={startDate}
                                defaultValue={dayjs(event.startDate).format("YYYY-MM-DDThh:mm")}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">End Date: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                id="endDate"
                                name="endDate"
                                label="End Date"
                                type="datetime-local"
                                defaultValue={dayjs(event.endDate).format("YYYY-MM-DDThh:mm")}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Event Background Image:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <input type="file" name="file" id="file_up" onChange={changeBgImage} />
                        </Grid>
                    </Grid>
                </form>
                <br />
                <br />
                <Grid container>
                    <Grid item xs={3}>
                        <Button disabled={loading} onClick={updateEventInfo}>
                            Update
                        </Button>
                    </Grid>
                    <Grid item xs={9}>
                        <Button disabled={loading} onClick={handleDelete} className={classes.button}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
                <br />
                <br />

                <br />
                <br />
            </CFcard>
        </Container>
    );
}

export default EditEvent;
