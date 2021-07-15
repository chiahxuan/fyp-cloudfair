import ACTIONS from "./index";
import axios from "axios";

//FETCH ALL BOOTH BASED ON SLUG
export const fetchBooth = async (token, eslug, user) => {
    const res = await axios.get(`/event/${eslug}/booth/all`, {
        headers: { Authorization: token },
    });

    return res;
};

// DISPATCH ALL BOOTHS FOR EVENTS
export const dispatchEventBooths = (res, userId) => {
    const events = res.data;
    var hasOwnedBooth = false;
    var ownedBooth = "";

    for (let i = 0; i < events.length; i++) {
        if (events[i].user === userId) {
            hasOwnedBooth = true;
            ownedBooth = events[i];
            break;
        }
    }

    return {
        type: ACTIONS.GET_ALL_EVENT_BOOTHS,
        payload: res.data,
        hasOwnedBooth: hasOwnedBooth,
        booth: ownedBooth,
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
    return {
        type: ACTIONS.GET_SINGLE_BOOTH,
        payload: res.data,
        isVendorOwner: res.data.user === userId ? true : false,
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

//fetchBoothOrganizer, dispatchBoothOrganizer

//FETCH BOOTH ORGANIZERS
export const fetchBoothOrganizer = async (token, eslug, bslug) => {
    const res = await axios.get(`/event/${eslug}/booth/${bslug}/org`, {
        headers: { Authorization: token },
    });
    return res;
};

//DISPATCH BOOTH ORGANIZERS
export const dispatchBoothOrganizer = (res) => {
    return {
        type: ACTIONS.GET_SINGLE_BOOTH_ORG,
        payload: res.data,
    };
};
