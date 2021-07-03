import React from "react";
import { Card, CardContent, CardProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    root: {
        padding: "2rem 0",
        maxWidth: "100%",
        margin: "4rem auto"
    },
    cardBg: {
        padding: "2rem",
        backgroundColor: "white",
        boxShadow: "1 5px 15px 1 rgba(0,0,0.25)",
        borderRadius: "3px",
    },
}));


function CFcard(props: CardProps) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardBg}>{props.children}</CardContent>
        </Card>
    );
}

export default CFcard;
