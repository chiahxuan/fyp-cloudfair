import ACTIONS from "./index";
import axios from "axios";

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
