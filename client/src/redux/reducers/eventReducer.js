import ACTIONS from "../actions";

const initialState = {
    event: "",
    // eventHosting: false, // single event page only validate
    events: [],
    hasEvent: false,
    isEventHost: false,
    isVendor: false,
};

const eventReducer = (state = initialState, action) => {
    // console.log(action);

    switch (action.type) {
        case ACTIONS.GET_ALL_USER_EVENTS:
            // console.log(action.payload[0]._id);
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
            // console.log(action.payload.event);
            return {
                ...state,
                event: action.payload,
                hasEvent: true,
                isEventHost: action.isEventHost,
            };
        case ACTIONS.GET_SINGLE_EVENT:
            // console.log(action.isEventHost);
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
        // case ACTIONS.SET_SINGLE_EVENT:
        //     return {
        //         event: action.payload,
        //     };
        // case ACTIONS.GET_ALL_EVENTS:
        //     return {
        //         ...state,
        //         organization: action.payload.organization, //define data
        //         // isCreated: true,
        //     };
        default:
            return state;
    }
};
export default eventReducer;
