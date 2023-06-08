const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler");
const roomCreateHandler = require("./socketHandlers/roomCreateHandler");
const roomJoinHandler = require("./socketHandlers/roomJoinHandler");
const roomLeaveHandler = require("./socketHandlers/roomLeaveHandler");
const roomInitializeConnectionHandler = require("./socketHandlers/roomInitializeConnectionHandler");
const roomSignalingDataHandler = require("./socketHandlers/roomSignalingDataHandler");

const serverStore = require("./serverStore");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    // here we specify some configuration for our server
    cors: {
      origin: "*", //ie from all origins 
      methods: ["GET", "POST"],
    },
  });

  // server store keeps a reference of instance to io
  serverStore.setSocketServerInstance(io);

  // here we register the socket
  io.use((socket, next) => {
    authSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  // here establish socket connection
  io.on("connection", (socket) => {
    console.log("user connected");
    console.log(socket.id);

    // new connection handler to save info at server side
    newConnectionHandler(socket, io);
    emitOnlineUsers();

    //listener that will listen a direct message, if any client send a direct message we will be able to listen at server side
    //this socket is responsible for the one that single connection
    socket.on("direct-message", (data)=>{
      directMessageHandler(socket, data);
    });

    socket.on("direct-chat-history", (data) =>{
      directChatHistoryHandler(socket, data);
    });

    socket.on("room-create", () => {
      roomCreateHandler(socket);
    });

    socket.on("room-join", (data) => {
      roomJoinHandler(socket, data);
    });

    socket.on("room-leave", (data) => {
      roomLeaveHandler(socket, data);
    });

    socket.on("conn-init", (data) => {
      roomInitializeConnectionHandler(socket, data);
    });

    socket.on("conn-signal", (data) => {
      roomSignalingDataHandler(socket, data);
    });
    // here we will listen if any client has lost his connection to socket io server
    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  // it emmit onlineusers after  8sec of connection establishment
  setInterval(() => {
    emitOnlineUsers();
  }, [1000 * 8]);
};

module.exports = {
  registerSocketServer,
};
