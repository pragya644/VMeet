import React from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { connect } from "react-redux";

// const DUMMY_FRIENDS = [
//   {
//     id: 1,
//     username: "Saksham",
//     isOnline: true,
//   },
//   {
//     id: 2,
//     username: "Pragya",
//     isOnline: false,
//   },
//   {
//     id: 3,
//     username: "Priyanshi",
//     isOnline: false,
//   },
// ];

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

// here we get all online friends
const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  friends.forEach((f) => {
    const isUserOnline = onlineUsers.find((user) => user.userId === f.id);
    f.isOnline = isUserOnline ? true : false;
  });

  return friends;
};
const FriendsList = ({ friends, onlineUsers }) => {
  return (
    <MainContainer>
      {/* {DUMMY_FRIENDS.map((f) => (
        // for each friend render friendlist item
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))} */}
      {/* here first check if id of friends same as onlineusers then he is online */}
        {checkOnlineUsers(friends, onlineUsers).map((f) => (
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export default connect(mapStoreStateToProps)(FriendsList);
