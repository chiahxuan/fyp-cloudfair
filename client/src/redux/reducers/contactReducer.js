import ACTIONS from "../actions";

const initialState = {
    contacts: [],
};

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_CONTACT:
            return {
                ...state,
                contacts: action.payload,
            };

        default:
            return state;
    }
};
export default contactReducer;
