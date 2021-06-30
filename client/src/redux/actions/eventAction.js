import ACTIONS from "./index";
import axios from "axios";

//FETCH EVENTS BY USER_ID
export const fetchAllEventsByUserId = async (token) => {
    const res = await axios.get("/event/all_events", {
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

// export const fetchSingleEvent = async (token) => {
//     const res = await axios.get(`event/:eslug`, {
//         type: ACTIONS.GET_SINGLE_EVENT,
//         payload: res.data,
//     });
// };

// //SET SINGLE EVENT BY ESLUG
export const setSingleEventParam = (param) => {
    return {
        type: ACTIONS.SET_SINGLE_EVENT,
        payload: {
            event: param,
        },
    };
};

/////////////////////////////////////////////////////////////////////////////////////////////
//FETCH ALL HOSTED EVENTS
// export const fetchAllEvents = async (token) => {
//     const res = await axios.get("/event/all_events", {
//         headers: { Authorization: token },
//     });
//     return res;
// };

// export const dispatchGetAllEvents = (res) => {
//     return {
//         type: ACTIONS.GET_ALL_EVENTS,
//         payload: res.data,
//     };
// };

export const addEvent = (formData, history) => async (dispatch, getState) => {
    // dispatch({
    //     type: ACTIONS.GET_USER,
    //     payload: { me: { ...getState().auth.me } },
    // });
    // try {
    //     const options = attachTokenToHeaders(getState);
    //     const response = await axios.post("/api/events", formData, options);
    //     console.log(response);
    //     dispatch({
    //         type: ACTIONS.ADD_EVENT_SUCCESS,
    //         payload: { event: response.data.event },
    //     });
    //     history.push("/");
    // } catch (err) {
    //     console.log(err.response);
    //     dispatch({
    //         type: ACTIONS.ADD_EVENT_FAIL,
    //         payload: { error: err?.response?.data.event || err.event },
    //     });
    // }
};
