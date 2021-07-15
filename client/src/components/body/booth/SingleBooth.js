import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
// import VideoPlayer from "react-video-js-player";
import ReactGoogleSlides from "react-google-slides";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleBooth, dispatchSingleBooth, fetchBoothOrganizer, dispatchBoothOrganizer } from "../../../redux/actions/boothAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, Grid } from "@material-ui/core";
import CFcard from "../../components/CFcard";

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
    const [callback] = useState(false);
    const dispatch = useDispatch();
    const { eslug, bslug } = useParams();

    //CHECK AUTHORITY TO ACCESS TO EDIT
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

    const videoPlayer = () => {
        return (
            <ReactPlayer
                controls
                width="100%"
                height="720px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                url={booth.bvideo ? booth.bvideo : "https://www.youtube.com/watch?v=DGvP3uIo7IE"}
                playing={true}
            />
        );
    };

    const pptSlides = () => {
        return (
            <ReactGoogleSlides
                width={`100%`}
                height={480}
                slidesLink={booth.bslides ? booth.bslides : "https://docs.google.com/presentation/d/1Q7wKZZ6BiFCDUFm5YhY5-nCR-emk6OPk1tSRMcI9F8c/edit?usp=sharing"}
                slideDuration={5}
                showControls
                loop
            />
        );
    };

    return (
        <Container>
            <CFcard>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Typography variant="h2" align="center">
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
                                {isVendorOwner === true ? (
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
