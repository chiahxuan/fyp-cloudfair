import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Container, Typography } from "@material-ui/core";
import CFcard from "../../components/CFcard";

import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isEmpty, isEmail, isLength, isMatch } from "../../utils/validation/Validation";

const initialState = {
    name: "",
    email: "",
    password: "",
    cf_password: "",
    err: "",
    success: "",
};

const useStyles = makeStyles((theme) => ({
    login_page: {
        maxWidth: "500px",
        maxwidth: "100%",
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
    loginLink: {
        paddingLeft: "20px",
    },
    signupBtn: {
        paddingRight: "8px",
    },
}));

function Register() {
    const classes = useStyles();

    const [user, setUser] = useState(initialState);
    const { name, email, password, cf_password, err, success } = user;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: "", success });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEmpty(name) || isEmpty(password)) return setUser({ ...user, err: "Please fill in all fields.", success: "" });

        if (!isEmail(email)) return setUser({ ...user, err: "Invalid emails.", success: "" });

        if (isLength(password)) return setUser({ ...user, err: "Password must be at least 6 characters.", success: "" });

        if (!isMatch(password, cf_password)) return setUser({ ...user, err: "Password did not match.", success: "" });

        try {
            const res = await axios.post("user/register", {
                name,
                email,
                password,
            });

            setUser({ ...user, err: "", success: res.data.msg });
        } catch (err) {
            err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: "" });
        }
    };

    return (
        <Container maxWidth="sm">
            <CFcard>
                <br />
                <Typography variant="h1" align="center">
                    Register
                </Typography>
                <br />
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Full Name"
                            placeholder="Name"
                            margin="dense"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            defaultValue={name}
                            onChange={handleChangeInput}
                        />
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email Address"
                            placeholder="Email Address"
                            margin="dense"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            defaultValue={name}
                            onChange={handleChangeInput}
                        />
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
                            defaultValue={password}
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
                            defaultValue={cf_password}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <br />
                    <div>
                        <Button type="submit" variant="contained" color="primary">
                            <div className={classes.signupBtn}>
                                <i className="fas fa-envelope"></i>
                            </div>
                            Sign up with email
                        </Button>
                        <Link to="/login" className={classes.loginLink}>
                            Already have an account?
                        </Link>
                    </div>
                </form>
            </CFcard>
        </Container>
    );
}

export default Register;
