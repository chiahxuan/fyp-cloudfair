import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EventIcon from "@material-ui/icons/Event";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import "@fontsource/roboto";
// import { auth } from "googleapis/build/src/apis/abusiveexperiencereport";

import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        margin: "0 auto",
        overflow: "hidden",
    },
    appBar: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        // maxWidth: "1200px",
        // width: "100%",
        margin: "0 auto",
        overflow: "hidden",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        backgroundColor: "#ffffff",
    },
    title: {
        flexGrow: 1,
        color: "#2c3242",
    },
    loginIcon: {
        color: "#2c3242",
        padding: "15px",
    },
    signinLink: {
        textDecoration: "none",
        paddingLeft: "10px",
    },
    menuItemLink: {
        textDecoration: "none",
        color: "#2c3242",
        display: "flex",
    },
    profileName: {
        textDecoration: "none",
    },
}));

const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function Header() {
    const classes = useStyles();

    //USER AUTHENTIATION
    const auth = useSelector((state) => state.auth);
    const { user, isLogged } = auth;

    //HANDLE LOGOUT
    const handleLogout = async () => {
        try {
            await axios.get("/user/logout");
            localStorage.removeItem("firstLogin");
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    };

    //MENU  UI
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const userLink = () => {
        return (
            <div>
                <Button aria-controls="userMenu" aria-haspopup="true" variant="contained" color="primary" onClick={handleClick}>
                    {user.name}
                    {/* Chiah */}
                </Button>
                <StyledMenu id="userMenu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <Link to="/" className={classes.menuItemLink}>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <HomeIcon fontSize="medium" />
                            </ListItemIcon>
                            <ListItemText primary="Home"></ListItemText>
                        </StyledMenuItem>
                    </Link>
                    <Link to="/" className={classes.menuItemLink}>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <EventIcon fontSize="medium" />
                            </ListItemIcon>
                            <ListItemText primary="Events"></ListItemText>
                        </StyledMenuItem>
                    </Link>
                    <Link to="/profile" className={classes.menuItemLink}>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <AccountBoxIcon fontSize="medium" />
                            </ListItemIcon>
                            <ListItemText primary="Profile"></ListItemText>{" "}
                        </StyledMenuItem>
                    </Link>
                    <Link to="/logout" className={classes.menuItemLink} onClick={handleLogout}>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <ExitToAppIcon fontSize="medium" />
                            </ListItemIcon>
                            <ListItemText primary="Logout"></ListItemText>
                        </StyledMenuItem>
                    </Link>
                </StyledMenu>
            </div>
        );
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} align="left">
                        CloudFair Logo
                        <img scr={`images/CloudFairLogo.png`}></img>
                    </Typography>

                    {/* SIGN IN BUTTON HERE */}
                    {isLogged ? (
                        userLink()
                    ) : (
                        <Button color="inherit" className={classes.loginIcon}>
                            <i className="fas fa-user"> </i>
                            <Link to="/login" className={classes.signinLink}>
                                <Typography variant="h6" className={classes.title} align="left">
                                    Log In
                                </Typography>
                            </Link>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
