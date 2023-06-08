const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;

  // get user if from req.user ie jwt token
  const { userId, mail } = req.user;

  // check if friend that we would like to invite is not user

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res
      .status(409)
      .send("Sorry. You cannot become friend with yourself");
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `${targetMailAddress} not found. Please check Email address.`
      );
  }

  // check if invitation has been already sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id, //to whom we need to send
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send("Invitation has been already sent");
  }

  // if user already friend
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  // check if already invited
  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send("Friend already added. Please check friends list");
  }

  // save invitation in db after it pass our custom validations
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // if invtiation has been successfully created we would like to update friends invitations if other user is online

  // send pending invitations update to specific user.every socket of the id will receive the updates.
  friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).send("Invitation has been sent");
};

module.exports = postInvite;
