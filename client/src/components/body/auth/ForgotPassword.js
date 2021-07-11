import React, { useState } from "react";
import { Typography, Button, Container, TextField } from "@material-ui/core";

import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { makeStyles } from "@material-ui/core/styles";
import CFcard from "../../components/CFcard";

const initialState = {
    email: "",
    err: "",
    success: "",
};

const useStyles = makeStyles(() => ({
    label: {
        fontSize: "2em",
    },
}));
function ForgotPassword() {
    const [data, setData] = useState(initialState);
    const { email, err, success } = data;
    const classes = useStyles();

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
    };
    const forgotPassword = async () => {
        if (!isEmail(email)) return setData({ ...data, err: "Invalid emails.", success: "" });

        try {
            const res = await axios.post("/user/forgot", { email });

            return setData({ ...data, err: "", success: res.data.msg });
        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    return (
        <Container className="fg_pass" maxWidth="sm">
            <CFcard>
                <Typography variant="h2">Forgot Password</Typography>
                <br />
                <div>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}

                    <Typography className={classes.label}>Enter your email address: </Typography>
                    <TextField
                        id="email"
                        margin="dense"
                        label="Email Address"
                        name="email"
                        defaultValue={email}
                        onChange={handleChangeInput}
                        placeholder="Email Address"
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <br></br>
                <Button onClick={forgotPassword}>Verify your email</Button>
            </CFcard>
        </Container>
    );
}
export default ForgotPassword;
