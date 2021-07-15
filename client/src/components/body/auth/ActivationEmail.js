import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import { Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import CFcard from "../../components/CFcard";

function ActivationEmail() {
    const { activation_token } = useParams();
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post("/user/activation", { activation_token });
                    setSuccess(res.data.msg);
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg);
                }
            };
            activationEmail();
        }
    }, [activation_token]);

    return (
        <Container className="active_page" maxWidth="sm">
            <CFcard>
                <br />
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <br />
                <br />
                <Button component={Link} to="/login">
                    Login
                </Button>
                <br />
            </CFcard>
        </Container>
    );
}

export default ActivationEmail;
