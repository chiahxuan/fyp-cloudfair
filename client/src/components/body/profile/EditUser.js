import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";

//User Interface Imports
import { Typography, Button, Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CFcard from "../../components/CFcard";

const useStyles = makeStyles((theme) => ({}));

function EditUser() {
    const { id } = useParams();
    const history = useHistory();
    const [editUser, setEditUser] = useState([]);

    const users = useSelector((state) => state.users);
    const token = useSelector((state) => state.token);

    const [checkAdmin, setCheckAdmin] = useState(false);
    const [err, setErr] = useState(false);
    const [success, setSuccess] = useState(false);
    const [num, setNum] = useState(0);

    //user interface variables
    const classes = useStyles();
    useEffect(() => {
        if (users.length !== 0) {
            users.forEach((user) => {
                if (user._id === id) {
                    setEditUser(user);
                    setCheckAdmin(user.role === 1 ? true : false);
                }
            });
        } else {
            history.push("/profile");
        }
    }, [users, id, history]);

    const handleUpdate = async () => {
        try {
            if (num % 2 !== 0) {
                const res = await axios.patch(
                    `/user/update_role/${editUser._id}`,
                    {
                        role: checkAdmin ? 1 : 0,
                    },
                    {
                        headers: { Authorization: token },
                    }
                );

                setSuccess(res.data.msg);
                setNum(0);
            }
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    };

    const handleCheck = () => {
        setSuccess("");
        setErr("");
        setCheckAdmin(!checkAdmin);
        setNum(num + 1);
    };

    return (
        <div className="profile_page edit_user">
            <CFcard>
                <div className="row">
                    <Button onClick={() => history.goBack()}>
                        <ArrowBackIcon /> Go Back
                    </Button>
                </div>

                <div className="col-left">
                    <h2>Edit User</h2>

                    <TextField
                        name="name"
                        label="Full Name"
                        value={editUser.name}
                        margin="dense"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        variant="outlined"
                    />

                    <TextField
                        id="email"
                        name="email"
                        label="Email Address"
                        margin="dense"
                        fullWidth
                        disabled
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={editUser.email}
                    />

                    <div className="form-group">
                        <input type="checkbox" id="isAdmin" checked={checkAdmin} onChange={handleCheck} />
                        <label htmlFor="isAdmin">isAdmin</label>
                    </div>

                    <Button onClick={handleUpdate}>Update</Button>

                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                </div>
            </CFcard>
        </div>
    );
}

export default EditUser;
