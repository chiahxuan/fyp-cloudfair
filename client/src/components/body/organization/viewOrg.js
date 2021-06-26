import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { fetchAllUsers, dispatchGetAllUsers } from "../../../redux/actions/usersAction";
import { dispatchGetOrganization, fetchOrganization } from "../../../redux/actions/organizationAction";
import { dispatchLogin, fetchUser, dispatchGetUser } from "../../../redux/actions/authAction";

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
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const auth = useSelector((state) => state.auth);
    const organization = useSelector((state) => state.organization);
    const { id, organizationName } = organization;
    const { user, isAdmin } = auth;

    // ASSIGN ORGANIZATION DATA TO VARIABLE
    const organizationData = organization.organization;
    //check console.log for structure
    // console.log(organizationData);

    // DISPATCH DATA FROM res.data, update the state of organization
    // organization contains all organization information.
    useEffect(() => {
        if (token) {
            const getOrganization = () => {
                return fetchOrganization(token).then((res) => {
                    dispatch(dispatchGetOrganization(res));
                });
            };
            getOrganization();
        }
    }, [token, dispatch]);

    // useEffect(() => {
    //     if (token) {
    //         const getUser = () => {
    //             dispatch(dispatchLogin());

    //             return fetchUser(token).then((res) => {
    //                 dispatch(dispatchGetOrganization(res));
    //             });
    //         };
    //         getUser();
    //     }
    // }, [token, dispatch]);

    // const [data, setData] = useState(initialState);
    // // const { name, password, cf_password, err, success } = data;
    // const { orgName, orgEmail, orgAbout, err, success, LoggedUserId } = data;
    // // const dispatchOrg = useDispatch();
    // const [callback, setCallback] = useState(false);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     if (isAdmin) {
    //         fetchAllUsers(token).then((res) => {
    //             dispatch(dispatchGetAllUsers(res));
    //         });
    //     }
    // }, [token, isAdmin, dispatch, callback]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setData({ ...data, [name]: value, err: "", success: "" });
    // };

    return (
        <Container maxWidth="md">
            <CFcard>
                <br />
                <Typography variant="h2">Organization Profile</Typography>
                <Typography variant="h2">Organization Name here: {organizationData.organizationName}</Typography>
                <br />

                <Button component={Link} to="/organization/edit">
                    Edit Organization
                </Button>

                <div>
                    Your upcoming events{" "}
                    <Button component={Link} to="/event/add_event">
                        Add Event
                    </Button>
                </div>

                <Button component={Link} to="/organization/team">
                    Teams
                </Button>
            </CFcard>
        </Container>
    );
}

export default CreateOrg;
