import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { fetchAllUsers, dispatchGetAllUsers } from "../../../redux/actions/usersAction";
import { isValidDescription, isValidString, isEmpty } from "../../utils/validation/Validation";

import { Typography, Button, Container, TextField } from "@material-ui/core";
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
    const { orgName, orgEmail, orgAbout, err, success } = data;
    const [callback] = useState(false);
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

    const createNewOrg = async () => {
        try {
            if (isEmpty(orgName) || isEmpty(orgEmail) || isEmpty(orgAbout)) return setData({ ...user, err: "Please fill in all fields.", success: "" });

            if (isValidString(orgName)) return setData({ ...data, err: "String input must be at least 3 to 50 characters.", success: "" });
            if (isValidDescription(orgAbout)) return setData({ ...data, err: "String input must be at least 3 to 2000 characters.", success: "" });

            const res = await axios.post(
                "/organization/new",
                {
                    orgName: orgName,
                    orgEmail: orgEmail,
                    orgAbout: orgAbout,
                    LoggedUserId: user._id,
                },
                {
                    headers: { Authorization: token },
                }
            );
            localStorage.setItem("orgCreated", true);
            window.location.href = `http://localhost:3000/organization/overview`;
            // setData({ ...data, err: "", success: "Create Success!" });
            setData({ ...user, err: "", success: res.data.msg });
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    return (
        <Container maxWidth="sm">
            <CFcard>
                <Typography variant="h2">Create a new organization! </Typography>
                <br />
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <form>
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
                        rows={8}
                        rowsMax={10}
                    />
                </form>
                <br />
                <Button type="submit" variant="contained" onClick={createNewOrg}>
                    Create
                </Button>
            </CFcard>
        </Container>
    );
}

export default CreateOrg;
