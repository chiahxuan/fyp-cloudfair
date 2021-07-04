import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooth, dispatchEventBooths } from "../../../redux/actions/boothAction";
import { setSingleEventParam } from "../../../redux/actions/eventAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, Container, TextField, Tab, Tabs, Box, Card, CardActionArea, CardMedia, CardContent } from "@material-ui/core";

//ICONS IMPORT
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AddBoxIcon from "@material-ui/icons/AddBox";
import StorefrontIcon from "@material-ui/icons/Storefront";
import EditIcon from "@material-ui/icons/Edit";

import CFcard from "../../components/CFcard";
import EventCard from "../../components/eventCard";
import BoothListCard from "../../components/boothListCard";
import SearchField from "react-search-field";

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
    const event = useSelector((state) => state.eventReducer.event);

    const booths = useSelector((state) => state.boothReducer.booths);
    const checkEventHost = useSelector((state) => state.eventReducer.isEventHost);
    const hasOrganization = useSelector((state) => state.organization.hasOrganization);
    const hasOwnedBooth = useSelector((state) => state.boothReducer.hasOwnedBooth);

    const [callback, setCallback] = useState(false);
    const dispatch = useDispatch();

    const [Booths, setBooths] = React.useState([]);

    useEffect(() => {
        setBooths(booths);
    }, [booths]);

    useEffect(() => {
        fetchBooth(token, eslug).then((res) => {
            dispatch(dispatchEventBooths(res));
        });
    }, [token, dispatch, callback]);

    //SEARCH BOOTHS
    const onChange = (search) => {
        setBooths(
            booths.filter((booth) => {
                var validate = booth.bname.toLowerCase().includes(search.toLowerCase());
                if (validate == true) {
                    return <BoothListCard booth={booth} />;
                }
            })
        );
    };

    //HANDLE TAB CHANGES
    const [value, setValue] = React.useState(1);
    const handleTabsChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <CFcard>
                <Box align="center">
                    <Tabs value={value} onChange={handleTabsChange} variant="fullWidth" indicatorColor="secondary" textColor="secondary" aria-label="icon label tabs example">
                        <Tab icon={<PersonPinIcon />} label="Reception" component={Link} to={`/event/${eslug}`} />
                        <Tab icon={<StorefrontIcon />} label="Expo" />
                        {checkEventHost == true ? <Tab icon={<EditIcon />} label="Edit Event" component={Link} to={`/event/${eslug}/edit_event`} /> : ""}
                        {hasOrganization == true && hasOwnedBooth == false ? (
                            <Tab icon={<AddBoxIcon />} label="Add Booth" component={Link} to={`/event/${event.eslug}/booth/add_booth`} />
                        ) : (
                            ""
                        )}
                        {/* {hasOrganization == true && hasOwnedBooth == true ? (
                            <Tab icon={<EditIcon />} label="Edit Booth" component={Link} to={`/event/${eslug}/booth/${bslug}/edit_event`} />
                        ) : (
                            ""
                        )} */}
                    </Tabs>
                </Box>
                <br />
                <br />
                <Typography variant="h2" align="center">
                    Hi {auth.user.name}, here are the booths
                </Typography>
                <br />
                <SearchField placeholder="Search..." onChange={onChange} searchText="" />
                <br />
                <br />
                <Grid container spacing={8}>
                    {Booths.map((booth) => (
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
