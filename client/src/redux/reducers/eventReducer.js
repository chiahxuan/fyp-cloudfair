import ACTIONS from "../actions";

const initialState = {
    event: "",
    events: [],
    hasEvent: false,
    isEventHost: false,
    isVendor: false,
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_USER_EVENTS:
            return {
                ...state,
                events: action.payload,
                hasEvent: !action.payload[0] ? false : true,
            };
        case ACTIONS.GET_ALL_EVENTS:
            return {
                ...state,
                events: action.payload,
            };
        case ACTIONS.SET_SINGLE_EVENT:
            return {
                ...state,
                event: action.payload,
                hasEvent: true,
                isEventHost: action.isEventHost,
            };
        case ACTIONS.GET_SINGLE_EVENT:
            return {
                ...state,
                event: action.payload,
                hasEvent: true,
                isEventHost: action.isEventHost,
            };
        case ACTIONS.GET_IS_EVENT_HOST:
            return {
                ...state,
                event: action.payload,
                hasEvent: true,
            };
        default:
            return state;
    }
};
export default eventReducer;
