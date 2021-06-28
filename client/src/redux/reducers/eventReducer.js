import ACTIONS from "../actions";

const initialState = {
    event: "",
    eventHosting: false,
    events: [],
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_USER_EVENTS:
            return {
                ...state,
                events: action.payload,
                // isCreated: true,
            };
        case ACTIONS.GET_ALL_EVENTS:
            return {
                ...state,
                organization: action.payload.organization, //define data
                // isCreated: true,
            };
        default:
            return state;
    }
};
export default eventReducer;
