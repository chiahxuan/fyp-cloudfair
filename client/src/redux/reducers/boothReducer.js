import ACTIONS from "../actions";

const initialState = {
    booth: "",
    booths: [],
    isVendorOwner: false,
    hasOwnedBooth: false,
    boothOrg: "",
};

const boothReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_EVENT_BOOTHS:
            return {
                ...state,
                booths: action.payload,
                hasOwnedBooth: action.hasOwnedBooth,
                booth: action.booth,
            };
        case ACTIONS.GET_SINGLE_BOOTH:
            return {
                ...state,
                booth: action.payload,
                isVendorOwner: action.isVendorOwner,
                hasOwnedBooth: true,
            };

        case ACTIONS.GET_SINGLE_BOOTH_ORG:
            return {
                ...state,
                boothOrg: action.payload,
            };
        case ACTIONS.ADD_BOOTH:
            return {
                ...state,
                booth: action.payload,
                isVendorOwner: action.isVendorOwner,
                hasOwnedBooth: true,
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
