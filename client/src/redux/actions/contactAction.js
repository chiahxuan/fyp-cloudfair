import ACTIONS from "./index";
import axios from "axios";

export const fetchAllContact = async (token) => {
    const res = await axios.get("/phonebook/view_all_contact", {
        headers: { Authorization: token },
    });
    return res;
};

export const dispatchAllContact = (res) => {
    return {
        type: ACTIONS.GET_ALL_CONTACT,
        payload: res.data,
    };
};
