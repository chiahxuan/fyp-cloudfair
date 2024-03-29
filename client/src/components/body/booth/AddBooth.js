import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { dispatchGetOrganization, fetchOrganization } from "../../../redux/actions/organizationAction";
import { setSingleEventParam } from "../../../redux/actions/eventAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Tab, Tabs, Box } from "@material-ui/core";
import CFcard from "../../components/CFcard";

//ICONS IMPORT
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AddBoxIcon from "@material-ui/icons/AddBox";
import StorefrontIcon from "@material-ui/icons/Storefront";
import EditIcon from "@material-ui/icons/Edit";

var slugify = require("slug");

const initialState = {
    bname: "",
    bslug: "",
    description: "",
    bimage: "",
    bvideo: "",
    bslides: "",
    organizationId: "",
    userId: "",
    eventId: "",

    err: "",
    success: "",
};

function AddBooth() {
    const dispatch = useDispatch();
    const { eslug } = useParams();
    const history = useHistory();

    //access to user state
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const event = useSelector((state) => state.eventReducer.event);

    //access to event
    const events = useSelector((state) => state.eventReducer.events);

    //access to organization information
    const organization = useSelector((state) => state.organization.organization);

    //set booth state
    const [booth, setBooth] = useState(initialState);

    //booth variables
    const { bname, bslug, description, bvideo, bslides, err, success } = booth;

    const [singleEvent, setSingleEvent] = useState([]); //get singleEventObject
    const [loading, setLoading] = useState(false); //i dunno

    // const booths = useSelector((state) => state.boothReducer.booths);
    // const booth = useSelector((state) => state.boothReducer.booth);
    const checkEventHost = useSelector((state) => state.eventReducer.isEventHost);
    const hasOrganization = useSelector((state) => state.organization.hasOrganization);
    const hasOwnedBooth = useSelector((state) => state.boothReducer.hasOwnedBooth);

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
                    setSingleEventParam(event);
                }
            });
        } else {
            history.push("/event/user_events");
        }
    }, [events, eslug, history]);

    //HANDLE THEN STATE OF THE INPUT
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setBooth({ ...booth, [name]: value, err: "", success });
    };

    //SUBMIT FORM
    const handleSubmit = async () => {
        try {
            const res = await axios.post(
                `/event/${eslug}/booth/add_booth`,
                {
                    bname: bname,
                    bslug: slugify(bslug + "-" + Math.random().toString(36).substring(7)),
                    description: description,
                    bvideo: bvideo,
                    bslides: bslides,
                    user: auth.user._id,
                    event: singleEvent._id,
                    organization: organization._id,
                },
                {
                    headers: { Authorization: token },
                }
            );

            //update isVendorOwner status and update already owned booth

            setBooth({ ...booth, err: "", success: res.data.msg });
            window.location.href = `http://localhost:3000/event/${eslug}/booth/all`;
        } catch (err) {
            err.response.data.msg && setBooth({ ...booth, err: err.response.data.msg, success: "" });
        }
    };

    //HANDLE TAB CHANGES
    const tabNumber = () => {
        if (checkEventHost === true) {
            return 3;
        } else {
            return 2;
        }
    };
    const [value, setValue] = React.useState(tabNumber);
    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <CFcard>
                <Box align="center" mb={8}>
                    <Tabs value={value} onChange={handleTabsChange} variant="fullWidth" indicatorColor="secondary" textColor="secondary" aria-label="icon label tabs example">
                        <Tab icon={<PersonPinIcon />} label="Reception" component={Link} to={`/event/${eslug}`} />
                        <Tab icon={<StorefrontIcon />} label="Expo" component={Link} to={`/event/${eslug}/booth/all`} />
                        {checkEventHost === true ? <Tab icon={<EditIcon />} label="Edit Event" component={Link} to={`/event/${eslug}/edit_event`} /> : ""}
                        {(hasOrganization === true && hasOwnedBooth === false) || checkEventHost === true ? <Tab icon={<AddBoxIcon />} label="Add Booth" /> : ""}
                        {hasOrganization === true && hasOwnedBooth === true && checkEventHost === false ? (
                            <Tab icon={<EditIcon />} label="Edit Booth" component={Link} to={`/event/${eslug}/booth/${booth.bslug}/edit_booth`} />
                        ) : (
                            ""
                        )}
                    </Tabs>
                </Box>
                <Typography align="center" variant="h1">
                    Add Event Booth for: {event.ename}
                </Typography>
                <Typography align="center">
                    or back to <Link to="/event/user_events">Events</Link>
                </Typography>
                <br />
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                {loading && <h3>Loading.....</h3>}
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
                        id="bslides"
                        name="bslides"
                        margin="dense"
                        label="Booth Slides Link"
                        placeholder="Booth Google Slide Link"
                        defaultValue={bslides}
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
