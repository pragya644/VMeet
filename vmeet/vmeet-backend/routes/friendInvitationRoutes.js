const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const friendInvitationControllers = require("../controllers/friendInvitation/friendInvitationControllers");

// it has target mail which we need to invite
const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});

// to check invitation schema.
const inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

router.post(
  "/invite",
  // auth to check jwt token valid or not.
  auth,
  validator.body(postFriendInvitationSchema),
  friendInvitationControllers.controllers.postInvite
);

// to accept first check jwt token
router.post(
  "/accept",
  auth,
  validator.body(inviteDecisionSchema),
  friendInvitationControllers.controllers.postAccept
);

router.post(
  "/reject",
  auth,
  validator.body(inviteDecisionSchema),
  friendInvitationControllers.controllers.postReject
);

module.exports = router;
