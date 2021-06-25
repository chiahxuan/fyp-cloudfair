import ACTIONS from "./index";
import axios from "axios";

export const fetchOrganization = async (token) => {
    const res = await axios.get("/organization/overview", {
        headers: { Authorization: token },
    });
    return res;
};

export const dispatchGetOrganization = (res) => {
    return {
        type: ACTIONS.GET_ORGANIZATION,
        payload: {
            organization: res.data[0],
            isCreated: !res.organization ? true : false,
        },
    };
};
