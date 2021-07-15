import ACTIONS from "./index";
import axios from "axios";

//FETCH EVENTS BY USER_ID
export const fetchAllEventsByUserId = async (token) => {
    const res = await axios.get("/event/user_events", {
        headers: { Authorization: token },
    });
    return res;
};

export const dispatchGetAllUserEvents = (res) => {
    return {
        type: ACTIONS.GET_ALL_USER_EVENTS,
        payload: res.data,
    };
};

//FETCH ALL EVENTS
export const fetchAllEvents = async (token) => {
    const res = await axios.get("/event/all_events", {
        headers: { Authorization: token },
    });
    return res;
};

export const dispatchGetAllEvents = (res) => {
    return {
        type: ACTIONS.GET_ALL_EVENTS,
        payload: res.data,
    };
};

// //SET SINGLE EVENT BY ESLUG
export const setSingleEventParam = (param) => {
    return {
        type: ACTIONS.SET_SINGLE_EVENT,
        payload: {
            event: param,
        },
    };
};

//GET EVENT INFORMATION
export const fetchSingleEvent = async (eslug, token) => {
    const res = await axios.get(`${eslug}`, {
        headers: { Authorization: token },
    });
    return res;
};

export const dispatchGetSingleEvent = (res, userId) => {
    return {
        type: ACTIONS.GET_SINGLE_EVENT,
        payload: res.data[0],
        isEventHost: res.data[0].user === userId ? true : false,
        // !res.data[0] ? false : true,
        // isAdmin: res.data.role === 1 ? true : false,
    };
};

// CHECK USER ROLE WITH EVENT
export const fetchEventHostStatus = async (eslug, token, userId, organizationId) => {
    const res = await axios.get(`${eslug}/checkEventHost`, {
        headers: { Authorization: token },
    });
    return res;
};

export const dispatchEventHostStatus = (res) => {
    return {
        type: ACTIONS.GET_IS_EVENT_HOST,
        payload: res.data[0],
    };
};
