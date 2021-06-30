import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const UseStyles = makeStyles({
    root: {
        width: 320,
        margin: 16,
    },
    media: {
        height: 140,
        width: "100%",
    },
});

function boothListCard({ booth, eslug }) {
    const classes = UseStyles();
    ///event/${event.eslug}/booth/${booth.bslug}
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={booth.bimage || "https://material-ui.com/static/images/cards/contemplative-reptile.jpg"}
                    title={booth.bname || "Default Image"}
                ></CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {booth.bname}
                    </Typography>
                    <br />
                    <Button component={Link} to={`/event/${eslug}/booth/${booth.bslug}`}>
                        View Booth Details
                    </Button>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default boothListCard;
