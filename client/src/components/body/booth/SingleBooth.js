import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
// import VideoPlayer from "react-video-js-player";
import ReactGoogleSlides from "react-google-slides";

import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isEmpty, isLength, isValidDescription, isValidString, isValidDateTime } from "../../utils/validation/Validation";
import { fetchSingleBooth, dispatchSingleBooth, fetchBoothOrganizer, dispatchBoothOrganizer } from "../../../redux/actions/boothAction";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Card, CardContent, Grid } from "@material-ui/core";
import CFcard from "../../components/CFcard";
import Slides from "../../components/slides";
import SlideShow from "../../components/SlideShow";
const { v4: uuidV4 } = require("uuid");

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
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    button: {
        width: 200,
    },
}));

const initialState = {
    bname: "",
    bslug: "",
    description: "",
    startDate: "",
    bimage: "",
    bvideo: "",
    err: "",
    success: "",
};

function SingleBooth() {
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const booth = useSelector((state) => state.boothReducer.booth);
    const boothOrg = useSelector((state) => state.boothReducer.boothOrg);
    const [boothInput, setBoothInput] = useState(initialState);
    const [callback, setCallback] = useState(false);
    const dispatch = useDispatch();
    const { eslug, bslug } = useParams();
    const [checkVendor, setCheckVendor] = useState(false);

    //CHECK AUTHORITY TO ACCESS TO EDIT
    const checkEventHost = useSelector((state) => state.eventReducer.isEventHost); // EVENT HOST
    const checkVendorOwner = useSelector((state) => state.eventReducer.isEventHost); // EVENT HOST
    const isVendorOwner = useSelector((state) => state.boothReducer.isVendorOwner);

    useEffect(() => {
        fetchSingleBooth(token, eslug, bslug).then((res) => {
            dispatch(dispatchSingleBooth(res, auth.user._id));
        });
    }, [token, dispatch, callback]);

    useEffect(() => {
        fetchBoothOrganizer(token, eslug, bslug).then((res) => {
            dispatch(dispatchBoothOrganizer(res));
        });
    }, [token, dispatch, callback]);

    const loadLiveVideo = () => {
        // navigator.mediaDevices
        //     .getUserMedia({
        //         video: {
        //             width: {
        //                 min: 640,
        //                 ideal: 1280,
        //                 max: 1280,
        //             },
        //             height: {
        //                 min: 640,
        //                 ideal: 1280,
        //                 max: 1280,
        //             },
        //         },
        //     })
        //     .then((stream) => {
        //         document.getElementById("vid"), (srcObject = stream);
        //     });
    };

    const videoPlayer = () => {
        return (
            <ReactPlayer
                controls
                width="100%"
                height="720px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                url={booth.bvideo}
                playing={true}
                // config={{
                //     youtube: {
                //         playerVars: { showinfo: 1 },
                //     },
                // }}
            />
        );
    };

    const pptSlides = () => {
        return <ReactGoogleSlides width={`100%`} height={480} slidesLink={booth.bslides} slideDuration={5} showControls loop />;
    };

    return (
        <Container>
            <CFcard>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Typography variant="h2" align="center">
                            {" "}
                            {booth.bname}
                        </Typography>
                        <br />
                        <hr />
                        <br />
                        {videoPlayer()}
                    </Grid>
                    <Grid item xs={6}>
                        {pptSlides()}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h2">Booth Description: </Typography>
                        <br />
                        <Typography> {booth.description}</Typography>
                        <br /> <br />
                        <Typography variant="h2">Event Hosted by: {boothOrg.organizationName}</Typography>
                        <br />
                        <Typography>About: {boothOrg.organizationAbout}</Typography>
                        <br />
                        <Typography>Organization Email: {boothOrg.organizationEmail}</Typography>
                        <br />
                        <Grid container>
                            <Grid item xs={12} sm={4}>
                                {isVendorOwner == true ? (
                                    <>
                                        <Button className={classes.button} component={Link} to={`/event/${eslug}/booth/${bslug}/edit_booth`}>
                                            Edit Booth
                                        </Button>
                                        <br />
                                        <br />
                                        {/* <Button className={classes.button} component={Link} to={`/event/${eslug}/booth/${bslug}/streaming_room/${uuidV4()}`}>
                                    Visit Stream
                                </Button> */}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={8}></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CFcard>
        </Container>
    );
}

export default SingleBooth;
