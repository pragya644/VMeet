// it checks token in socket request sent from client.
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token;
  //if object specified  then we fetch token and decode it 
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    socket.user = decoded;
  } catch (err) {
    const socketError = new Error("NOT_AUTHORIZED");
    return next(socketError);
  }

  // by next it go to custom handler we create
  next();
};

module.exports = verifyTokenSocket;
