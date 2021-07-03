import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isEmpty, isLength, isValidDescription, isValidString, isValidDateTime } from "../../utils/validation/Validation";
import { dispatchGetOrganization, fetchOrganization } from "../../../redux/actions/organizationAction";
import { setSingleEventParam } from "../../../redux/actions/eventAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Card, CardContent } from "@material-ui/core";
import CFcard from "../../components/CFcard";
var slugify = require("slug");

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
    bname: "",
    bslug: "",
    description: "",
    bimage: "",
    bvideo: "",
    organizationId: "",
    userId: "",
    eventId: "",

    err: "",
    success: "",
};

function AddBooth() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { eslug } = useParams();
    const history = useHistory();

    //access to user state
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const { user } = auth; // to get user ID

    //access to event
    const events = useSelector((state) => state.eventReducer.events);

    //access to organization information
    const organization = useSelector((state) => state.organization.organization);

    //set booth state
    const [booth, setBooth] = useState(initialState);

    //booth variables
    const { bname, bslug, description, bimage, bvideo, userId, organizationId, eventId, err, success } = booth;

    const [data, setData] = useState(initialState); // handle inputs
    const [singleEvent, setSingleEvent] = useState([]); //get singleEventObject
    const [checkEventHost, setCheckEventHost] = useState(false); //boolean to check even organizerId
    const [loading, setLoading] = useState(false); //i dunno
    const [bgImage, setBgImage] = useState(false); //image update
    const [wantEdit, setWantEdit] = useState(false);

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

    // console.log(singleEvent._id + " single evnet");
    // console.log(organization._id + " organizaiton");

    //HANDLE THEN STATE OF THE INPUT
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setBooth({ ...booth, [name]: value, err: "", success });
        // setDate({ endDate: startDate });
        // console.log("description " + description);
        // console.log(event);
    };

    //SUBMIT FORM
    const handleSubmit = async (e) => {
        // console.log(auth.user._id);
        // console.log(singleEvent._id);
        // console.log(organization._id);
        // console.log(token);
        // console.log(slugify(bslug + "-" + Math.random().toString(36).substring(7)));

        try {
            //CHECK DATA STATE CHANGES
            // console.log("bname " + bname);
            // console.log("bslug " + slugify(bslug + "-" + Math.random().toString(36).substring(7)));
            // console.log("description " + description);
            // console.log("bvideo " + bvideo);
            // console.log("bvideo " + auth.user._id);
            const res = await axios.post(
                `/event/${eslug}/booth/add_booth`,
                {
                    bname: bname,
                    bslug: slugify(bslug + "-" + Math.random().toString(36).substring(7)),
                    description: description,
                    bvideo: bvideo,
                    user: auth.user._id,
                    event: singleEvent._id,
                    organization: organization._id,
                },
                {
                    headers: { Authorization: token },
                }
            );
            console.log(res);

            setData({ ...data, err: "", success: "Updated Success!" });
            // setBooth({ ...booth, err: "", success: "pass val" });
            setBooth({ ...booth, err: "", success: res.data.msg });
            // history.push("/event"); // change location
        } catch (err) {
            err.response.data.msg && setBooth({ ...booth, err: err.response.data.msg, success: "" });
        }
    };

    return (
        <Container>
            <CFcard>
                <Typography align="center" variant="h1">
                    Add Event Booth
                </Typography>
                <Typography align="center">
                    or back to <Link to="/event/user_events">Events</Link>
                </Typography>
                <br />
                <br />
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                {loading && <h3>Loading.....</h3>}
                <br />
                <br />
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="bname"
                        id="bname"
                        margin="dense"
                        label="Booth Name"
                        placeholder="Booth Name"
                        defaultValue={bname}
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
                        id="bslug"
                        name="bslug"
                        margin="dense"
                        label="Booth Url Slug"
                        placeholder="Booth Url Slug"
                        defaultValue={bslug}
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
                        id="bvideo"
                        name="bvideo"
                        margin="dense"
                        label="Booth Video Streaming Link"
                        placeholder="Booth Video Streaming Link"
                        defaultValue={bvideo}
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
                </form>
                <br />
                <Button type="submit" variant="contained" onClick={handleSubmit}>
                    Create
                </Button>
            </CFcard>
        </Container>
    );
}

export default AddBooth;
