import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooth, dispatchEventBooths } from "../../../redux/actions/boothAction";
import { setSingleEventParam } from "../../../redux/actions/eventAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, Container, TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CFcard from "../../components/CFcard";
import EventCard from "../../components/eventCard";
import BoothListCard from "../../components/boothListCard";

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
function AllBooth() {
    const classes = useStyles();

    const { eslug } = useParams();
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);
    const events = useSelector((state) => state.eventReducer.events);
    const booths = useSelector((state) => state.boothReducer.booths);
    const [callback, setCallback] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchBooth(token, eslug).then((res) => {
            dispatch(dispatchEventBooths(res));
        });
    }, [token, dispatch, callback]);
    console.log(booths);

    return (
        <Container>
            <CFcard>
                <Typography variant="h2" align="center">
                    Hi {auth.user.name}, here are the booths
                </Typography>
                <br />
                <br />
                <Grid container spacing={8}>
                    {booths.map((booth) => (
                        <Grid item>
                            <BoothListCard booth={booth} eslug={eslug} />
                        </Grid>
                    ))}
                </Grid>
            </CFcard>
        </Container>
    );
}

export default AllBooth;
