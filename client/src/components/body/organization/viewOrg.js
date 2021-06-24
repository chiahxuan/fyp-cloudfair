import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { fetchAllUsers, dispatchGetAllUsers } from "../../../redux/actions/usersAction";

import { Typography, Button, Container, TextField, Card, CardContent } from "@material-ui/core";
import CFcard from "../../components/CFcard";

const initialState = {
    orgName: "",
    orgEmail: "",
    orgAbout: "",
    err: "",
    success: "",
    createId: "",
};

function CreateOrg() {
    const auth = useSelector((state) => state.auth);
    const token = useSelector((state) => state.token);

    const { user, isAdmin } = auth;
    const [data, setData] = useState(initialState);
    // const { name, password, cf_password, err, success } = data;
    const { orgName, orgEmail, orgAbout, err, success, LoggedUserId } = data;

    // const [avatar, setAvatar] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isAdmin) {
            fetchAllUsers(token).then((res) => {
                dispatch(dispatchGetAllUsers(res));
            });
        }
    }, [token, isAdmin, dispatch, callback]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
    };

    return (
        <Container maxWidth="md">
            <CFcard>
                <br />
                <Typography variant="h2">Organization Profile</Typography>
                <br />
                <TextField
                    id="orgName"
                    margin="dense"
                    label="Organization Name"
                    name="orgName"
                    value={orgName}
                    onChange={handleChange}
                    placeholder="Organization Name"
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
                    id="orgEmail"
                    name="orgEmail"
                    value={orgEmail}
                    margin="dense"
                    label="Organization Email"
                    onChange={handleChange}
                    placeholder="Organization Email"
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
                    id="orgAbout"
                    name="orgAbout"
                    value={orgAbout}
                    margin="dense"
                    label="Organization About"
                    onChange={handleChange}
                    placeholder="Organization About"
                    required
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    multiline
                    rows={3}
                    rowsMax={4}
                />
                <br />
            </CFcard>
        </Container>
    );
}

export default CreateOrg;
