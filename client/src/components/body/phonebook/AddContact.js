import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import CFcard from "../../components/CFcard";
import { Typography, Button, Container, TextField } from "@material-ui/core";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";
import { Link } from "react-router-dom";

const initialState = {
    cname: "",
    cnumber: "",

    err: "",
    success: "",
};

function AddContact() {
    const [data, setData] = useState(initialState);
    const { cname, cnumber, err, success } = data;
    const token = useSelector((state) => state.token);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: "", success: "" });
    };

    const createNewContact = async () => {
        try {
            const res = await axios.post(
                "/phonebook/add_contact",
                {
                    name: cname,
                    number: cnumber,
                },
                {
                    headers: { Authorization: token },
                }
            );

            console.log(cname, cnumber);
            setData({ ...data, err: "", success: res.data.msg });
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: "" });
        }
    };

    return (
        <Container maxWidth="sm">
            <CFcard>
                <Typography align="center" variant="h1">
                    View All Contact
                </Typography>
                <br />
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <br />
                <form>
                    <TextField
                        name="cname"
                        id="cname"
                        margin="dense"
                        label="Contact Name"
                        placeholder="Contact Name"
                        defaultValue={cname}
                        onChange={handleChange}
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
                        name="cnumber"
                        id="cnumber"
                        margin="dense"
                        label="Contact Number"
                        placeholder="Contact Number"
                        defaultValue={cnumber}
                        onChange={handleChange}
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </form>
                <br />
                <Button type="submit" variant="contained" onClick={createNewContact}>
                    Create
                </Button>
                <Button component={Link} to="/phonebook/view_all_contact" style={{ marginLeft: "20px" }}>
                    View All
                </Button>
            </CFcard>
        </Container>
    );
}

export default AddContact;
