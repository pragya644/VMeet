const express = require("express");
const http = require("http");
const cors =require("cors");
const mongoose=require("mongoose");
const authRoutes=require("./routes/authRoutes")
require("dotenv").config();


const socketServer= require('./socketServer');
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");


const PORT = process.env.PORT || process.env.API_PORT;

const app=express();
app.use(express.json());
app.use(cors());


// To acess the routes
app.use("/api/auth", authRoutes);
// for routes for friend-invitation
app.use("/api/friend-invitation", friendInvitationRoutes);

console.log("Starting our server");



const server=http.createServer(app);
// we will register our server before connecting db,
socketServer.registerSocketServer(server);

mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    server.listen(PORT, () => {
        console.log('Server is listening on '+PORT);
    });
})

.catch((err)=>{
    console.log("database connection failed.Server not started");
    console.error(err);
}); 