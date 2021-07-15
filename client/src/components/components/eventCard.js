import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const useStyles = makeStyles({
    root: {
        width: 320,
        margin: 16,
    },
    media: {
        height: 140,
        width: "100%",
    },
});

export default function EventCard({ event }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            {/*<Card component={Link} to={`/events/${event.eslug}`} className={classes.root}>*/}
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={event.eBackground || "https://material-ui.com/static/images/cards/contemplative-reptile.jpg"}
                    title={event.ename || "Default Image"}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {event.ename}
                    </Typography>
                    {/* <Box className={classes.descriptionBox}>
                        <Typography>{event.description}</Typography>
                    </Box> */}
                    <Typography>Starts: {dayjs(event.startDate).format("YYYY MMMM DD, hh:mm A")}</Typography>
                    <Typography>Ends : {dayjs(event.endDate).format("YYYY MMMM DD, hh:mm A")}</Typography>
                    {/* <Typography>Ends : {dayjs(event.endDate).format("MMMM M, hh:mm A")}</Typography> */}
                    <br />{" "}
                    <Button component={Link} to={`/event/${event.eslug}`}>
                        View Event Details
                    </Button>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
