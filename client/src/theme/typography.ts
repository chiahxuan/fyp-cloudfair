import Breakpoints from "./breakpoint";
import { TypographyOptions } from "@material-ui/core/styles/createTypography";

const typography: TypographyOptions = {
    // fontFamily: [`"Karla"`, `san-serif`].join(","),
    fontSize: 16,
    /*indicate the page name, only one  each page.*/
    h1: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        lineHeight: 1,
    },
    h2: {
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: 1,
    },
    h3: {
        fontSize: "1.5rem",
        fontWeight: 700,
        lineHeight: 1.25,
    },
    h4: {
        fontSize: "1.25rem",
        fontWeight: 700,
        lineHeight: 1.5,
    },
    h5: {
        fontSize: "1rem",
        fontWeight: 700,
        lineHeight: 1.5,
    },
    /*subtitle of h1, text underneath h1*/
    subtitle1: {
        fontSize: "1.5rem",
        lineHeight: 1.125,
        [Breakpoints.up("sm")]: {
            lineHeight: 1,
        },
    },
    /*subtitle of h1, text underneath h2*/
    subtitle2: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        lineHeight: 1.125,
    },
    /*default typography font size*/
    body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
    },
    /*for bolded texts.*/
    body2: {
        fontSize: "1rem",
        lineHeight: 1.5,
        fontWeight: "bold",
    },
    caption: {
        fontSize: "1rem",
        lineHeight: 1.5,
        fontStyle: "italic",
    },
    button: {
        fontSize: "0.75rem",
        [Breakpoints.up("sm")]: {
            fontSize: "1rem",
        },
    },
};

export default typography;
