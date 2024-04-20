import { combineReducers } from "redux";
import userSlice from "./slices/userSlice";
import batchSlice from "../containers/DippingParameters/batchSlice";

const mainReducer = combineReducers({
  userState: userSlice,
  batchState: batchSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return mainReducer(state, action);
};

export default rootReducer;
