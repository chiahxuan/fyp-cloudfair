import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player/lazy";

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
        // width: "auto",
        // height: 300,
    },
}));

const initialState = {
    bnameData: "",
    bslugData: "",
    descriptionData: "",
    bimageData: "",
    bvideoData: "",
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
    const booth = useSelector((state) => state.boothReducer.booth);

    // HANDLE LOADING FUNCTION
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialState);
    const { bnameData, bslugData, descriptionData, bvideoData, err, success } = data;
    const [callback, setCallback] = useState(false);
    const [checkVendor, setCheckVendor] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(false);

    useEffect(() => {
        fetchSingleBooth(token, eslug, bslug).then((res) => {
            dispatch(dispatchSingleBooth(res));
            setCheckVendor(booth.user === auth.user._id ? true : false);
        });
    }, [token, dispatch, callback]);

    // console.log(booth);
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
        // console.log("update info");
        // console.log(bnameData, bslugData, descriptionData, bimageData, bvideoData, err, success);
        // console.log("backgroundImage  " + backgroundImage);
        // console.log("bvideoData  " + bvideoData);

        try {
            axios.patch(
                `/event/${eslug}/booth/${bslug}/edit_booth`,
                {
                    bname: bnameData ? bnameData : booth.bname,
                    description: descriptionData ? descriptionData : booth.description,
                    bimage: backgroundImage ? backgroundImage : booth.bimage,
                    bvideo: bvideoData ? bvideoData : booth.bvideo,
                },
                {
                    headers: { Authorization: token },
                }
            );

            setData({ ...data, err: "", success: "Updated Success!" });
            history.push(`/event/${eslug}/booth/${bslug}`);
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
            // console.log("cannot connect to controller");
        }
    };

    return (
        <Container>
            <CFcard>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                {loading && <h3>Loading.....</h3>}
                {/* <ReactPlayer controls url="https://www.youtube.com/watch?v=zg9ih6SVACc" width="100%" />  */}
                <Grid container spacing={8}>
                    <Grid item xs={6}>
                        <form onSubmit={updateInfo}>
                            <Grid container spacing={8}>
                                <Grid item xs={12} align="center">
                                    <img onChange={changeImage} className={classes.bgImage} src={backgroundImage ? backgroundImage : booth.bimage} />
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
                                        defaultValue={bnameData}
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
                                        rows={3}
                                        rowsMax={4}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Typography variant="h4">Booth Background Image:</Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <input type="file" name="file" id="file_up" onChange={changeImage} />
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
                            </Grid>{" "}
                        </form>

                        <Button disabled={loading} onClick={updateInfo}>
                            Update Booth
                        </Button>
                    </Grid>
                    <Grid item xs={6} align="center">
                        {/* cannot display video player */}
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