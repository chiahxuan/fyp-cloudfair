import ACTIONS from "./index";
import axios from "axios";

//FETCH ALL BOOTH BASED ON SLUG
export const fetchBooth = async (token, eslug) => {
    const res = await axios.get(`/event/${eslug}/booth/all`, {
        headers: { Authorization: token },
    });

    return res;
};

// DISPATCH ALL BOOTHS FOR EVENTS
export const dispatchEventBooths = (res) => {
    return {
        type: ACTIONS.GET_ALL_EVENT_BOOTHS,
        payload: res.data,
    };
};

//FETCH SINGLE BOOTH BASED ON BSLUG
export const fetchSingleBooth = async (token, eslug, bslug) => {
    const res = await axios.get(`/event/${eslug}/booth/${bslug}`, {
        headers: { Authorization: token },
    });
    return res;
};

//DISPATCH SINGLE BOOTH
export const dispatchSingleBooth = (res, userId) => {
    console.log(res);
    console.log(res.data);
    console.log(userId);
    return {
        type: ACTIONS.GET_SINGLE_BOOTH,
        payload: res.data,
        isVendorOwner: res.data.user == userId ? true : false,
    };
};

// //SET SINGLE EVENT BY ESLUG
export const setSingleBoothParam = (param) => {
    return {
        type: ACTIONS.SET_SINGLE_BOOTH,
        payload: {
            event: param,
        },
    };
};
