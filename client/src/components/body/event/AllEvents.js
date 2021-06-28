import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { isEmpty, isLength, isValidDescription, isValidString, isValidDateTime } from "../../utils/validation/Validation";
import { dispatchGetOrganization, fetchOrganization } from "../../../redux/actions/organizationAction";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Container, TextField, Card, CardContent } from "@material-ui/core";
import CFcard from "../../components/CFcard";

function AllEvents() {
    return (
        <Container>
            <CFcard>All Events here</CFcard>{" "}
        </Container>
    );
}

export default AllEvents;
