import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import axios from "axios";

import "@fontsource/roboto";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, List, ListItem, ListItemText, ListItemIcon, CssBaseline, Drawer, Divider } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EventIcon from "@material-ui/icons/Event";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupIcon from "@material-ui/icons/Group";
// import { auth } from "googleapis/build/src/apis/abusiveexperiencereport";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: 50,
        [theme.breakpoints.up("sm")]: {
            width: 56,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    toolbarRight: {
        display: "flex",
        alignItems: "center",
    },

    DrawerToolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

    title: {
        marginLeft: 16,
        flexGrow: 1,
        color: "#2c3242",
    },

    signinLink: {
        textDecoration: "none",
        paddingLeft: "10px",
    },

    menuButton: {
        margin: 0,
    },
    title: {
        marginLeft: 16,
    },
    toolBarBtn: {
        marginRight: 16,
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
    const theme = useTheme();

    //USER AUTHENTICATION
    const auth = useSelector((state) => state.auth);
    const { user, isLogged } = auth;
    const [open, setOpen] = React.useState(false);

    //HANDLE DRAWER
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
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
                <Button aria-controls="userMenu" aria-haspopup="true" onClick={handleClick} className={classes.toolBarBtn}>
                    {user.name}
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

    const userDrawer = () => {
        return (
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.DrawerToolbar}>
                    <IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}</IconButton>
                </div>
                <Divider />
                <List>
                    {itemsList.map((item, index) => {
                        const { text, icon, link } = item;
                        return (
                            <ListItemLink to={link}>
                                {<ListItemIcon>{icon}</ListItemIcon>}
                                <ListItemText primary={text}></ListItemText>
                            </ListItemLink>
                        );
                    })}
                </List>
                <Divider />
                <List>
                    {itemsList2.map((item, index) => {
                        const { text, icon, link } = item;
                        return (
                            <ListItemLink to={link}>
                                {<ListItemIcon>{icon}</ListItemIcon>}
                                <ListItemText primary={text}></ListItemText>
                            </ListItemLink>
                        );
                    })}
                </List>
            </Drawer>
        );
    };

    function ListItemLink(props) {
        return <ListItem button component={Link} {...props} />;
    }
    const menuIcon = () => {
        return (
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                })}
            >
                <MenuIcon fontSize="small" />
            </IconButton>
        );
    };

    const itemsList = [
        {
            text: "Home",
            icon: <HomeIcon fontSize="small" />,
            link: "/",
        },
        {
            text: "Account",
            icon: <AccountCircleIcon fontSize="small" />,
            link: "/account",
        },
        {
            text: "Profile",
            icon: <ChevronRightIcon fontSize="small" />,
            link: "/profile",
        },
    ];
    const itemsList2 = [
        {
            text: "Organization",
            icon: <GroupIcon fontSize="small" />,
            link: "/organization",
        },
    ];

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className={classes.toolbar}>
                    <div className={classes.toolbarRight}>
                        {isLogged ? menuIcon() : <></>}

                        <Typography variant="h6" noWrap className={classes.title}>
                            CloudFair Logo
                            <img scr={`images/CloudFairLogo.png`}></img>
                        </Typography>
                    </div>

                    {/* SIGN IN BUTTON HERE */}
                    {/* IF (USER LOGGGED IN){DROP DOWN}else{Login } */}
                    {isLogged ? (
                        userLink()
                    ) : (
                        <Button color="secondary" className={classes.toolBarBtn} component={Link} to="/login">
                            <AccountCircleIcon fontSize="small" />
                            <Typography align="left">Log In</Typography>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            {isLogged ? userDrawer() : <></>}
        </div>
    );
}

export default withRouter(Header);
