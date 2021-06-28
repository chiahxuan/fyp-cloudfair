import { combineReducers } from "redux";
import auth from "./authReducer";
import token from "./tokenReducer";
import users from "./usersReducer";
import organization from "./organizationReducer";
import eventReducer from "./eventReducer";

export default combineReducers({
    auth,
    token,
    users,
    organization,
    eventReducer,
});
