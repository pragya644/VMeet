const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdates = require("../../socketHandlers/updates/friends");

const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    // remove the invitation from friend invitations collection. check invitation first if it exists
    const invitationExists = await FriendInvitation.exists({ _id: id });

    if (invitationExists) {
      // find by id and delete
      await FriendInvitation.findByIdAndDelete(id);
    }

    // update pending invitations
    friendsUpdates.updateFriendsPendingInvitations(userId);

    return res.status(200).send("Invitation succesfully rejected");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong please try again");
  }
};

module.exports = postReject;
