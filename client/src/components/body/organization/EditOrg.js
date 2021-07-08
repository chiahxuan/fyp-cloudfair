import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isEmpty, isLength, isValidDescription, isValidString, isValidDateTime, isInValidDate } from "../../utils/validation/Validation";

import { fetchAllUsers, dispatchGetAllUsers } from "../../../redux/actions/usersAction";
import { dispatchGetOrganization, fetchOrganization } from "../../../redux/actions/organizationAction";
import { dispatchLogin, fetchUser, dispatchGetUser } from "../../../redux/actions/authAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Grid } from "@material-ui/core";
import CFcard from "../../components/CFcard";

const initialState = {
    orgName: "",
    orgEmail: "",
    orgAbout: "",
    err: "",
    success: "",
    createId: "",
};
// import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
    },
    bgImage: {
        align: "center",
        // width: "100%",
        height: 300,
        marginLeft: "auto",
        marginRight: "auto",
    },
    button: {
        width: 200,
    },
}));

function EditOrg() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);

    const organization = useSelector((state) => state.organization.organization);

    const [data, setData] = useState(initialState);
    const { orgName, orgEmail, orgAbout, orgImage, err, success, createId } = data;

    //HANDLE CHANGE OF DATA BY USING USESTATE
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
    };

    //HANDLE CHANGE OF IMAGE
    const [loading, setLoading] = useState(false);
    const [bgImage, setBgImage] = useState(false); // background Image
    const [callback, setCallback] = useState(false);

    const changeBgImage = async (e) => {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            if (!file) return setData({ ...data, err: "No files were uploaded.", success: "" });
            if (file.size > 1024 * 1024) return setData({ ...data, err: "Size too large.", success: "" });
            if (file.type !== "image/jpeg" && file.type !== "image/png") return setData({ ...data, err: "File format is incorrect.", success: "" });
            let formData = new FormData();
            formData.append("file", file);
            setLoading(true);
            const res = await axios.post("/api/upload_avatar", formData, {
                headers: { "content-type": "multipart/form-data", Authorization: token },
            });

            setLoading(false);
            setBgImage(res.data.url);
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    //UPDATE ORGANIZATION INFORMATION
    const updateOrganization = () => {
        try {
            axios.patch(
                `/organization/edit_organization`,
                {
                    organizationName: orgName ? orgName : organization.organizationName,
                    organizationAbout: orgAbout ? orgAbout : organization.organizationAbout,
                    organizationEmail: orgEmail ? orgEmail : organization.organizationEmail,
                    organizationBackground: bgImage ? bgImage : organization.organizationBackground,
                },
                {
                    headers: { Authorization: token },
                }
            );
            setData({ ...data, err: "", success: "Updated Success!" });
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    const deleteOrganization = async () => {
        try {
            // ADD VALIDATE EVENT HOST
            if (window.confirm("Are you sure you want to delete this organization? All Events and booths will be deleted")) {
                setLoading(true);
                await axios.delete(`/organization/delete_organization`, {
                    headers: { Authorization: token },
                });
                setLoading(false);
                setCallback(!callback);
                // history.push(`/event/${eslug}/booth/all`);
                window.location.href = `http://localhost:3000/organization/new`;
            }
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    return (
        <Container maxWidth="md">
            <CFcard>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <br />
                <form onSubmit={updateOrganization}>
                    <Grid container spacing={8}>
                        <Grid item xs={12} align="center">
                            <img
                                className={classes.bgImage}
                                src={
                                    bgImage
                                        ? bgImage
                                        : organization.organizationBackground || "https://res.cloudinary.com/cloudfair/image/upload/v1624353682/avatar/organization.png"
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Organization Name: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                required
                                id="orgName"
                                name="orgName"
                                label="Organization Name"
                                defaultValue={organization.organizationName}
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Organization Description: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                required
                                id="orgAbout"
                                name="orgAbout"
                                label="Organization Description"
                                defaultValue={organization.organizationAbout}
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Organization Email: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                required
                                id="orgAbout"
                                name="orgAbout"
                                label="Organization Description"
                                defaultValue={organization.organizationEmail}
                                margin="dense"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4">Organization Background: </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <input type="file" name="file" id="file_up" onChange={changeBgImage} />
                        </Grid>
                    </Grid>
                </form>
                <br />
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <Button component={Link} to="/organization/OVERVIEW" className={classes.button}>
                            Back to Overview
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button disabled={loading} className={classes.button} onClick={updateOrganization}>
                            Update
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button disabled={loading} className={classes.button} onClick={deleteOrganization}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </CFcard>
        </Container>
    );
}

export default EditOrg;
