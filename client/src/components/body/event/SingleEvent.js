import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isEmpty, isLength, isValidDescription, isValidString, isValidDateTime } from "../../utils/validation/Validation";
import { setCheckEventHost, fetchSingleEvent, dispatchGetSingleEvent, fetchEventHostStatus, dispatchEventHostStatus } from "../../../redux/actions/eventAction";
// import { getSingleEventParam, dispatchSetEventParam } from "../../../redux/actions/eventAction";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Card, CardContent, Grid, Tabs, Tab, Paper, Box } from "@material-ui/core";
import PersonPinIcon from "@material-ui/icons/PersonPin";
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

//dispatchSingleEvent

function SingleEvent() {
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const event = useSelector((state) => state.eventReducer.event);
    const organization = useSelector((state) => state.organization.organization);
    const dispatch = useDispatch();

    const [data, setData] = useState(initialState);
    // const [singleEvent, setSingleEvent] = useState([]);
    const [checkEventHost, setCheckEventHost] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bgImage, setBgImage] = useState(false);
    const [wantEdit, setWantEdit] = useState(false);
    const [callback, setCallback] = useState(false);

    const { eslug } = useParams();
    // console.log(eslug);

    const history = useHistory();
    // console.log(singleEvent);
    useEffect(() => {
        fetchSingleEvent(eslug, token).then((res) => {
            dispatch(dispatchGetSingleEvent(res));
            setCheckEventHost(event.user === auth.user._id ? true : false); // update isEventHost to true
            // console.log(checkEventHost);
        });
    }, [token, dispatch, callback, checkEventHost]);
    // useEffect(() => {
    //     fetchEventHostStatus(eslug, token, auth.user._id, organization._id).then((res) => {
    //         dispatch(dispatchEventHostStatus(res));
    //     });
    // }, [token, dispatch, callback]);

    // if(event.user === auth.user._id )
    // console.log(organization._id);
    // console.log(auth.user._id);
    // GET EVENT DATA FROM SLUG
    // useEffect(() => {
    //     if (events.length !== 0) {
    //         events.forEach((event) => {
    //             if (event.eslug === eslug) {
    //                 setSingleEvent(event);
    //                 setCheckEventHost(event.user === auth.user._id ? true : false);
    //             }
    //         });
    //     } else {
    //         history.push(`/event/${eslug}`);
    //         // history.push("/event/user_events");
    //     }
    // }, [events, eslug, history, callback]);

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
        try {
            axios.patch(
                `/${event.eslug}/edit`,
                {
                    // name: name ? name : user.name,
                    // avatar: avatar ? avatar : user.avatar,
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

    const handleUpdate = () => {
        //change the variables below when do edit
        // if (name || avatar) updateInfor();
        // if (password) updatePassword();
    };

    const handleDelete = async (id) => {
        try {
            // if (user._id !== id) {
            //     if (window.confirm("Are you sure you want to delete this account?")) {
            //         setLoading(true);
            //         await axios.delete(`/user/delete/${id}`, {
            //             headers: { Authorization: token },
            //         });
            //         setLoading(false);
            //         setCallback(!callback);
            //     }
            // }
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
    };

    const [value, setValue] = React.useState(0);

    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <CFcard>
                <br />
                {/** VIEW EVENT  */}
                <section>
                    <Grid container></Grid>

                    {/**create Event Container here*/}
                    <Grid container spacing={8}>
                        <Grid item xs={12} align="center">
                            <img
                                className={classes.bgImage}
                                src={bgImage ? bgImage : event.eBackground || "https://material-ui.com/static/images/cards/contemplative-reptile.jpg"}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Typography align="center" variant="h1">
                                {event.ename}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Event Description: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography> {event.description}</Typography>
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
                            <Typography variant="h4">Add Booth </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Button component={Link} to={`/event/${event.eslug}/booth/add_booth`}>
                                Add booth
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Edit Event </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Button component={Link} to="/">
                                Edit Event
                            </Button>
                        </Grid>
                    </Grid>
                </section>
                <br />
                <br />
                <Box align="center">
                    <Paper square className={classes.tab}>
                        <Tabs value={value} onChange={handleTabsChange} variant="fullWidth" indicatorColor="secondary" textColor="secondary" aria-label="icon label tabs example">
                            <Tab icon={<PersonPinIcon />} label="Reception" />
                            <Tab icon={<StorefrontIcon />} label="Expo" component={Link} to={`${eslug}/booth/all`} />

                            {checkEventHost == true ? <Tab icon={<EditIcon />} label="Edit Event" component={Link} to={`${eslug}/edit_event`} /> : ""}
                        </Tabs>
                    </Paper>
                </Box>

                {/** EDIT EVENT  */}
                {/* <section>
                    <Grid container spacing={8}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Event Name </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                required
                                id="ename"
                                name="ename"
                                label="Event Name"
                                defaultValue={singleEvent.ename}
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
                            <Typography variant="h4">Event Background Image:</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <input type="file" name="file" id="file_up" onChange={changeBgImage} />
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
                                defaultValue={singleEvent.description}
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={3}
                                rowsMax={4}
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
                                defaultValue={singleEvent.startDate}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                fullWidth
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
                                defaultValue={singleEvent.endDate}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </section>

                <br />
                <br />
                <div>
                    <Button component={Link} to="/event/add_booth">
                        Update
                    </Button>
                </div> */}
            </CFcard>
        </Container>
    );
}

export default SingleEvent;
