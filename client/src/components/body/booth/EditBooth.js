import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import ReactGoogleSlides from "react-google-slides";

// import VideoPlayer from "react-video-js-player";

import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { fetchSingleBooth, dispatchSingleBooth } from "../../../redux/actions/boothAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Grid, Tabs, Tab, Box } from "@material-ui/core";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AddBoxIcon from "@material-ui/icons/AddBox";
import StorefrontIcon from "@material-ui/icons/Storefront";
import EditIcon from "@material-ui/icons/Edit";
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
        // width: "auto",
        // height: 300,
    },
    button: {
        marginLeft: 32,
    },
}));

const initialState = {
    bnameData: "",
    descriptionData: "",
    bimageData: "",
    bvideoData: "",
    bslidesData: "",
    err: "",
    success: "",
};

function EditBooth() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { eslug, bslug } = useParams();
    const history = useHistory();

    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const isVendorOwner = useSelector((state) => state.boothReducer.isVendorOwner);

    const booth = useSelector((state) => state.boothReducer.booth);
    const checkEventHost = useSelector((state) => state.eventReducer.isEventHost);
    const hasOrganization = useSelector((state) => state.organization.hasOrganization);
    const hasOwnedBooth = useSelector((state) => state.boothReducer.hasOwnedBooth);

    // HANDLE LOADING FUNCTION
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialState);
    const { bnameData, descriptionData, bvideoData, bslidesData, err, success } = data;
    const [callback, setCallback] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(false);

    useEffect(() => {
        fetchSingleBooth(token, eslug, bslug).then((res) => {
            dispatch(dispatchSingleBooth(res, auth.user._id));
        });
    }, [token, dispatch, callback]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
    };

    const changeImage = async (e) => {
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
            setBackgroundImage(res.data.url);
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    const updateInfo = () => {
        try {
            axios.patch(
                `/event/${eslug}/booth/${bslug}/edit_booth`,
                {
                    bname: bnameData ? bnameData : booth.bname,
                    description: descriptionData ? descriptionData : booth.description,
                    bimage: backgroundImage ? backgroundImage : booth.bimage,
                    bvideo: bvideoData ? bvideoData : booth.bvideo,
                    bslides: bslidesData ? bslidesData : booth.bslides,
                },
                {
                    headers: { Authorization: token },
                }
            );
            setData({ ...data, err: "", success: "Updated Success!" });
            history.push(`/event/${eslug}/booth/all`);
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    const handleDelete = async () => {
        try {
            // ADD VALIDATE EVENT HOST
            if (window.confirm("Are you sure you want to delete this booth?")) {
                setLoading(true);
                await axios.delete(`/event/${eslug}/booth/${bslug}/delete_booth`, {
                    headers: { Authorization: token },
                });
                setLoading(false);
                setCallback(!callback);
                // history.push(`/event/${eslug}/booth/all`);
                window.location.href = `http://localhost:3000/event/${eslug}/booth/all`;
            }
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    //HANDLE TAB CHANGES
    const [value, setValue] = React.useState(2);
    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };

    const videoPlayer = () => {
        return (
            <ReactPlayer
                controls
                width="100%"
                height="320px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                url={booth.bvideo ? booth.bvideo : "https://www.youtube.com/watch?v=ts8i-6AtDfc"}
                playing={true}
            />
        );
    };
    <ReactPlayer />;
    const pptSlides = () => {
        return (
            <ReactGoogleSlides
                width={`100%`}
                height={360}
                slidesLink={booth.bslides ? booth.bslides : "https://docs.google.com/presentation/d/1Q7wKZZ6BiFCDUFm5YhY5-nCR-emk6OPk1tSRMcI9F8c/edit?usp=sharing"}
                slideDuration={5}
                showControls
                loop
            />
        );
    };

    return (
        <Container maxWidth="lg">
            <CFcard>
                {/** TAB COMPONENT **/}
                <Box align="center" mb={8}>
                    <Tabs value={value} onChange={handleTabsChange} variant="fullWidth" indicatorColor="secondary" textColor="secondary" aria-label="icon label tabs example">
                        <Tab icon={<PersonPinIcon />} label="Reception" component={Link} to={`/event/${eslug}`} />
                        <Tab icon={<StorefrontIcon />} label="Expo" component={Link} to={`/event/${eslug}/booth/all`} />
                        {/* {checkEventHost == true ? <Tab icon={<AddBoxIcon />} label="Add Booth" /> : ""} */}

                        {checkEventHost === true ? <Tab icon={<EditIcon />} label="Edit Event" component={Link} to={`/event/${eslug}/edit_event`} /> : ""}
                        {(hasOrganization === true && hasOwnedBooth === false) || checkEventHost === true ? <Tab icon={<AddBoxIcon />} label="Add Booth" /> : ""}
                        {hasOrganization === true && hasOwnedBooth === true && checkEventHost === false ? (
                            <Tab icon={<EditIcon />} label="Edit Booth" component={Link} to={`/event/${eslug}/booth/${booth.bslug}/edit_booth`} />
                        ) : (
                            ""
                        )}
                    </Tabs>
                </Box>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                {loading && <h3>Loading.....</h3>}
                <Grid container spacing={8}>
                    <Grid item xs={6}>
                        <form onSubmit={updateInfo}>
                            <Grid container spacing={8}>
                                <Grid item xs={12} align="center">
                                    <img
                                        onChange={changeImage}
                                        className={classes.bgImage}
                                        src={backgroundImage ? backgroundImage : booth.bimage || "https://material-ui.com/static/images/cards/contemplative-reptile.jpg"}
                                        alt={booth.bname}
                                    />
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <Typography align="center" variant="h1">
                                        {booth.bname}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="h4">Booth Name: </Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    {/* <Typography> {booth.description}</Typography> */}
                                    <TextField
                                        id="bnameData"
                                        name="bnameData"
                                        label="Booth Name"
                                        placeholder={booth.bname}
                                        defaultValue={booth.bname}
                                        margin="dense"
                                        fullWidth
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="h4">Booth Description: </Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    {/* <Typography> {booth.description}</Typography> */}
                                    <TextField
                                        required
                                        id="descriptionData"
                                        name="descriptionData"
                                        label="Booth Description"
                                        placeholder={booth.description}
                                        defaultValue={booth.description}
                                        margin="dense"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        onChange={handleChange}
                                        multiline
                                        rows={8}
                                        rowsMax={10}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="h4">Booth Video URL:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    {/* <Typography> {booth.bvideo}</Typography> */}
                                    <TextField
                                        required
                                        id="bvideoData"
                                        name="bvideoData"
                                        label="Booth Video"
                                        placeholder={booth.bvideo}
                                        defaultValue={booth.bvideo}
                                        margin="dense"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant="h4">Booth Slides URL:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    {/* <Typography> {booth.bvideo}</Typography> */}
                                    <TextField
                                        required
                                        id="bslidesData"
                                        name="bslidesData"
                                        label="Booth Slides"
                                        placeholder={booth.bslides}
                                        defaultValue={booth.bslides}
                                        margin="dense"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Typography variant="h4">Booth Image:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <input type="file" name="file" id="file_up" onChange={changeImage} />
                                </Grid>
                            </Grid>
                        </form>
                        <br />
                        {isVendorOwner === true ? (
                            <>
                                <Button disabled={loading} onClick={updateInfo}>
                                    Update Booth
                                </Button>
                                <Button disabled={loading} onClick={handleDelete} className={classes.button}>
                                    Delete Booth
                                </Button>
                            </>
                        ) : (
                            <></>
                        )}
                    </Grid>
                    <Grid item xs={6} align="center">
                        {videoPlayer()}
                        <br />
                        <br />
                        {pptSlides()}
                        {/* cannot display video- player */}
                        {/* <ReactPlayer controls url="https://www.youtube.com/watch?v=zg9ih6SVACc" width="100%" /> */}
                        {/* <ReactPlayer playIcon url={booth.bvideo ? booth.bvideo : "https://www.youtube.com/watch?v=DGvP3uIo7IE"} width="100%" /> */}

                        {/* <VideoPlayer src={booth.bvideo} poster={booth.bimage} width="720" height="420"></VideoPlayer> */}
                    </Grid>
                </Grid>
            </CFcard>
        </Container>
    );
}

export default EditBooth;
