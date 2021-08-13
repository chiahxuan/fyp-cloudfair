import React from "react";
import { Link } from "react-router-dom";

import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CFcard from "../../components/CFcard";

const useStyles = makeStyles((theme) => ({
    menuItemLink: {
        color: "error",
        display: "secondary",
    },
}));

function NotFound() {
    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <CFcard>
                <br />
                <br />

                <Typography variant="h1">404 || Not Found</Typography>
                <br />
                <br />

                <Typography>Sorry, looks like the page can not be found. </Typography>
                <Link to="/" className={classes.menuItemLink}>
                    <Typography>Back to the homepage. </Typography>
                </Link>
            </CFcard>
        </Container>
    );
}

export default NotFound;
