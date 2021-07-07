import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

// import VideoPlayer from "react-video-js-player";

import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isEmpty, isLength, isValidDescription, isValidString, isValidDateTime } from "../../utils/validation/Validation";
import { fetchSingleBooth, dispatchSingleBooth } from "../../../redux/actions/boothAction";
import dayjs from "dayjs";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Card, CardContent, Grid } from "@material-ui/core";
import CFcard from "../../components/CFcard";
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

    return (
        <Container>
            <CFcard>
                {/* <ReactPlayer controls url="https://www.youtube.com/watch?v=zg9ih6SVACc" width="100%" />  */}
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <ReactPlayer
                            playIcon
                            // url="https://fb.watch/6vVorE9gqT/"
                            url={booth.bvideo}
                            width="auto"
                            height="800px"
                            // url={booth.bvideo ? booth.bvideo : "https://www.youtube.com/watch?v=DGvP3uIo7IE"}
                            playing="true"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        video here:
                        <video id="vid" autoplay onClick={loadLiveVideo}></video>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} align="center">
                                <img
                                    className={classes.bgImage}
                                    src={booth.bimage}
                                    // src={booth.bimage ? booth.bimage : "https://res.cloudinary.com/cloudfair/image/upload/v1624965698/Booth/modern-exhibition.jpg"}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h4">Booth Description: </Typography>
                        <br />
                        <Typography> {booth.description}</Typography>
                        <br />

                        {isVendorOwner == true ? (
                            <>
                                <Button className={classes.button} component={Link} to={`/event/${eslug}/booth/${bslug}/edit_booth`}>
                                    Edit Booth
                                </Button>
                                <br />
                                <br />
                                <Button className={classes.button} component={Link} to={`/event/${eslug}/booth/${bslug}/streaming_room/${uuidV4()}`}>
                                    Visit Stream
                                </Button>
                            </>
                        ) : (
                            <></>
                        )}
                        <Grid container>
                            <Grid item xs={12} sm={4}></Grid>
                            <Grid item xs={12} sm={8}></Grid>
                        </Grid>
                        {/* cannot display video player */}
                        {/* <ReactPlayer controls url="https://www.youtube.com/watch?v=zg9ih6SVACc" width="100%" />  */}

                        {/* <VideoPlayer src={booth.bvideo} poster={booth.bimage} width="720" height="420"></VideoPlayer> */}
                    </Grid>
                </Grid>
            </CFcard>
        </Container>
    );
}

export default SingleBooth;
