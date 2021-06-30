import ACTIONS from "../actions";

const initialState = {
    booth: "",
    booths: [],
};

const boothReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_EVENT_BOOTHS:
            return {
                ...state,
                booths: action.payload,
            };
        // case ACTIONS.GET_SINGLE_booth:
        //     return {
        //         booth: action.payload,
        //     };

        default:
            return state;
    }
};
export default boothReducer;
