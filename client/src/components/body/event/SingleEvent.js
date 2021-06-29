import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isEmpty, isLength, isValidDescription, isValidString, isValidDateTime } from "../../utils/validation/Validation";
import { setSingleEventParam } from "../../../redux/actions/eventAction";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Card, CardContent, Grid } from "@material-ui/core";
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
    const events = useSelector((state) => state.eventReducer.events);
    const dispatch = useDispatch();

    const [data, setData] = useState(initialState);
    const [singleEvent, setSingleEvent] = useState([]);
    const [checkEventHost, setCheckEventHost] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bgImage, setBgImage] = useState(false);
    const [wantEdit, setWantEdit] = useState(false);

    const { eslug } = useParams();
    // console.log(eslug);

    const history = useHistory();

    // GET EVENT DATA FROM SLUG
    useEffect(() => {
        if (events.length !== 0) {
            events.forEach((event) => {
                if (event.eslug === eslug) {
                    setSingleEvent(event);
                    setCheckEventHost(event.user === auth.user._id ? true : false);
                    setSingleEventParam(event);
                }
            });
        } else {
            history.push("/event/user_events");
        }
    }, [events, eslug, history]);

    // console.log(singleEvent);

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
                `/event/${singleEvent.eslug}/edit`,
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

    return (
        <Container maxWidth="md">
            <CFcard>
                <br />
                {/** VIEW EVENT  */}
                <section>
                    <Grid container spacing={8}>
                        <Grid item xs={12} align="center">
                            <img
                                className={classes.bgImage}
                                src={bgImage ? bgImage : singleEvent.eBackground || "https://material-ui.com/static/images/cards/contemplative-reptile.jpg"}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Typography align="center" variant="h1">
                                {singleEvent.ename}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Event Description: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography> {singleEvent.description}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Start Date: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography>{dayjs(singleEvent.startDate).format("YYYY MMMM DD, hh:mm A")} </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">End Date: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography>{dayjs(singleEvent.endDate).format("YYYY MMMM DD, hh:mm A")} </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Add Booth </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Button component={Link} to={`/event/${singleEvent.eslug}/add_booth`}>
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
