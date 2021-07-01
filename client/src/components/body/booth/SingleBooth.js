import React, { useState, useEffect } from "react";
import axios from "axios";
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

    console.log(booth);
    return (
        <Container>
            <CFcard>
                <Grid container spacing={8}>
                    <Grid item xs={6}>
                        <Grid container spacing={8}>
                            <Grid item xs={12} align="center">
                                <img className={classes.bgImage} src={booth.bimage ? booth.bimage : "https://material-ui.com/static/images/cards/contemplative-reptile.jpg"} />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Typography align="center" variant="h1">
                                    {booth.bname}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4">Booth Description: </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Typography> {booth.description}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4">Booth Slug: </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Typography> {booth.bslug}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4">Booth Background Image:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <input type="file" name="file" id="file_up" />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4">Booth Video URL:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <Typography> {booth.bvideo}</Typography>
                            </Grid>
                        </Grid>
                        {checkVendor == true ? (
                            <>
                                <Button>Edit Booth</Button>
                            </>
                        ) : (
                            <></>
                        )}
                    </Grid>
                    <Grid item xs={6} align="center"></Grid>
                </Grid>
            </CFcard>
        </Container>
    );
}

export default SingleBooth;
