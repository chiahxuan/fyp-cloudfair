import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import { isLength, isMatch } from "../../utils/validation/Validation";
import { Typography, Button, Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CFcard from "../../components/CFcard";

const initialState = {
    password: "",
    cf_password: "",
    err: "",
    success: "",
};
const useStyles = makeStyles(() => ({
    label: {
        fontSize: "2em",
    },
}));

function ResetPassword() {
    const classes = useStyles();
    const [data, setData] = useState(initialState);
    const { token } = useParams();
    const { password, cf_password, err, success } = data;

    // console.log(useParams());
    // console.log(token);
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
    };

    const handleResetPass = async () => {
        if (isLength(password)) return setData({ ...data, err: "Password must be at least 6 characters.", success: "" });

        if (!isMatch(password, cf_password)) return setData({ ...data, err: "Password did not match.", success: "" });

        try {
            const res = await axios.post(
                "/user/reset",
                { password },
                {
                    headers: { Authorization: token },
                }
            );

            return setData({ ...data, err: "", success: res.data.msg });
        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    return (
        <Container className="fg_pass" maxWidth="sm">
            <CFcard>
                <Typography variant="h2">Reset Your Password</Typography>
                <br />
                <div>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}

                    <Typography className={classes.label}>Enter your New Password: </Typography>
                    <TextField
                        id="password"
                        margin="dense"
                        name="password"
                        label="Password"
                        placeholder="Password"
                        type="password"
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={password}
                        onChange={handleChangeInput}
                    />
                    <TextField
                        id="cf_password"
                        margin="dense"
                        name="cf_password"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type="password"
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={cf_password}
                        onChange={handleChangeInput}
                    />
                </div>
                <br></br>
                <Button onClick={handleResetPass}>Reset Password</Button>
            </CFcard>
        </Container>
    );
}

export default ResetPassword;
