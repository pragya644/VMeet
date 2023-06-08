import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers,legacy_createStore as createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import alertReducer from "./reducers/alertReducer";
import friendsReducer from "./reducers/friendsReducer"
import chatReducer from "./reducers/chatReducer";
import roomReducer from "./reducers/roomReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  friends: friendsReducer,
  chat: chatReducer,
  room: roomReducer,
});

// create store which will combine all reducers we create in our app
const store = createStore(
  rootReducer,
//   it allow us to make async calls in our redux actions.
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
