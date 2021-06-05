import React from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    menuItemLink: {
        color: "error",
        display: "secondary",
    },
}));

function NotFound() {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h2">404 || Not Found</Typography>
            <Typography>Sorry, looks like the page can not be found. </Typography>

            <Link to="/" className={classes.menuItemLink}>
                <Typography>Back to the homepage. </Typography>
            </Link>
        </div>
    );
}

export default NotFound;
