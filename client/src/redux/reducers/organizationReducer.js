import ACTIONS from "../actions/";

const initialState = {
    organization: "",
    hasOrganization: false,
};

const orgReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.CREATE_ORGANIZATION:
            return {
                ...state,
                organization: action.payload.organization, //define data
                hasOrganization: true,
            };
        case ACTIONS.GET_ORGANIZATION:
            console.log(action.payload.organization);
            return {
                ...state,
                organization: action.payload.organization, //define data
                hasOrganization: !action.payload.organization ? false : true,
            };
        default:
            return state;
    }
};
export default orgReducer;
