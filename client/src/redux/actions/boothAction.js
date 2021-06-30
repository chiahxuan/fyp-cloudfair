import ACTIONS from "./index";
import axios from "axios";

//FETCH EVENTS BY USER_ID
export const fetchBooth = async (token, eslug) => {
    const res = await axios.get(`/event/${eslug}/booth/all`, {
        headers: { Authorization: token },
    });

    return res;
};

export const dispatchEventBooths = (res) => {
    // console.log(res);
    return {
        type: ACTIONS.GET_ALL_EVENT_BOOTHS,
        payload: res.data,
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
