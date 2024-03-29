import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CFcard from "../../components/CFcard";
import { Typography, Button, Container, Box } from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

// DECLARING INITIAL STATE
const initialState = {
    email: "",
    password: "",
    err: "",
    success: "",
};

// COMPONENT STYLING
const useStyles = makeStyles((theme) => ({
    login_page: {
        maxWidth: "500px",
        margin: "auto",
        color: "#444",
        padding: "0 15px",
    },
    socialBtn: {
        "& button": {
            width: "50%",
            alignItems: "center",
            fontSize: 14,
            height: 40,
            padding: 0,
        },
        "& span": {
            width: "100%",
            height: 40,
            alignItems: "center",
        },
    },
    button: {
        width: "50%",
    },
}));

function Login() {
    const classes = useStyles();
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
            window.location.href = `http://localhost:3000/`;
        } catch (err) {
            err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: "" });
        }
    };

    const responseGoogle = async (response) => {
        try {
            const res = await axios.post("/user/google_login", { tokenId: response.tokenId });

            setUser({ ...user, error: "", success: res.data.msg });
            localStorage.setItem("firstLogin", true);

            dispatch(dispatchLogin());
            window.location.href = `http://localhost:3000/event/all_events`;
        } catch (err) {
            err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: "" });
        }
    };

    const responseFacebook = async (response) => {
        try {
            const { accessToken, userID } = response;
            const res = await axios.post("/user/facebook_login", { accessToken, userID });

            setUser({ ...user, error: "", success: res.data.msg });
            localStorage.setItem("firstLogin", true);

            dispatch(dispatchLogin());
            window.location.href = `http://localhost:3000/event/all_events`;
        } catch (err) {
            err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: "" });
        }
    };

    return (
        <Container className="login_page" maxWidth="sm">
            <CFcard>
                <br />
                <Typography variant="h1" align="center">
                    Welcome to CloudFair
                </Typography>
                <br />

                <Typography align="center">
                    Sign in to access your account. Not registered?{" "}
                    <Link to="/register" className={classes.registerLink}>
                        Create an account
                    </Link>
                </Typography>
                <br />
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <form onSubmit={handleSubmit}>
                    <div>
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
                        <br />
                        <br />

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
                    <Box align="center" component="section">
                        <Link to="/forgot_password" className={classes.forgotLink}>
                            Forgot your password?
                        </Link>
                        <br />
                        <br />
                        <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                            Login
                        </Button>
                    </Box>
                </form>
                <br />
                <hr />
                <br />
                <Typography align="center">Or Login With</Typography>
                <br />
                <Box align="center" component="section" className={classes.socialBtn}>
                    <FacebookLogin appId="498187324725364" autoLoad={false} fields="name,email,picture" callback={responseFacebook} buttonSize="small" />
                    <br />
                    <br />
                    <GoogleLogin
                        clientId="1070492734045-9skeg6djskrb3moo2ibgmg35j33ecsh6.apps.googleusercontent.com"
                        buttonText="Login with google"
                        onSuccess={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                    />
                </Box>
            </CFcard>
        </Container>
    );
}

export default Login;
