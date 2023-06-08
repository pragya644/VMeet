import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsActions";
import store from "../store/store";
import { updateDirectChatHistoryIfActive } from "../shared/utils/chat";
import * as roomHandler from "./roomHandler";
import * as webRTCHandler from "./webRTCHandler";

// initialize socket to null
let socket = null;

// here fetch the user jwt token and pass that configuration to our connection.
export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  // auth is additional info sent to server
  socket = io("http://localhost:5000", {
    auth: {
      token: jwtToken,
    },
  });
  // at server side we validate the token if its valid or not.
  socket.on("connect", () => {
    console.log("succesfully connected with socket.io server");
    console.log(socket.id);
  });

  // listen for custom events.Event emitters are made here
  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  // here get friends from db
  socket.on("friends-list", (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });

  // here we send object so we can enter more data that we want
  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on("direct-chat-history", (data) => {
    console.log(data);
    updateDirectChatHistoryIfActive(data);
  });



socket.on("room-create", (data) => {
  roomHandler.newRoomCreated(data);
});

socket.on("active-rooms", (data) => {
  roomHandler.updateActiveRooms(data);
});

socket.on("conn-prepare", (data) => {
  console.log(data); 
  const { connUserSocketId } = data;
  webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
  socket.emit("conn-init", { connUserSocketId: connUserSocketId });
});

socket.on("conn-init", (data) => {
  const { connUserSocketId } = data;
  webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
});

socket.on("conn-signal", (data) => {
  webRTCHandler.handleSignalingData(data);
});

socket.on("room-participant-left", (data) => {
  console.log("user left room");
  webRTCHandler.handleParticipantLeftRoom(data);
});
};

export const sendDirectMessage = (data) => {
console.log(data);
socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
socket.emit("direct-chat-history", data);
};

export const createNewRoom = () => {
socket.emit("room-create");
};

export const joinRoom = (data) => {
socket.emit("room-join", data);
};

export const leaveRoom = (data) => {
socket.emit("room-leave", data);
};

export const signalPeerData = (data) => {
socket.emit("conn-signal", data);
};
