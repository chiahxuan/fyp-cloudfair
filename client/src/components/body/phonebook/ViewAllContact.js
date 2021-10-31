import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import CFcard from "../../components/CFcard";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import { fetchAllContact, dispatchAllContact } from "../../../redux/actions/contactAction";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function ViewAllContact() {
    const auth = useSelector((state) => state.auth);
    const classes = useStyles();
    const [callback] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const contacts = useSelector((state) => state.contactReducer.contacts);
    const [Contacts, setContacts] = React.useState([]);

    useEffect(() => {
        setContacts(contacts);
    }, [contacts]);

    useEffect(() => {
        fetchAllContact(token).then((res) => {
            console.log(res);
            dispatch(dispatchAllContact(res));
        });
    }, [token, dispatch, callback]);

    return (
        <Container maxWidth="md">
            <CFcard>
                <Typography align="center" variant="h1">
                    View All Contact
                </Typography>
                <br />
                <Button component={Link} to="/phonebook/add_contact">
                    Create
                </Button>
                <br />
                <br />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Contact Name</TableCell>
                                <TableCell align="right">Phone Number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Contacts.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.number}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CFcard>
        </Container>
    );
}

export default ViewAllContact;
