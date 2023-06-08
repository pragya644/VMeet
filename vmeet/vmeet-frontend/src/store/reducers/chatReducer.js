import { chatActions } from "../actions/chatActions";

const initState = {
  chosenChatDetails: null,
  chatType: null,
  messages: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case chatActions.SET_CHOSEN_CHAT_DETAILS:
      return {
        ...state,
        chosenChatDetails: action.chatDetails,
        chatType: action.chatType,
        messages: [],  //intially it is empty because we will add some logic to fetch them from our server
      };
    case chatActions.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};

export default reducer;
