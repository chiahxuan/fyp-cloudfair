import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dispatchGetOrganization, fetchOrganization } from "../../../redux/actions/organizationAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, Grid } from "@material-ui/core";
import CFcard from "../../components/CFcard";

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
        height: 300,
        marginLeft: "auto",
        marginRight: "auto",
    },
    button: {
        width: 200,
    },
}));

function CreateOrg() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);
    const organization = useSelector((state) => state.organization);
    const { id, organizationName } = organization;
    const [callback] = useState(false);

    // ASSIGN ORGANIZATION DATA TO VARIABLE
    const organizationData = organization.organization;

    // DISPATCH DATA FROM res.data, update the state of organization
    // organization contains all organization information.
    useEffect(() => {
        if (token) {
            const getOrganization = () => {
                return fetchOrganization(token).then((res) => {
                    dispatch(dispatchGetOrganization(res));
                });
            };
            getOrganization();
        }
    }, [token, dispatch, callback]);

    return (
        <Container maxWidth="md">
            <CFcard>
                <Grid container spacing={8}>
                    <Grid item xs={12} align="center">
                        <img
                            className={classes.bgImage}
                            src={
                                organizationData.organizationBackground
                                    ? organizationData.organizationBackground
                                    : organizationData.organizationBackground || "https://res.cloudinary.com/cloudfair/image/upload/v1624353682/avatar/organization.png"
                            }
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Typography align="center" variant="h1">
                            {organizationData.organizationName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h4">Organization Description: </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Typography> {organizationData.organizationAbout}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h4">Organization Email: </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Typography> {organizationData.organizationEmail}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h4">Edit Organization: </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button component={Link} to="/organization/edit_organization" className={classes.button}>
                            Edit Organization
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h4">Add Event: </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Button component={Link} to="/event/add_event" className={classes.button}>
                            Add Event
                        </Button>
                    </Grid>
                </Grid>
            </CFcard>
        </Container>
    );
}

export default CreateOrg;
