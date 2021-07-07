import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { io } from "socket.io";
import Peer from "peerjs";

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

const useStyles = makeStyles((theme) => ({
    videoGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 300px)",
        gridAutoRows: 300,
    },
    video: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
}));

function StreamingRoom() {
    const { eslug, bslug, room } = useParams();
    const classes = useStyles();

    const auth = useSelector((state) => state.auth);
    const [peerId, setPeerId] = useState();
    const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);

    useEffect(() => {
        const peer = new Peer();

        peer.on("open", function (id) {
            setPeerId(peer._id);
        });

        peer.on("call", function () {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            // getUserMedia(
            //     { video: true, audio: false },
            //     function (mediaStream) {
            //         const call = peer.call(remotePeerId, mediaStream);

            //         call.on("stream", function (remoteStream) {
            //             // Show stream in some video/canvas element.\
            //             remoteVideoRef.current.srcObject = remoteStream;
            //         });
            //     },
            //     function (err) {
            //         console.log("Failed to get local stream", err);
            //     }
            // );
        });
    }, []);

    const call = (remotePeerId) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // getUserMedia(
        //     { video: true, audio: true },
        //     function (mediaStream) {
        //         const call = peer.call(remotePeerId, mediaStream);

        //         call.on("stream", function (remoteStream) {
        //             // Show stream in some video/canvas element.\
        //             remoteVideoRef.current.srcObject = remoteStream;
        //         });
        //     },
        //     function (err) {
        //         console.log("Failed to get local stream", err);
        //     }
        // );
    };

    // const socket = io(`/event/${eslug}/booth/${bslug}/stream/${room}`);

    const myPeer = new Peer();

    // socket.emit("join-room", room, auth.user._id);

    return (
        <Container>
            <CFcard>
                <Typography variant="h5">STREAMING HERE AT ROOM : {room} </Typography>
                <Typography variant="h5">MY PEER ID: {peerId} </Typography>

                <input type="text" value={remotePeerIdValue} onChange={(e) => setRemotePeerIdValue(e.target.value)} />
                <button onClick={() => call(remotePeerIdValue)}>Call</button>
                <div id="video-grid" className={classes.videoGrid}>
                    <video ref={remoteVideoRef}></video>
                </div>
            </CFcard>
        </Container>
    );
}

export default StreamingRoom;
