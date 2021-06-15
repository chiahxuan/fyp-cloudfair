import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    main: {
        marginTop: "4rem",
    }
}));

export default function DefaultTemplate(props: React.PropsWithChildren<React.ReactNode>) {
    const classes = useStyles();
    return (
        <>
            <Header></Header>
            <div className={classes.main}></div>
            <Footer></Footer>
        </>
    );
}
