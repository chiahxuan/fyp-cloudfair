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
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
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

function refreshPage() {
    window.location.reload();
}

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

    useEffect(() => {
        fetchSingleBooth(token, eslug, bslug).then((res) => {
            dispatch(dispatchSingleBooth(res));
            setCheckVendor(booth.user === auth.user._id ? true : false);
        });
    }, [token, dispatch, callback]);

    // console.log(booth);
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
                            height="600px"
                            // url={booth.bvideo ? booth.bvideo : "https://www.youtube.com/watch?v=DGvP3uIo7IE"}
                            playing="true"
                        />
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

                        {checkVendor == true ? (
                            <>
                                <Button component={Link} to={`/event/${eslug}/booth/${bslug}/edit_booth`}>
                                    Edit Booth
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
