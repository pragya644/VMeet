const FriendInvitation = require("../../models/friendInvitation");
const User = require("../../models/user");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;

    // find the invitation in DB
    const invitation = await FriendInvitation.findById(id);

    if (!invitation) {
      return res.status(401).send("Error occured. Please try again");
    }
    // get from invitation in DB
    const { senderId, receiverId } = invitation;

    // add friends to both users
    const senderUser = await User.findById(senderId);
    // assign new friends in friends array
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await User.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];

    // save at sender and receiver
    await senderUser.save();
    await receiverUser.save();

    // delete the invitation we sent 
    await FriendInvitation.findByIdAndDelete(id);

    // Update list of friends if they are online on both sides
    friendsUpdates.updateFriends(senderId.toString());
    friendsUpdates.updateFriends(receiverId.toString());

    // update list of friends pending invitations of receiver as he got invite
    friendsUpdates.updateFriendsPendingInvitations(receiverId.toString());

    return res.status(200).send("Friend successfuly added");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = postAccept;
