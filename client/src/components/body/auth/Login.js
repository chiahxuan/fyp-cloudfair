import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Typography, Button } from "@material-ui/core";
import { set } from "mongoose";

const initialState = {
    email: "",
    password: "",
    err: "",
    success: "",
};

const useStyles = makeStyles((theme) => ({
    login_page: {
        maxWidth: "500px",
        margin: "auto",
        color: "#444",
        padding: "0 15px",
    },
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
    forgotLink: {
        paddingLeft: "20px",
    },
    loginLink: {
        paddingLeft: "20px",
    },
}));

function Login() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [user, setUser] = useState(initialState);
    const { email, password, err, success } = user;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: "", success });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/user/login", { email, password });
            setUser({ ...user, err: "", success: res.data.msg });

            localStorage.setItem("firstLogin", true);

            dispatch(dispatchLogin());
            history.push("/");
        } catch (err) {
            err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: "" });
        }
    };

    return (
        <div className="login_page">
            <Typography variant="h3">Welcome to CloudFair</Typography>
            <Typography>Sign in to access your account. Not registered?</Typography>
            <Link to="/register" className={classes.registerLink}>
                Create an account
            </Link>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>
                <div>
                    {/* <TextField id="email" margin="dense" label="Email Address" id="email" name="email" defaultValue={email} onChange={handleChangeInput} />
                    <br />
                    <TextField id="password" margin="dense" name="password" label="Password" type="password" defaultValue={password} onChange={handleChangeInput} /> */}

                    <TextField
                        id="email"
                        margin="dense"
                        label="Email Address"
                        id="email"
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
                    <TextField
                        id="password"
                        margin="dense"
                        name="password"
                        label="Password"
                        placeholder="Password"
                        type="password"
                        defaultValue={password}
                        onChange={handleChangeInput}
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </div>

                <div>
                    {/* <button type="submit">Login</button> */}
                    <br />
                    <Button type="submit" variant="contained" color="secondary">
                        Login
                    </Button>
                    <Link to="/forgot_password" className={classes.forgotLink}>
                        Forgot your password?
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
