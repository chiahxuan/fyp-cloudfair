import ACTIONS from "../actions/";

const initialState = {
    organization: "",
    isCreated: false,
};

const orgReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.CREATE_ORGANIZATION:
            return {
                ...state,
                isCreated: true,
            };
        case ACTIONS.GET_ORGANIZATION:
            return {
                ...state,
                organization: action.payload.organization, //define data
                isCreated: true,
            };
        default:
            return state;
    }
};
export default orgReducer;
